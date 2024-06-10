import { EllipseText, FlexColumn } from "Pages/styles";
import React from "react";
import styled from "styled-components";
// import contentImage from "Assests/dummy.png";
import { font } from "Utils/theme";

const ContentView = ({ contentOverview }) => {
  return (
    <OuterWrapper gap="5px" className="content-info">
      <img
        className="content-img"
        src={contentOverview?.thumbnail}
        alt=""
        height="250px"
        width="auto"
      />
      <EllipseText className="content-heading" width="90%">
        {contentOverview?.title ??
          "Episode 1 show title lorem ipsum lorem ipsum lorem ipsum lorem..."}
      </EllipseText>
      <div className="content-subheading">
        {contentOverview?.description ?? "Lorem Ipsum Lore Ipsum Lorem"}
      </div>
    </OuterWrapper>
  );
};

export default ContentView;

const OuterWrapper = styled(FlexColumn)`
  align-items: center;
  margin: 35px 0px;
  .content-img {
    object-fit: contain;
    background: #353535;
    overflow: hidden;
    border-radius: 10px;
  }
  .content-heading {
    font-size: ${font.normal};
    text-align: center;
  }
  .content-subheading {
    font-size: ${font.small};
  }
`;
