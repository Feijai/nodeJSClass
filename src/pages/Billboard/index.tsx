import React, { useState, useEffect } from "react";
import AddList from "@/components/AddList";
import { TrelloCard } from "@/components/TrelloCard";
import { CardProps } from "@/interfaces/trelloCard";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { reorder, reorderQuoteMap } from "@/utils/func";
import { Header } from "./Header";
import Navbar from "./Navbar";
import { MainLayoutCss, BillboardStyled } from "./style";

const Billboard: React.FC<{ data: CardProps[] }> = ({ data }) => {
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [ordered, setOrdered] = useState<string[]>([]);
  useEffect(() => {
    console.log(data);
    if (data) {
      setCardList(data);
      setOrdered(data.map((ele) => ele.title));
    }
  }, [data]);
  const onDragEnd = (result: DropResult) => {
    console.log(result);
    if (!result.destination) return;
    const source = result.source;
    const destination = result.destination;
    if (result.type === "COLUMN") {
      console.log("in COLUMN");
      const reorderedorder = reorder(ordered, source.index, destination.index);
      setOrdered(reorderedorder);
      return;
    }
    const data = reorderQuoteMap(cardList, source, destination);
    setCardList(data);
  };
  // console.log(data);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={false}
        isCombineEnabled={false}
      >
        {(provided) => (
          <BillboardStyled {...provided.droppableProps} ref={provided.innerRef}>
            {ordered.map((key, index) => (
              <TrelloCard
                key={key}
                index={index}
                quotes={cardList.filter((ele) => ele.title === key)[0]}
                isScrollable={true}
                isCombineEnabled={false}
                useClone={undefined}
              />
            ))}
            {provided.placeholder}
            <AddList />
          </BillboardStyled>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Main: React.FC<{
  data: any;
  openNav: Function;
  showNavbar: boolean;
}> = (props) => {
  const { data, openNav, showNavbar } = props;
  return (
    <>
      <Header />
      <Navbar showNavbar={showNavbar} openNav={openNav} />
      <MainLayoutCss style={{ marginLeft: showNavbar ? "16px" : "200px" }}>
        <Billboard data={data} />
      </MainLayoutCss>
    </>
  );
};

export default Main;
