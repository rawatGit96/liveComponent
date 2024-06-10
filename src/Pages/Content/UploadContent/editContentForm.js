import BreadcrumbComponent from "Components/BreadCrumb";
import Button from "Components/Fields/button";
import { Col, Form, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "Components/Fields/select";
import InputComponent from "Components/Fields/input";
import { theme } from "Utils/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { EditUploadList } from "./data";
import CustomizeFileUpload from "Components/Fields/fileUpload";
import { editContentInfo, getUserListApi } from "Services/Api/collection";
import { errorMessage } from "Utils/constants";

function UploadContentForm() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { record } = useLocation()?.state || {};

  const cast = record?.cast?.map((list) => ({
    label: list?.user_name,
    value: list?._id,
  }));

  let result = {
    ...record,
    cover_art: record?.thumbnail,
    cast,
    format: record?.type,
    audience: record?.for_kids,
  };

  const getViewUserList = async () => {
    const result = await getUserListApi();
    const { data = [] } = result || {};
    const update = data?.map((list) => ({
      label: list?.check_user_name,
      value: JSON.stringify({ userId: list["_id"], ...list?.userDetail }),
      ...list,
    }));
    setUserList(update);
  };

  useEffect(() => {
    getViewUserList();
  }, []);

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
    { title: "Upload Content" },
  ];

  const onFinish = async (payload) => {
    const { cast, thumbnail, ...rest } = payload;
    setLoading(true);
    const updateCast = cast?.map((list) => ({ user_id: list?.value }));
    const res = await editContentInfo({
      ...rest,
      cast: updateCast,
      content_id: record?._id,
      thumbnail: thumbnail?.url ?? thumbnail, // default value in string but after update it give object data
    });
    if (res?.status === 200) {
      message.success(res?.message);
      navigate(-1);
    } else errorMessage(res);
    setLoading(false);
  };

  const optionsList = {
    cast: userList,
  };

  return (
    <ContentForm name="basic" initialValues={result} onFinish={onFinish}>
      <div className="flex-wrap header">
        <BreadcrumbComponent items={breadcrumbs} />
      </div>
      <Row gutter={20}>
        {EditUploadList.map((list, index) => (
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
                  options={optionsList[list?.name] ?? list?.options}
                  style={{ height: "45px" }}
                  multiple={list.multiple}
                />
              )}
              {list.component === "upload-cover" && (
                <CustomizeFileUpload
                  placeholder={list?.placeholder}
                  aspectRatio={list?.aspectRatio}
                />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <div className="button-container">
        <Button
          htmlType="submit"
          width="120px"
          text="Update changes"
          bg={theme.primaryColor}
          loading={loading}
        />
      </div>
    </ContentForm>
  );
}

export default UploadContentForm;

const ContentForm = styled(Form)`
  .header {
    margin-bottom: 30px;
  }
  .button-container {
    text-align: right;
    margin-top: 30px;
  }

  .title-textarea textarea.ant-input {
    height: 43px;
    font-size: 14px !important;
  }
  .description-textarea textarea.ant-input,
  .upload-image-label,
  .cover-art-label {
    font-size: 14px !important;
  }
  .ant-select-selector {
    font-size: 14px !important;
  }
`;
