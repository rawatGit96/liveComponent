import AudioVideoSection from "Components/AudioVideoSection";
import BreadcrumbComponent from "Components/BreadCrumb";
import Loader from "Components/Loader";
import { UnderLine, VerticalLine } from "Pages/styles";
import { getContentDetails } from "Services/Api/collection";
import { getHrMinSec } from "Utils/commonMethods";
import { PersonProfileIcon } from "Utils/svgIcons";
import { theme } from "Utils/theme";
import { Col, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CastListing = ({ heading = "Cast", castLists }) => (
  <CastListingWrapper>
    <div className="cast-heading">{heading}</div>
    {castLists?.map((list) => (
      <div className="cast-detail" key={list?.name}>
        <div className="image-wrapper">
          {list?.image ?? list?.profile_pic_url ? (
            <img
              src={list?.image ?? list?.profile_pic_url}
              alt=""
              height="100%"
              width="100%"
            />
          ) : (
            <PersonProfileIcon />
          )}
        </div>
        <div className="cast-name">{list?.name ?? list?.user_name}</div>
      </div>
      //  <CastListing key={index} name={list.name} image={list.image} />
    ))}
  </CastListingWrapper>
);
function DetailsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [duration, setDuration] = useState("0 min 0 sec");
  const [loading, setloading] = useState(false);
  const Id = location.state.record._id;

  const getDetails = async () => {
    setloading(true);
    const res = await getContentDetails(Id);
    if (res.status === 200) {
      setData(res.data[0]);
      const contentDuration = getHrMinSec(res.data[0]?.duration);
      setDuration(contentDuration);
    } else {
      message.error(res?.message || "Something went wrong");
    }
    setloading(false);
  };

  useEffect(() => {
    getDetails();
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

  return (
    <>
      <div className="flex-wrap header">
        <BreadcrumbComponent items={breadcrumbs} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Detailsection>
          <div className="video-audio-section">
            <AudioVideoSection url={data?.content_url} type={data?.type} />
          </div>
          <div className="info-section">
            <Col span={data?.cast_users.length > 0 ? 18 : 24}>
              <div className="title">{data?.title}</div>
              <div className="podcast-date-time">
                <div className="info-value">{duration}</div>
                <VerticalLine height="16px" borderColor={theme.grey2} />
                <div className="info-value">{data?.viewCount ?? 0} views</div>
                <VerticalLine height="16px" borderColor={theme.grey2} />
                <div className="info-value">{data?.genre}</div>
              </div>
              <UnderLine className="name" color={theme.primaryColor}>
                {data?.user_name}
              </UnderLine>
              <div className="description">{data?.description}</div>
            </Col>
            {data?.cast_users?.length ? (
              <Col span={6}>
                <CastListing castLists={data?.cast_users} />
              </Col>
            ) : (
              ""
            )}
          </div>
        </Detailsection>
      )}
    </>
  );
}
export default DetailsView;

const Detailsection = styled.div`
  .video-audio-section {
    margin: 20px 0;
  }
  .name {
    margin: 18px 0 8px 0;
    text-transform: capitalize;
  }
  .title {
    font-size: 20px;
    font-weight: 500;
  }
  .podcast-date-time {
    display: flex;
    margin: 22px 25px 0 0;
    flex-wrap: wrap;
  }
  .info-value {
    color: ${theme.lightWhite};
  }
  .info-section {
    display: flex;
  }
`;
const CastListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  .cast-heading {
    font-weight: 600;
  }
  .cast-detail {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
  }
  .image-wrapper {
    height: 28px;
    width: 28px;
    border-radius: 50px;
    overflow: hidden;
    background: ${theme.midGrey};
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      object-fit: contain;
    }
  }
  .cast-name {
    text-transform: capitalize;
    color: ${theme.lightWhite};
  }
`;
