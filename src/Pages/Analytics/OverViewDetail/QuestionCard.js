import { FlexColumn } from "Pages/styles";
import { font, theme } from "Utils/theme";
import React from "react";
import styled from "styled-components";

const QuestionCard = ({ time, heading, data }) => {
  return (
    <QuestionCardWrapper gap="6px">
      <div className="question-heading">{heading}</div>
      <div className="time">{time}</div>
      <div className="data">{data}</div>
    </QuestionCardWrapper>
  );
};

export default QuestionCard;

const QuestionCardWrapper = styled(FlexColumn)`
  color: ${theme.white};
  background: ${theme.wrapperGray};
  border-radius: 10px;
  padding: 15px 22px;
  height: 170px;
  font-size: ${font.normal};
  .time {
    color: ${theme.greyText};
    font-size: ${font.small10};
  }
  .data {
    color: ${theme.greyText};
    font-size: ${font.small10};
    margin-top: 20px;
  }
`;
