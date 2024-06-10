/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { memo } from "react";
import { LeftOutlined } from "@ant-design/icons";

function BackButton({ icon }) {
  const navigate = useNavigate();

  const handleBackNavigate = () => navigate(-1);

  return (
    <BackButtonWrapper className="back-button" onClick={handleBackNavigate}>
      {icon || <LeftOutlined />}
    </BackButtonWrapper>
  );
}
export default memo(BackButton);

export function DetailDescription({ content }) {
  return <DetailWrapper>{content}</DetailWrapper>;
}

export function NoData({ height = "40px" }) {
  return <NoDataWrapper height={height}>No Data Found</NoDataWrapper>;
}

const NoDataWrapper = styled.div`
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.1);
`;

const DetailWrapper = styled.div`
  padding: 10px;
  max-height: 200px;
  overflow: auto;
`;

const BackButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  svg {
    height: 14px;
    width: 14px;
    path {
      fill: white;
    }
  }
`;
