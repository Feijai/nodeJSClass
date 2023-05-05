import React from "react";
import styled from "styled-components";

interface ColorIconProps {
  color: string;
  text: string;
  size: string;
  fontSize: string;
  background: string;
}

const ColorIconCss = styled.div<ColorIconProps>`
  background-color: ${(props) => props.background};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: ${(props) => props.color}!important;
  font-size: ${(props) => props.fontSize};
  border-radius: 8px;
  justify-content: center;
`;

const ColorIcon: React.FC<ColorIconProps> = (props) => (
  <ColorIconCss className="d-center" {...props}>
    {props.text}
  </ColorIconCss>
);
export default ColorIcon;