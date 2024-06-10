/* eslint-disable react/prop-types */
import { memo } from "react";
import styled from "styled-components";
import ButtonComponent from "Components/Fields/button";
import { font, theme } from "Utils/theme";
import { CrossIcon } from "Utils/svgIcons";

const ConfirmModal = ({
  subheading = "You want to Logout.",
  confirmButtonText = "Yes",
  handleCancel,
  handleConfirm,
  loading = false,
  mainHeading,
}) => (
  <ConfirmModalWrapper>
    <div className="main-heading flex-wrap">
      {mainHeading ?? "Are you sure?"}
      <span className="cursor-pointer" onClick={handleCancel}>
        <CrossIcon width={16} height={16} />
      </span>
    </div>
    <div className="subheading">{subheading}</div>
    <div className="button-component">
      <ButtonComponent
        width="100px"
        text={confirmButtonText}
        onClick={handleConfirm}
        loading={loading}
        bg={theme.primaryColor}
        br="5px"
      />
      <ButtonComponent
        text="Cancel"
        onClick={handleCancel}
        width="100px"
        bg={theme.white}
        color={theme.primaryColor}
        br="5px"
      />
    </div>
  </ConfirmModalWrapper>
);
export default memo(ConfirmModal);

const ConfirmModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 30px;
  background: ${theme.modalContentSection};
  color: ${theme.white};
  text-align: center;
  .main-heading {
    color: ${theme.modalHeading};
    padding: 15px;
    background: ${theme.modalHeader};
    font-weight: 500;
    font-size: ${font.mid2};
  }
  .subheading {
    font-size: ${font.normal16};
    font-weight: 500;
  }
  .button-component {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
`;
