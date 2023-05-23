import React, { useState, useEffect } from "react";
import AddList from "@/components/AddList";
import { TrelloCard } from "@/components/TrelloCard";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { BillboardStyled } from "./style";
import BillboardHeader from "./BillboardHeader";
import { useParams } from "react-router";
import { useApi } from "@/hooks/useApiHook";
import { getBoardApi } from "@/api/boards";
import { Spin } from "antd";
import { ListsProps } from "@/interfaces/lists";
import {
  updateCardInColumn,
  updateCardDiffColumn,
  updateColumn,
} from "@/utils/cardFunc";
import type { PropsFromRedux } from "@/router";
import { useAppSelector } from "@/hooks/useAppSelector";
import useWebSocket from "@/hooks/useWebSocket";

const Billboard: React.FC<{
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
}> = ({ setWorkSpace }) => {
  const workSpace = useAppSelector((state) => state.screen.showWorkSpace);

  const [cardList, setCardList] = useState<ListsProps[]>([]);
  const { boardId } = useParams();
  const [result, loading, callApi] = useApi(getBoardApi);
  const { data, sendMessage } = useWebSocket(boardId!);

  // socket
  useEffect(() => {
    sendMessage({ type: "subscribe", boardId: boardId });
  });

  useEffect(() => {
    if (boardId) {
      (async () => {
        await callApi(boardId);
      })();
    }
  }, [boardId]);
  useEffect(() => {
    if (workSpace) {
      setWorkSpace();
    }
  }, [workSpace]);
  useEffect(() => {
    if (result?.result) {
      setCardList(result.result.list);
    }
  }, [result?.result]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const source = result.source;
    const destination = result.destination;
    // 未移動
    if (
      (source.index === destination?.index &&
        source.droppableId === destination.droppableId) ||
      !destination
    ) {
      return;
    }
    // Column 互換
    if (result.type === "COLUMN") {
      const data = updateColumn(result, cardList) as ListsProps[];
      setCardList(data);

      return;
    }
    if (source.droppableId === destination.droppableId) {
      // List 中間互換
      const data = updateCardInColumn(result, cardList) as ListsProps[];
      setCardList(data);
      return;
    }
    // card 移動
    const data = updateCardDiffColumn(result, cardList) as ListsProps[];
    setCardList(data);
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          <BillboardHeader
            name={result?.result.name || ""}
            member={result?.result.member || []}
          />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="board"
              type="COLUMN"
              direction="horizontal"
              ignoreContainerClipping={false}
              isCombineEnabled={false}
            >
              {(provided) => (
                <BillboardStyled
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cardList
                    .sort((a, b) => Number(a.position) - Number(b.position))
                    .map((ele, index) => (
                      <TrelloCard
                        key={ele.id}
                        index={index}
                        quotes={ele}
                        isScrollable={true}
                        isCombineEnabled={false}
                        useClone={undefined}
                      />
                    ))}
                  {provided.placeholder}
                  <AddList
                    cardList={cardList}
                    boardId={boardId || ""}
                    callApi={callApi}
                  />
                </BillboardStyled>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </>
  );
};

export default React.memo(Billboard);
