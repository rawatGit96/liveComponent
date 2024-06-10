import { Col, Form, Row, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { contentList } from "./list";
import CustomizeFileUpload from "Components/Fields/fileUpload";
import Select from "Components/Fields/select";
import InputComponent from "Components/Fields/input";
import { theme } from "Utils/theme";
import BreadcrumbComponent from "Components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "Components/Fields/button";
import DatePickerComponent from "Components/Fields/datePicker";
import TimePickerComponent from "Components/Fields/timePicker";
import { useSelector } from "react-redux";
import { getUserListApi, schedulePodcast } from "Services/Api/collection";
import { errorMessage, isInteger } from "Utils/constants";
import ContentUpload from "Components/Fields/uploadContent";
import moment from "moment";

function SchedulePodcastForm() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const user_id = useSelector((e) => e?.signIn?.data?._id);

  const breadcrumbs = [
    {
      title: (
        <div
          className="cursor-pointer"
          onClick={() => navigate("/content-management")}
        >
          Content Management
        </div>
      ),
    },
    { title: "Schedule Content" },
  ];

  const getViewUserList = async () => {
    const result = await getUserListApi();
    const { data } = result || {};
    const update = data?.map((list) => ({
      label: list?.check_user_name,
      value: list?.userDetail?.user_id,
    }));
    setUserList(update);
  };

  useEffect(() => {
    getViewUserList();
  }, []);

  const handleFinish = async (values) => {
    const {
      cover_art,
      // thumbnail,
      cast,
      event_time,
      event_date,
      upload_content,
      ...rest
    } = values;
    const timeStamp = moment(
      `${event_date} ${event_time}`,
      "yyyy/MM/DD hh:mm"
    ).unix();
    let payload = {
      user_id,
      cover_photo_url: cover_art?.url,
      cover_photo: cover_art?.key_name,
      // thumbnail: thumbnail?.url,
      event_date,
      event_time: timeStamp,
      add_cast: { user_id: cast },
      ...rest,
    };
    if (upload_content)
      payload = {
        ...payload,
        trailer: upload_content?.url,
        trailer_ratio: isInteger(upload_content?.ratio),
        trailer_duration: upload_content?.duration,
      };
    setLoading(true);
    const res = await schedulePodcast(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Content created successfully");
      formRef?.current?.resetFields();
    } else errorMessage(res);
    setLoading(false);
  };

  return (
    <SchedulePodcastWrapper
      initialValues={{}}
      onFinish={handleFinish}
      ref={formRef}
    >
      <div className="flex-wrap schedule-event-header">
        <BreadcrumbComponent items={breadcrumbs} />
      </div>
      <Row gutter={20}>
        {contentList?.map((list) => (
          <Col xs={list.xs} md={list.md} key={list?.name}>
            <Form.Item name={list?.name} rules={list?.rule ?? []}>
              {list.component === "input" && (
                <InputComponent
                  type={list?.type}
                  placeholder={list?.placeholder}
                  style={{
                    height: "45px",
                  }}
                  bg={theme.backgroundGray}
                  border="transparent"
                />
              )}
              {list.component === "textarea" && (
                <InputComponent
                  type={list?.type}
                  placeholder={list?.placeholder}
                  style={{
                    height: "45px",
                  }}
                  maxLength={600}
                  bg={theme.backgroundGray}
                  border="transparent"
                />
              )}
              {list.component === "upload-content" && (
                <ContentUpload
                  placeholder={list?.placeholder}
                  size={list?.size}
                  name={list?.name}
                />
              )}
              {list.component === "select" && (
                <Select
                  bg={theme.backgroundGray}
                  placeholder={list?.placeholder}
                  options={list?.name === "cast" ? userList : list?.options}
                  style={{ height: "45px" }}
                />
              )}
              {list.component === "thumbnail" && (
                <CustomizeFileUpload
                  placeholder={list?.placeholder}
                  name={list?.name}
                />
              )}
              {list.component === "coverArt" && (
                <CustomizeFileUpload
                  placeholder={list?.placeholder}
                  name={list?.name}
                  aspectRatio={list?.aspectRatio}
                />
              )}
              {list.component === "date-picker" && (
                <DatePickerComponent placeholder={list?.placeholder} />
              )}
              {list.component === "time-picker" && (
                <TimePickerComponent placeholder={list?.placeholder} />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <div className="button-container">
        <Button
          htmlType="submit"
          width="120px"
          text="Schedule Content"
          bg={theme.primaryColor}
          br="8px"
          loading={loading}
        />
      </div>
    </SchedulePodcastWrapper>
  );
}

export default SchedulePodcastForm;

const SchedulePodcastWrapper = styled(Form)`
  padding: 0 20px;
  .schedule-event-header {
    margin-bottom: 30px;
  }
  .button-container {
    margin-top: 20px;
    text-align: right;
  }

  .title-textarea textarea.ant-input {
    height: 43px;
    // font-size: 15px !important;
  }
  .upload-image-label,
  .cover-art-label {
    font-size: 14px !important;
  }
  .ant-select-selector {
    font-size: 14px !important;
  }
`;
