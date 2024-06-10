import { Col, Form, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { eventList } from "./list";
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
import { getUserListApi, scheduleEventAPI } from "Services/Api/collection";
import { errorMessage, isInteger } from "Utils/constants";
import { useSelector } from "react-redux";
import moment from "moment";
import ContentUpload from "Components/Fields/uploadContent";

function ScheduleEventForm() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [eventLoader, setEventLoader] = useState(false);
  const { data } = useSelector((e) => e?.signIn) || {};
  const formRef = React.useRef(null);

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
    { title: "Schedule Event" },
  ];

  const getViewUserList = async () => {
    const result = await getUserListApi();
    const { data = [] } = result || {};
    const update = data?.map((list) => ({
      value: list?._id,
      label: list?.check_user_name,
      ...list,
    }));
    setUserList(update);
  };

  useEffect(() => {
    getViewUserList();
  }, []);

  const handleFinish = async (payload) => {
    setEventLoader(true);
    const {
      cast,
      cover_art,
      event_date,
      event_time,
      event_icon,
      upload_trailer,
      ...rest
    } = payload;
    const updateCast = cast?.map((list) => ({ user_id: list }));
    const timeStamp = moment(
      `${event_date} ${event_time}`,
      "yyyy/MM/DD hh:mm"
    ).unix();

    let updatePayload = {
      user_id: data?._id,
      cast: updateCast,
      icon: event_icon?.url,
      cover_photo: cover_art?.key_name,
      cover_photo_url: cover_art?.url,
      event_date,
      event_time: timeStamp,
      ...rest,
    };
    if (upload_trailer)
      updatePayload = {
        ...updatePayload,
        trailer: upload_trailer?.url,
        trailer_ratio: isInteger(upload_trailer?.ratio),
        trailer_duration: upload_trailer?.duration,
      };
    formRef?.current?.resetFields();
    const res = await scheduleEventAPI(updatePayload);
    if (res?.status === 200) {
      message.success(res?.message || "Event create successfully");
      navigate(-1);
    } else errorMessage(res);
    setEventLoader(false);
  };

  return (
    <ScheduleEventWrapper
      initialValues={{}}
      onFinish={handleFinish}
      ref={formRef}
    >
      <div className="flex-wrap schedule-event-header">
        <BreadcrumbComponent items={breadcrumbs} />
      </div>
      <Row gutter={20}>
        {eventList?.map((list) => (
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
              {list.component === "select" && (
                <Select
                  bg={theme.backgroundGray}
                  placeholder={list?.placeholder}
                  multiple={list?.multiple ?? false}
                  options={list?.name === "cast" ? userList : list?.options}
                  style={{ height: "45px" }}
                />
              )}
              {list.component === "upload-content" && (
                <ContentUpload
                  placeholder={list?.placeholder}
                  size={list?.size}
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
          type="primary"
          htmlType="submit"
          width="120px"
          text="Submit to Admin"
          bg={theme.primaryColor}
          br="8px"
          loading={eventLoader}
        />
      </div>
    </ScheduleEventWrapper>
  );
}

export default ScheduleEventForm;

const ScheduleEventWrapper = styled(Form)`
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
    font-size: 14px !important;
  }
  // .description-textarea textarea.ant-input,
  .upload-image-label,
  .cover-art-label {
    font-size: 14px !important;
  }
  .ant-select-selector {
    font-size: 14px !important;
  }
`;
