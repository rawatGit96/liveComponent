// import { theme } from "Utils/theme";
import styled from "styled-components";
// import dummyImage from "Assests/dummy.png";
import ProgressComponent from "Components/Fields/progress";
// import { EllipseText } from "Pages/styles";
// import { Tooltip } from "antd";
// import { isInteger, secToHourMinuteSec } from "Utils/constants";

export const overviewData = [
  {
    content_url: "fdsfads",
    content_des: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
    content_duration: "12:56",
    content_percentage: "(36.8%)",
    view: "11,000",
  },
  {
    content_url: "fdsfads",
    content_des: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
    content_duration: "30:56",
    content_percentage: "(36.8%)",
    view: "11,000",
  },
  {
    content_url: "fdsfads",
    content_des: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
    content_duration: "0:56",
    content_percentage: "(36.8%)",
    view: "11,000",
  },
];

/// Progress Wrapper
export const ProgressList = ({ heading, percent, extraInfo = "" }) => (
  <ProgessWrapper className="progress-heading">
    <div className="progress-heading">{heading}</div>
    <ProgressComponent percent={percent} extraInfo={extraInfo} />
  </ProgessWrapper>
);

const ProgessWrapper = styled.div`
  display: flex;
  gap: 3px;
  .progress-heading {
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 270px;
  }
`;
