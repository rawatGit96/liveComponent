import { font, theme } from "Utils/theme";
import React from "react";
import styled from "styled-components";

const MultipleButton = ({
  btnList,
  handleClick,
  border,
  br,
  btnGap,
  value = "",
}) => {
  const handleBtnClick = (data) => {
    if (handleClick) handleClick(data);
  };

  return (
    <ButtonWrapper btnGap={btnGap}>
      {btnList.map((list) => (
        <ButtonView
          status={value === list.name}
          border={border}
          br={br}
          onClick={() => handleBtnClick(list)}
        >
          {list.name}
        </ButtonView>
      ))}
    </ButtonWrapper>
  );
};

export default MultipleButton;

const ButtonWrapper = styled.div`
  display: flex;
  gap: ${(props) => props.btnGap ?? "8px"};
  margin: 10px 0;
`;

const ButtonView = styled.div`
  font-weight: 400;
  font-size: ${font.small};
  line-height: 13.31px;
  min-width: 60px;
  max-width: fit-content;
  text-align: center;
  padding: 6.4px 6px;
  border-radius: ${(props) => props.br ?? "5px"};
  color: ${theme.white};
  background: ${(props) =>
    props?.status ? theme.primaryColor : theme.fieldGray};
  border: 1px solid ${(props) => props.border ?? theme.fieldGray};
  &:hover {
    background: ${theme.primaryColor};
  }
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
