import BreadcrumbComponent from "Components/BreadCrumb";
import Button from "Components/Fields/button";
import { Col, Form, Row } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { fieldList } from "./list";
import Select from "Components/Fields/select";
import InputComponent from "Components/Fields/input";
import { theme } from "Utils/theme";
import { useNavigate } from "react-router-dom";
import CustomizeFileUpload from "Components/Fields/fileUpload";
import ContentUpload from "Components/Fields/uploadContent";

function UploadSeriesForm() {
  const navigate = useNavigate();
  const [seriesLoading, setSeriesLoading] = useState(false);

  const breadcrumbs = [
    {
      title: (
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          Content Management
        </div>
      ),
    },
    { title: "Create Series" },
  ];

  const onFinish = (payload) => {
    setSeriesLoading(true);
    setSeriesLoading(false);
  };

  const handleNextButton = () => {};

  return (
    <SeriesForm
      name="basic"
      // initialValues={payload}
      onFinish={onFinish}
    >
      <div className="flex-wrap header">
        <BreadcrumbComponent items={breadcrumbs} />
      </div>
      <Row gutter={20}>
        {fieldList.map((list, index) => (
          <Col xs={list.xs} md={list.md} key={list?.name + index}>
            <Form.Item
              name={list.name}
              style={{ marginBottom: "18px" }}
              // rules={list?.rule ?? []}
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
              {list.component === "upload-content" && (
                <ContentUpload
                  placeholder={list?.placeholder}
                  size={list?.size}
                  name={list?.name}
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
                  options={list?.options}
                  style={{ height: "45px" }}
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
    </SeriesForm>
  );
}

export default UploadSeriesForm;

const SeriesForm = styled(Form)`
  .header {
    margin-bottom: 30px;
  }
  .button-wrapper {
    margin-top: 30px;
    text-align: right;
  }

  .description-textarea,
  .cover-art-label {
    font-size: 14px !important;
  }
  .ant-select-selector {
    font-size: 14px !important;
  }
`;
