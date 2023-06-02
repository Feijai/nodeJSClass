import React, { useState, useEffect } from "react";
import { Sider } from "./style";
import { Button } from "antd";
import {
  VerticalRightOutlined,
  VerticalLeftOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "@/assets/images/logo.png";
import Logo2 from "@/assets/images/img_logo2.png";
import AddWorkSpace from "@/components/Modal/AddWorkSpace";
import NavBarMenu from "./NavbarMenu";
import AddBoards from "@/components/Modal/AddBoards";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { selectOrganization } from "@/redux/organizationSlice";
import { changeWorkSpace, selectShowWorkSpace } from "@/redux/screenSlice";

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const showWorkSpace = useAppSelector(selectShowWorkSpace);
  const [showNavbar, setShowNavBar] = useState(false);
  const navigate = useNavigate();
  const { boardId, workSpaceId } = useParams();
  const handleClosed = () => {
    setShowNavBar(true);
  };
  const handleOpen = () => {
    setShowNavBar(false);
  };
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState("");
  const userOrganization = useAppSelector(selectOrganization);

  const currentOrganization = userOrganization.find(({ board }) =>
    board.map(({ _id }) => _id).includes(openKey)
  );
  useEffect(() => {
    if (!showWorkSpace && boardId) {
      setOpenKey(boardId);
    }
  }, [showWorkSpace, boardId]);

  return (
    <Sider
      width={257}
      collapsible
      collapsed={showNavbar}
      collapsedWidth={16}
      trigger={null}
      style={{
        backgroundColor: showWorkSpace ? "white" : "var(--black23)",
      }}
    >
      {!showNavbar ? (
        <>
          <div className="title d-space">
            {showWorkSpace ? (
              <img src={Logo} className="logo" />
            ) : (
              <div className="logo-div">
                <Button
                  icon={<ArrowLeftOutlined style={{ fontSize: "16px" }} />}
                  type="link"
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "white",
                  }}
                  className="d-center"
                  onClick={() => {
                    dispatch(changeWorkSpace());
                    navigate("/");
                  }}
                />
                <img src={Logo2} className="logo2" />
              </div>
            )}
            <Button
              icon={<VerticalRightOutlined />}
              onClick={handleClosed}
              type="link"
              style={{
                width: "28px",
                height: "28px",
                color: "var(--gray9f)",
              }}
            />
          </div>
          {showWorkSpace ? (
            <NavBarMenu
              workSpaceId={workSpaceId}
              workSpace={showWorkSpace}
              data={userOrganization}
              setOpen={setOpen}
            />
          ) : (
            <>
              <NavBarMenu
                workSpace={showWorkSpace}
                data={currentOrganization?.board || []}
                setOpen={setOpen}
                id={openKey}
              />
            </>
          )}
        </>
      ) : (
        <Button
          icon={<VerticalLeftOutlined />}
          onClick={handleOpen}
          style={{
            width: "28px",
            height: "28px",
            marginTop: "16px",
            color: "var(--gray66)",
            backgroundColor: "var(--grayd4)",
          }}
        />
      )}
      {showWorkSpace ? (
        <AddWorkSpace open={open} setOpen={setOpen} />
      ) : (
        <AddBoards
          open={open}
          setOpen={setOpen}
          organizationId={currentOrganization?._id || ""}
        />
      )}
    </Sider>
  );
};
