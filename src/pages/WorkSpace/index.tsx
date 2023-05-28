import React, { useState } from "react";
import { WorkSpaceCss } from "./style";
import { Row, Col, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import WorkSpaceCard from "./WorkSpaceCard";
import AddBoards from "@/components/Modal/AddBoards";
import type { PropsFromRedux } from "@/router";
import { WorkSpaceHeader } from "@/components/WorkSpace/WorkSpaceHeader";
import { useAppSelector } from "@/hooks/useAppSelector";

const WorkSpace: React.FC<{
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
  getOrganization: PropsFromRedux["getOrganization"];
}> = ({ setWorkSpace, getOrganization }) => {
  const { workSpaceId } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const userOrganization = useAppSelector(
    (state) => state.user.organization
  ).find((ele) => ele._id === workSpaceId);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <WorkSpaceCss>
      <Row align={"middle"} justify={"space-between"}>
        <WorkSpaceHeader />
        <Col>
          <Button
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#232323",
              color: "white",
              width: "121px",
              height: "45px",
            }}
            onClick={() => setOpenModal(true)}
          >
            新增看板
          </Button>
          <AddBoards
            open={openModal}
            setOpen={setOpenModal}
            organizationId={workSpaceId}
          />
        </Col>
      </Row>

      <Row
        align={"middle"}
        justify={"space-between"}
        style={{ marginTop: "16px" }}
      >
        <Col style={{ fontWeight: 700, fontSize: "16px", lineHeight: "150%" }}>
          我的看板
        </Col>
        <Col>
          <Select
            defaultValue="排序方式"
            style={{ fontSize: "14px" }}
            onChange={handleChange}
            bordered={false}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "16px", columnGap: "8px" }}>
        {userOrganization?.board.map((ele, idx) => (
          <WorkSpaceCard
            title={ele.name}
            permission={ele.permission}
            backgroundImage={ele.image}
            setWorkSpace={setWorkSpace}
            getOrganization={getOrganization}
            boardId={ele._id}
            key={idx}
          />
        ))}
      </Row>
    </WorkSpaceCss>
  );
};

export default WorkSpace;
