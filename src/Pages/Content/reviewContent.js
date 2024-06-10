import AudioVideoSection from "Components/AudioVideoSection";
import { font, theme } from "Utils/theme";
import React, { useState } from "react";
import styled from "styled-components";
import { FlexRow } from "Pages/styles";
import Button from "Components/Fields/button";
import Breadcrumbs from "Components/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCreatorContentAPI } from "Services/Api/collection";
import { errorMessage } from "Utils/constants";
import { message } from "antd";
import { clearUploadContent } from "Services/Redux/contentSlice";
import moment from "moment";

// const dummyData = {
//   title: "The Last Black Man in San Francisco",
//   genre: "Thriller",
//   date: "Date & Time",
//   description:
//     "A vision of Brazil’s recent past that resonates as a chilling and heartbreaking warning for the rest of today’s world -including recounts the upheaval that led to the impeachment of elected president... more",
//   cast: [
//     {
//       name: "Joe Rogan",
//       image: profileImage,
//     },
//     {
//       name: "Jeff Warren",
//       image: profileImage,
//     },
//     {
//       name: "Jennifer Schumann",
//       image: profileImage,
//     },
//   ],
// };

const breadcrumbs = [
  {
    title: (
      <a href="/content-management" className="cursor-pointer">
        Content Management
      </a>
    ),
  },
  {
    title: (
      <a className="cursor-pointer" href="/content-upload">
        Upload Content
      </a>
    ),
  },
  // {
  //   title: (
  //     <a className="cursor-pointer" href="/review-cover">
  //       Review Cover Art
  //     </a>
  //   ),
  // },
  { title: "Review Content" },
];

function ReviewContent() {
  // const { uploadContent } = useSelector((e) => e?.content);
  const { uploadContent } = useLocation()?.state || {};
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todayDate = moment().format("DD-MMM-yyyy");

  const handleSubmitData = async () => {
    setUploadLoading(true);
    const { cast, cover_name, ...rest } = uploadContent;
    const parseCast = await cast?.map((list) => ({
      user_id: JSON.parse(list)?.["userId"],
    }));
    const finalList = { cast: parseCast, ...rest }; // parse cast data here
    const res = await addCreatorContentAPI(finalList);
    if (res?.status === 200) {
      message.success(res?.message || "Content upload successfully");
      dispatch(clearUploadContent());
      navigate("/content-management");
    } else errorMessage(res);
    setUploadLoading(false);
  };

  return (
    <ReviewWrapper>
      <div className="flex-wrap header">
        <Breadcrumbs items={breadcrumbs} />
        <FlexRow>
          <Button
            htmlType="button"
            width="120px"
            text="Edit Content"
            bg={theme.backgroundGray}
            onClick={() =>
              navigate("/content-upload", { state: { uploadContent } })
            } // /edit-content
          />
          <Button
            htmlType="button"
            width="120px"
            text="Submit"
            bg={theme.primaryColor}
            onClick={handleSubmitData}
            loading={uploadLoading}
          />
        </FlexRow>
      </div>
      <div className="video-section">
        <AudioVideoSection
          url={uploadContent?.content_url}
          // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          type={uploadContent?.type}
          thumbnail={uploadContent?.thumbnail}
        />
      </div>
      <div className="title">{uploadContent?.title}</div>
      <CardWrapper>
        <div className="description-heading">Description</div>
        <div className="description">{uploadContent?.description}</div>
        <div className="genre subtext">{uploadContent?.genre}</div>
        <div className="date subtext">{todayDate}</div>
      </CardWrapper>
      <CardWrapper>
        <div className="cast-heading">Cast</div>
        {uploadContent?.cast ? (
          uploadContent?.cast?.map((list) => {
            const data = JSON.parse(list);
            return (
              <FlexRow>
                <img
                  src={data?.profile_pic_url}
                  alt=""
                  className="cast-image"
                />
                <div>{data?.first_name}</div>
              </FlexRow>
            );
          })
        ) : (
          <div className="flex-center subtext">No Cast </div>
        )}
      </CardWrapper>
    </ReviewWrapper>
  );
}

export default ReviewContent;

const ReviewWrapper = styled.div`
  .video-section {
    margin: 20px 0;
    video {
      max-width: 100%;
    }
    .video-container {
      border: 1px solid ${theme.midGrey};
    }
  }
  .cast-heading {
    font-weight: 700;
    font-size: ${font.normal16};
  }
  .cast-image {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    overflow: hidden;
  }
  .title {
    font-weight: 700;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${theme.wrapperGray};
  margin: 10px 0;
  border-radius: 8px;
  padding: 24px;
  .description-heading {
    line-height: 21.86px;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .subtext {
    color: ${theme.greyText};
  }
`;
