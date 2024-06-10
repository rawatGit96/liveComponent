import { Col, Row } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import dummyImage from "Assests/dummyImage.png";
import {
  DownArrowIcon,
  HeartIcon,
  ProfilePersonIcon,
  ThumbsUpIcon,
} from "Utils/svgIcons";
import { font, theme } from "Utils/theme";
import { FlexColumn } from "Pages/styles";
import { MoreOutlined } from "@ant-design/icons";
import DropDown from "Components/Fields/dropdown";
import { commentOptionsItems, reportOptions } from "Utils/constants";
import SimpleModal from "Components/Modal/simpleModal";
import RadioComponent from "Components/Fields/radio";
import Button from "Components/Fields/button";
import EmojiField from "Components/Fields/emojiField";

export default function CommentView() {
  const [openModal, setOpenModal] = useState(false);
  const [allRepliesStatus, setAllRepliesStatus] = useState(false);
  const [openReplyModal, setReplyModal] = useState(false);

  const handleReplyModal = () => setReplyModal((pre) => !pre);

  const handleModal = () => setOpenModal((pre) => !pre);

  const handleOptions = (item) => item?.key === "1" && handleModal();

  const ReplyView = () => (
    <RepliesWrapper>
      <ProfilePersonIcon height="20px" width="20px" />
      <FlexColumn gap="4px">
        <div>lorem@ipsum</div>
        <div className="comment-txt">
          Lorem Ipsum Lorem Ipsum Lorem @Ipsum Lorem Ipsum Lorem Ipsum Lorem
          Ipsum
        </div>
        <div onClick={handleReplyModal} className="cursor-pointer">
          Reply
        </div>
      </FlexColumn>
      <FlexColumn gap="4px" className="replies-heart-section">
        <HeartIcon />
        <div className="heart-count">11</div>
      </FlexColumn>
    </RepliesWrapper>
  );

  const handleReportOptions = (e) => console.log("report select", e?.target);

  const handleHideShowReplies = () => setAllRepliesStatus((pre) => !pre);

  return (
    <CommentViewWrapper>
      <Col xs={19} className="content">
        <ProfilePersonIcon height="40px" width="40px" />
        <FlexColumn className="comment-section">
          <div className="send-info">
            <div className="sender-name">lorem@ipsum</div>
            <div className="sending-time">2 weeks ago </div>
          </div>
          <div className="comment">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          </div>
          <div className="bottom-section">
            <HeartIcon />
            <ThumbsUpIcon width="18" height="16" />
            <div
              className="cursor-pointer reply-count"
              onClick={handleHideShowReplies}
            >
              10 Replies &nbsp;
              <DownArrowIcon />
            </div>
            <div className="cursor-pointer" onClick={handleReplyModal}>
              Reply
            </div>
            <DropDown items={commentOptionsItems} onClick={handleOptions}>
              <MoreOutlined />
            </DropDown>
          </div>
          {allRepliesStatus && <ReplyView />}
        </FlexColumn>
      </Col>
      <Col xs={5} className="image-wrapper">
        <img src={dummyImage} alt="" width="160px" height="90px" />
      </Col>
      <SimpleModal openModal={openModal} setOpenModal={handleModal}>
        <ReportModal>
          <div className="heading">Report comment </div>
          <RadioComponent
            options={reportOptions}
            onChange={handleReportOptions}
            padding="12px 16px;"
          />
          <div className="button-section">
            <Button
              text="CANCEL"
              bg={theme.backgroundGray}
              width="60px"
              onClick={handleModal}
            />
            <Button
              text="REPORT"
              bg={theme.backgroundGray}
              color={theme.primaryColor}
              width="60px"
            />
          </div>
        </ReportModal>
      </SimpleModal>
      <SimpleModal openModal={openReplyModal} setOpenModal={handleReplyModal}>
        <MessageSenderWrapper>
          <div className="message-section">Send Reply</div>
          <EmojiField value="" />
        </MessageSenderWrapper>
      </SimpleModal>
    </CommentViewWrapper>
  );
}
const ReportModal = styled.div`
  background: ${theme.backgroundGray};
  color: ${theme.white};
  .heading {
    padding: 10px 28px;
    font-size: ${font.mid21};
    border-bottom: 1px solid ${theme.greyBorder};
  }
  .button-section {
    display: flex;
    justify-content: right;
    padding: 8px 5px;
    border-top: 1px solid ${theme.greyBorder};
  }
`;

const CommentViewWrapper = styled(Row)`
  padding: 12px 0;
  .content {
    display: flex;
    gap: 15px;
    border-bottom: 1px solid ${theme.greyBorder};
    padding-bottom: 10px;
  }
  .image-wrapper {
    display: flex;
    align-items: flex-start;
    img {
      object-fit: contain;
    }
  }
  .send-info {
    display: flex;
    gap: 20px;
  }
  .comment-section {
    width: calc(100% - 40px);
  }
  .comment {
    color: ${theme.greyText};
    font-weight: 500px;
    font-size: ${font.small13};
  }
  .sender-name {
    font-size: ${font.small};
    font-weight: 600;
  }
  .sending-time {
    color: ${theme.greyText};
    font-size: 11px;
    font-weight: 500;
  }
  .bottom-section {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: ${font.small};
  }
  .reply-count {
    color: ${theme.greyText};
  }
`;

const RepliesWrapper = styled.div`
  display: flex;
  gap: 10px;
  font-size: ${font.small};
  .comment-txt {
    color: ${theme.greyText};
  }
  .heart-count {
    text-align: center;
  }
`;

const MessageSenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: ${theme.white};
  background: ${theme.backgroundGray};
  .message-section {
    margin-bottom: 8px;
    font-weight: 700;
  }
`;
