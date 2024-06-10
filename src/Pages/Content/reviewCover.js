import React from "react";
import styled from "styled-components";
import { font, theme } from "Utils/theme";
import { EllipseText, FlexRow } from "Pages/styles";
import Button from "Components/Fields/button";
import Breadcrumbs from "Components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const data = {
  image:
    "https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=",
  heading: "Show title",
  subheading: "Show genre  i will take care of the rest",
};

const ContentView = ({ data }) => (
  <ContentViewStyle>
    <div className="image-box">
      {data?.thumbnail && (
        <img src={data?.thumbnail} className="content-image" alt="" />
      )}
    </div>
    <EllipseText width="115px" className="heading-name">
      {data?.title}
    </EllipseText>
    <EllipseText width="115px" className="subheading-name">
      {data?.description}{" "}
    </EllipseText>
  </ContentViewStyle>
);

const ContentManagement = () => {
  const navigate = useNavigate();

  const { uploadContent } = useSelector((e) => e?.content);

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
    { title: <a href="/content-upload">Upload Content</a> },
    { title: "Review Cover Art" },
  ];

  const handleNextButton = () => navigate("/review-content");

  const handleEditCover = () => navigate("/content-upload");
  return (
    <ContentManagementWrapper>
      <div className="flex-wrap header">
        <Breadcrumbs items={breadcrumbs} />
        <FlexRow>
          <Button
            htmlType="button"
            width="120px"
            text="Edit Cover"
            bg={theme.backgroundGray}
            onClick={handleEditCover}
          />
          <Button
            htmlType="button"
            width="120px"
            text="Next"
            bg={theme.primaryColor}
            onClick={handleNextButton}
          />
        </FlexRow>
      </div>
      <div className="content-view-container">
        <ContentView data={uploadContent} />
        <div className="black-box">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((list) => (
            <div className="blank-box" key={list} />
          ))}
        </div>
      </div>
    </ContentManagementWrapper>
  );
};

export default ContentManagement;

const ContentManagementWrapper = styled.div`
  .content-view-container {
    display: flex;
    background-color: rgba(15, 15, 15, 0.6);
    padding: 18px;
    border-radius: 12px;
    overflow: hidden;
  }
  .header {
    margin-bottom: 20px;
  }
  .black-box {
    display: flex;
    gap: 15px;
    margin-left: 15px;
  }
  .blank-box {
    width: 115px;
    height: 115px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
  }
`;

const ContentViewStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  .image-box {
    width: 115px;
    height: 115px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
  }
  .content-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .heading-name {
    font-size: ${font?.normal};
    line-height: 22px;
  }
  .subheading-name {
    font-size: ${font?.small10};
    color: ${theme?.greyText};
    line-height: 14px;
  }
`;
