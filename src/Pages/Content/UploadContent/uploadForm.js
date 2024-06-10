import BreadcrumbComponent from "Components/BreadCrumb";
import Button from "Components/Fields/button";
import { Col, Form, Row } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fieldList } from "./data";
import Select from "Components/Fields/select";
import InputComponent from "Components/Fields/input";
import { theme } from "Utils/theme";
import { useLocation, useNavigate } from "react-router-dom";
import CustomizeFileUpload from "Components/Fields/fileUpload";
import ContentUpload from "Components/Fields/uploadContent";
import { errorMessage, isInteger } from "Utils/constants";
import { useSelector } from "react-redux";
import { getUserListApi } from "Services/Api/collection";
// import { setUploadContent } from "Services/Redux/contentSlice";

function UploadContentForm() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const { data } = useSelector((e) => e?.signIn) || {};
  // const dispatch = useDispatch();
  // const { uploadContent } = useSelector((e) => e?.content);
  const { uploadContent } = useLocation()?.state || {};

  const breadcrumbs = [
    {
      title: (
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          Content Management
        </div>
      ),
    },
    { title: "Upload Content" },
  ];

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

  const onFinish = async (payload) => {
    const { upload_content, upload_trailer, cast, thumbnail, ...rest } =
      payload;
    let finalList = {
      user_id: data?._id,
      cast,
      for_approval: false,
      ...rest,
    };
    if (typeof upload_content === "string") {
      finalList["content_url"] = uploadContent?.content_url;
      finalList["content"] = uploadContent?.content;
      finalList["duration"] = uploadContent?.duration;
      finalList["ratio"] = uploadContent?.ratio;
    } else {
      finalList["content_url"] = upload_content?.url;
      finalList["content"] = upload_content?.key_name;
      finalList["duration"] = Math.floor(upload_content?.duration);
      finalList["ratio"] = isInteger(upload_content?.ratio);
    }

    if (upload_trailer) {
      if (typeof upload_trailer === "string") {
        finalList["trailer"] = uploadContent?.trailer;
        finalList["trailer_duration"] = uploadContent?.trailer_duration;
        finalList["trailer_ratio"] = uploadContent?.trailer_ratio;
      } else {
        finalList["trailer"] = upload_trailer?.url;
        finalList["trailer_duration"] = Math.floor(upload_trailer?.duration);
        finalList["trailer_ratio"] = isInteger(upload_trailer?.ratio);
      }
    }

    if (typeof thumbnail === "string") {
      finalList["thumbnail"] = uploadContent?.thumbnail;
      finalList["cover_name"] = uploadContent?.cover_name;
    } else {
      finalList["thumbnail"] = thumbnail?.url;
      finalList["cover_name"] = thumbnail?.name;
    }
    if (finalList?.content?.split("/")[0] === rest?.type) {
      // dispatch(setUploadContent(finalList));
      navigate("/review-content", { state: { uploadContent: finalList } });
    } else
      errorMessage("Uploaded content and format of content are not matching");
  };

  return (
    <ContentForm
      name="basic"
      initialValues={{
        upload_content: uploadContent?.content_url,
        upload_trailer: uploadContent?.trailer,
        ...uploadContent,
      }}
      onFinish={onFinish}
    >
      <div className="flex-wrap header">
        <BreadcrumbComponent items={breadcrumbs} />
        <Button
          type="primary"
          htmlType="submit"
          width="120px"
          text="Next"
          bg={theme.primaryColor}
        />
      </div>
      <Row gutter={20}>
        {fieldList.map((list, index) => (
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
                    fontSize: "15px",
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
                  multiple={list?.name === "cast" ? true : false}
                  options={list?.name === "cast" ? userList : list?.options}
                  style={{ height: "45px" }}
                />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </ContentForm>
  );
}

export default UploadContentForm;

const ContentForm = styled(Form)`
  .header {
    margin-bottom: 30px;
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
  // .ant-input-affix-wrapper,
  // .ant-input {
  //   font-size: 16px !important;
  // }
`;
