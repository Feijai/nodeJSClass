import React, { useState } from "react";
import { Avatar, Button, Col, Tooltip } from "antd";
import { useCardModalContext } from "@/context/CardModalContext";
import { SectionHeaderStyled } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import AddMemberModal from "../ModalSidebar/AddMemberModal";

const CardMember: React.FC = () => {
  const { cardData } = useCardModalContext();
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);

  const memberAvatarGroup = cardData?.member.map(
    ({ userId: { _id, name, avatar } }) => (
      <Tooltip key={_id} title={name} placement="top">
        <Avatar src={avatar} />
      </Tooltip>
    )
  );

  return (
    <Col span={12}>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>成員</h3>
        </Col>
      </SectionHeaderStyled>
      <Avatar.Group>
        {memberAvatarGroup}
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setIsOpenAddMember(true)}
        />
        {isOpenAddMember && (
          <AddMemberModal
            setIsOpenAddMember={setIsOpenAddMember}
            style={{ top: "64px", left: 0 }}
          />
        )}
      </Avatar.Group>
    </Col>
  );
};

export default CardMember;
