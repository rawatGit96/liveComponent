import BreadcrumbComponent from "Components/BreadCrumb";
import Button from "Components/Fields/button";
import { Col, Form, Row, message } from "antd";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { fieldListMangSeries } from "./list";
import Select from "Components/Fields/select";
import InputComponent from "Components/Fields/input";
import { theme } from "Utils/theme";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizeFileUpload from "Components/Fields/fileUpload";
import { useSelector } from "react-redux";
import { errorMessage, isInteger } from "Utils/constants";
import ContentUpload from "Components/Fields/uploadContent";
import { editSeries } from "Services/Api/collection";

function ManageSeries() {
  const navigate = useNavigate();

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const user_id = useSelector((e) => e?.signIn?.data?._id);
  const { record } = useLocation()?.state || {};
  const { _id, for_kids, trailer_duration, trailer_ratio, ...initData } =
    record || {};

  const breadcrumbs = [
    {
      title: (
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          Content Management
        </div>
      ),
    },
    { title: "Manage Series" },
  ];

  const onFinish = async (payload) => {
    const { thumbnail, trailer, ...rest } = payload;
    setLoading(true);
    let result = {
      series_id: _id,
      user_id,
      thumbnail: thumbnail?.url ?? thumbnail,
      ...rest,
    };
    if (typeof trailer === "string")
      result = { ...result, trailer, trailer_duration, trailer_ratio };
    else
      result = {
        ...result,
        trailer: trailer?.url,
        duration: trailer?.duration,
        ratio: isInteger(trailer?.ratio),
      };

    const res = await editSeries(result);
    if (res?.status === 200) {
      message.success(res?.message || "Series Edit successfully");
      navigate(-1);
      formRef?.current?.resetFields();
    } else errorMessage(res);
    setLoading(false);
  };

  // const EpisodeSequence = () => {
  //   return (
  //     <EpisodeSequenceStyle>
  //       <PlayIcon />
  //       <p className="close-x">x</p>
  //     </EpisodeSequenceStyle>
  //   );
  // };

  return (
    <SeriesForm
      name="basic"
      initialValues={{ ...initData, audience: for_kids }}
      onFinish={onFinish}
      ref={formRef}
    >
      <div className="flex-wrap header">
        <BreadcrumbComponent items={breadcrumbs} />
      </div>
      {/* <p className="heading-episode-s">Episode Sequence </p>
      <div className="episde-s-container">
        {Array(4)
          .fill("")
          ?.map((el) => (
            <EpisodeSequence />
          ))}
      </div> */}
      <Row gutter={20}>
        {fieldListMangSeries.map((list, index) => (
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
              {list.component === "upload-content" && (
                <ContentUpload
                  placeholder={list?.placeholder}
                  size={list?.size}
                  name={list?.name}
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
          text="Save Changes"
          bg={theme.primaryColor}
          loading={loading}
        />
      </div>
    </SeriesForm>
  );
}

export default ManageSeries;

// const EpisodeSequenceStyle = styled.div`
//   width: 90px;
//   height: 90px;
//   border-radius: 5px;
//   background: #d9d9d980;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;

//   p.close-x {
//     position: absolute;
//     bottom: -8px;
//     right: -8px;
//     margin: 0;
//     padding: revert-layer;
//     width: 20px;
//     height: 20px;
//     border-radius: 100%;
//     background: #d80c0c;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding-bottom: 2px;
//     color: white;
//     cursor: pointer;
//     border: 4px solid #d80c0c;
//   }
//   &:hover {
//     border: 4px solid #d80c0c;
//   }
// `;
const SeriesForm = styled(Form)`
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
  .heading-episode-s {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }
  .episde-s-container {
    display: flex;
    gap: 20px;
    margin: 20px 0;
  }
`;
