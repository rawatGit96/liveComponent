import BreadcrumbComponent from "Components/BreadCrumb";
import Button from "Components/Fields/button";
import { Col, Form, Row, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { episodeFields } from "./list";
import Select from "Components/Fields/select";
import InputComponent from "Components/Fields/input";
import { theme } from "Utils/theme";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizeFileUpload from "Components/Fields/fileUpload";
import { editSeriesContent, getUserListApi } from "Services/Api/collection";
import { errorMessage } from "Utils/constants";
import { useSelector } from "react-redux";

function EditEpisodeForm() {
  const navigate = useNavigate();
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const { episodeInfo, seriesInfo } = useLocation()?.state || {};
  const { data } = useSelector((e) => e.signIn);
  const formRef = useRef();

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
    {
      title: (
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          {episodeInfo?.title ?? "---"}
        </div>
      ),
    },
    { title: "Edit" },
  ];

  const getViewUserList = async () => {
    const result = await getUserListApi();
    const { data = [] } = result || {};
    const update = data?.map((list) => ({
      label: list?.user_name,
      value: list?._id,
    }));
    setUserList(update);
  };

  const init = {
    thumbnail: episodeInfo?.thumbnail,
    genre: episodeInfo?.genre,
    title: episodeInfo?.title,
    format: episodeInfo?.type,
    description: episodeInfo?.description,
    cast: episodeInfo?.cast?.map((list) => ({
      label: list?.user_name,
      value: list?._id,
    })),
  };

  useEffect(() => {
    getViewUserList();
  }, []);

  const onFinish = async (payload) => {
    setSeriesLoading(true);
    const { cast, thumbnail, ...rest } = payload;
    const castList = cast?.map((list) => ({ user_id: list?.value ?? list }));
    const updatedPayload = {
      user_id: data?._id,
      series_id: seriesInfo?._id,
      content_id: episodeInfo?._id,
      cast: castList,
      thumbnail: typeof thumbnail === "string" ? thumbnail : thumbnail?.url,
      ...rest,
    };
    const res = await editSeriesContent(updatedPayload);
    if (res?.status === 200) {
      message.success(res?.message);
      formRef?.current?.resetFields();
      navigate(-1);
    } else errorMessage(res?.message);
    setSeriesLoading(false);
  };

  const handleNextButton = () => {};

  return (
    <EpisodeForm
      name="basic"
      initialValues={init}
      onFinish={onFinish}
      ref={formRef}
    >
      <div className="flex-wrap header">
        <BreadcrumbComponent items={breadcrumbs} />
      </div>
      <Row gutter={20}>
        {episodeFields.map((list, index) => (
          <Col xs={list.xs} md={list.md} key={list?.name + index}>
            <Form.Item
              name={list.name}
              style={{ marginBottom: "18px" }}
              rules={list?.rule ?? []}
            >
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
              {list.component === "upload-cover" && (
                <CustomizeFileUpload
                  placeholder={list?.placeholder}
                  name={list?.name}
                  aspectRatio={list?.aspectRatio}
                />
              )}
              {list.component === "textarea" && (
                <InputComponent
                  type={list?.type}
                  placeholder={list?.placeholder}
                  maxLength={list.maxLength || 200}
                  bg={theme.backgroundGray}
                  className={list.className}
                  border="transparent"
                />
              )}
              {list.component === "select" && (
                <Select
                  bg={theme.backgroundGray}
                  placeholder={list?.placeholder}
                  options={list?.name === "cast" ? userList : list?.options}
                  style={{ height: "45px" }}
                  multiple={list?.name === "cast" ? true : false}
                />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <div className="button-wrapper">
        <Button
          htmlType="submit"
          width="120px"
          text="Submit"
          bg={theme.primaryColor}
          onClick={handleNextButton}
          loading={seriesLoading}
        />
      </div>
    </EpisodeForm>
  );
}

export default EditEpisodeForm;

const EpisodeForm = styled(Form)`
  .header {
    margin-bottom: 30px;
  }
  .button-wrapper {
    margin-top: 30px;
    text-align: right;
  }

  // .description-textarea,
  .cover-art-label {
    font-size: 14px !important;
  }
  .ant-select-selector {
    font-size: 14px !important;
  }
`;
