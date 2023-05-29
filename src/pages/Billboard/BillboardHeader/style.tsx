import styled from "styled-components";
import { Button } from "antd";

export const BillboardHeaderCss = styled.div`
  margin-bottom: 16px;
  .left-head {
    color: white;
    font-size: 24px;
    font-weight: 700;
    display: flex;
  }
  .right-head {
    display: flex;
    column-gap: 16px;
  }
`;

export const BillboardHeaderBtn = styled(Button)`
  color: white;
  background-color: var(--black23);
  padding: 8px;
  display: flex;
  align-items: center;
  height: 36px;
`;

export const PopoverTitleStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const PopoverContentStyle = styled.div`
  .top-border {
    border-top: 1px solid var(--grayd5);
    padding: 8px 0;
  }
  .listBtn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .peopleView {
    position: absolute;
    width: 250px;
    height: 260px;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
    right: -25px;
    top: 0px;
    border-radius: 8px;
  }
  .peopleTitle {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    text-align: center;
    border-bottom: 1px solid var(--ds-border, #091e4221);
  }

  .changeWorkSpaceView {
    position: absolute;
    width: 250px;
    height: 160px;
    background: #ffffff;
    box-shadow: 0px -1px 16px rgba(0, 0, 0, 0.16);
    right: -25px;
    top: 19px;
    border-radius: 8px;
  }

  .ant-btn-primary.createLabelBtn {
    background-color: #d4d4d4;
  }

  .ant-btn-primary.createlabelbtn: hover {
    background-color: #bebebe;
  }

  .createLabelView {
    position: absolute;
    width: 250px;
    background: #ffffff;
    box-shadow: 0px -1px 16px rgba(0, 0, 0, 0.16);
    right: -15px;
    top: 19px;
    border-radius: 8px;
  }

  .hoverBtn:hover {
    background-color: black;
    opacity: 0.3;
  }
`;
