import { font, theme } from "Utils/theme";
import { Link } from "react-router-dom";

const { default: styled } = require("styled-components");

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || "12px"};
`;

export const FlexRow = styled.div`
  display: flex;
  gap: ${(props) => props.gap || "12px"};
  align-items: center;
`;

export const ScrollBar = styled.div`
  height: ${(props) => props.height || "calc(100vh - 56px"};
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const Circle = styled.div`
  height: ${(props) => props.size ?? "15px"};
  width: ${(props) => props.size ?? "15px"};
  border-radius: 50%;
  background: ${(props) => props.color ?? theme.black};
`;

export const Line = styled.div`
  width: ${(props) => props.width || "100%"};
  border-bottom: ${(props) => props.border || "1px solid"};
  border-color: ${(props) => props.borderColor || theme.graphAxisLine};
  margin: ${(props) => props.margin || "8px 0"};
`;
export const VerticalLine = styled.div`
  height: ${(props) => props.height || "38px"};
  border-right: ${(props) => props.border || "2px solid"};
  border-color: ${(props) => props.borderColor || "rgba(0, 0, 0, 0.26)"};
  margin: ${(props) => props.margin || "0 8px"};
`;

export const Text = styled.div`
  font-size: ${(props) => props.size || font.normal16};
  font-weight: ${(props) => props.weight || "400"};
  line-height: ${(props) => props.lineHeight || "24px"};
  color: ${(props) => props.color || theme.white};
`;

export const EllipseText = styled(Text)`
  width: ${(props) => props.width || "420px"};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const UnderLine = styled.div`
  color: ${(props) => props.color || theme.primaryColor};
  text-decoration: underline;
  text-underline-offset: 4px;
`;

export const IconContainer = styled(FlexCenter)`
  height: 30px;
  width: 30px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
`;

export const LinkText = styled(Link)`
  color: ${({ color }) => color || theme.white};
  cursor: pointer;
  &:hover {
    color: ${({ color }) => color || theme.white};
  }
`;

export const EarningCard = ({ data, heading }) => {
  return (
    <EarningWrapper>
      <div className="data">{data}</div>
      <div className="heading">{heading}</div>
    </EarningWrapper>
  );
};

const EarningWrapper = styled(FlexColumn)`
  background: ${theme.wrapperGray};
  min-width: 200px;
  padding: 15px 30px;
  border-radius: 8px;
  .heading {
    color: ${theme.greyText};
    font-size: ${font.normal};
    line-height: 19.36px;
  }
  .data {
    font-size: ${font.mid2};
    line-height: 29.05px;
  }
`;
