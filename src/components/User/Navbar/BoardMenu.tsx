import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ColorIcon from "@/components/Icons/ColorIcon";
import { Menu, type MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons/lib/icons";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const BoardMenu: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuProps["items"]>();
  const { boardId } = useParams();

  const organization = useParamOrganization();
  useLayoutEffect(() => {
    if (!organization?.board) {
      return;
    }

    const useItem = organization.board.map(({ name, _id, image }) => {
      return {
        label: name,
        key: _id,
        icon: (
          <ColorIcon
            color={"white"}
            text={""}
            size={"24px"}
            fontSize={"14px"}
            background={`linear-gradient(
                    112.89deg,
                    #0083ff 1.48%,
                    rgba(128, 0, 255, 0.86) 100%
                  )`}
            background-image={image && `url(${image})`}
          />
        ),
      };
    });

    const defaultItems = [
      {
        label: (
          <a target="_blank" rel="noopener noreferrer">
            {"新增看板"}
          </a>
        ),
        key: "addModal",
        icon: <PlusOutlined />,
      },
    ];

    setTimeout(() => {
      setItems([...useItem, ...defaultItems]);
    });
  }, [organization?.board?.length]);

  return (
    <Menu
      onClick={({ key }) => {
        if (key === "addModal") {
          setOpen(true);
          return;
        }
        navigate(`/board/${key}`);
      }}
      selectedKeys={[`${boardId}`]}
      mode="inline"
      items={items}
      inlineIndent={16}
      style={{
        backgroundColor: "var(--black23)",
        color: "white",
      }}
    />
  );
};

export default BoardMenu;
