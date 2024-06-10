/* eslint-disable react/prop-types */
import { memo } from "react";
import { Modal } from "antd";
import styled from "styled-components";

const SimpleModal = (props) => {
  const { openModal, setOpenModal, maskClosable = true, children } = props;

  return (
    <ModalWrapper
      open={openModal}
      onCancel={setOpenModal}
      footer={() => ""}
      wrapClassName="simple-modal"
      maskClosable={maskClosable}
    >
      {children}
    </ModalWrapper>
  );
};

export default memo(SimpleModal);

const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    padding: 0px;
  }
  .ant-modal-close {
    display: none;
  }
`;
