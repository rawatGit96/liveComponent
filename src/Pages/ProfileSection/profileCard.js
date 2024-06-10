/* eslint-disable jsx-a11y/label-has-associated-control */
import { Col, Image, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProfileAPI } from "Services/Api/collection";
import { useSelector } from "react-redux";
import { theme } from "Utils/theme";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "Utils/svgIcons";
import { useNavigate } from "react-router-dom";
import Button from "Components/Fields/button";
import Loader from "Components/Loader";

const ListView = ({ field, value }) => {
  return field === "X" || field === "Instagram" || field === "Facebook" ? (
    <div className="info">
      <div className="social-key">{field}</div>
      <div className="value">
        {field === "X" && <TwitterIcon height="18" width="12px" />}
        {field === "Instagram" && <InstagramIcon height="14" width="16px" />}
        {field === "Facebook" && <FacebookIcon height="14" width="18px" />}
        {value || ""}
      </div>
    </div>
  ) : (
    <div className="info">
      <div className="key">{field}:</div>
      <div className="value">{value || "N/A"}</div>
    </div>
  );
};

export default function ProfileInfoCard() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [profileInfo, setProfileInfo] = useState({});
  const { _id } = useSelector((e) => e?.signIn?.data) || {};
  const { userDetail } = userData || {};
  const navigate = useNavigate();

  const getProfileData = async () => {
    setLoading(true);
    const res = await getProfileAPI(_id);
    if (res?.status === 200) {
      const { data } = res || {};
      const userInfo = data?.userDetail || {};
      const profileObj = {
        Name: `${userInfo?.first_name} ${userInfo?.last_name}`,
        "Email Address": data?.email,
        "About Me": userInfo?.about_me,
        "Phone Number": `${data?.country_code} ${data?.phone_number}`,
        UserName: data?.user_name,
        Gender: userInfo?.gender,
        X: "",
        Facebook: "",
        Instagram: "",
      };
      setProfileInfo(profileObj);
      setUserData(data);
    } else message.error(res?.message || "Something went wrong");
    setLoading(false);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const handleNavigate = () =>
    navigate("/profile-edit", { state: { data: userData } });
  return (
    <>
      <ProfileHeader className="flex-wrap">
        <div className="main-heading">Profile Management</div>
        <Button
          type="primary"
          text="Edit"
          bg={theme.fieldGray}
          width="90px"
          onClick={handleNavigate}
        />
      </ProfileHeader>
      {loading ? (
        <Loader />
      ) : (
        <ProfileInfoWrapper
          className="profile-wrapper"
          bgImage={userDetail?.cover_photo_url}
        >
          <Row>
            <Col span={24} className="image-section">
              {/* <div class="image-container">
                <img
                  class="cover-image"
                  alt=""
                  src={userDetail?.cover_photo_url}
                />
              </div> */}
              <Image
                className="cover-image"
                height="100%"
                width="100%"
                src={userDetail?.cover_photo_url}
              />
              {/* <CoverImageWrapper image={userDetail?.cover_photo_url} /> */}
              <ProfileImageWrapper className="profile-image">
                <Image
                  src={userDetail?.profile_pic_url}
                  alt=""
                  height="100%"
                  width="100%"
                />
              </ProfileImageWrapper>
            </Col>
            <Col xs={24} sm={24} md={12} className="listing left-list">
              <ListView field="Name" value={profileInfo?.Name} />
              <ListView
                field="Email Address"
                value={profileInfo?.["Email Address"]}
              />
              <ListView field="Bio" value={profileInfo?.["About Me"]} />
            </Col>
            <Col xs={24} sm={24} md={12} className="listing right-list">
              <ListView
                field="Phone Number"
                value={profileInfo?.["Phone Number"]}
              />
              <ListView field="UserName" value={profileInfo?.["UserName"]} />
              <ListView field="Gender" value={profileInfo?.["Gender"]} />
              <div className="social-wrapper">
                Social Links:
                <ListView field="X" value={profileInfo?.["X"]} />
                <ListView
                  field="Instagram"
                  value={profileInfo?.["Instagram"]}
                />
                <ListView field="Facebook" value={profileInfo?.["Facebook"]} />
              </div>
            </Col>
          </Row>
        </ProfileInfoWrapper>
      )}
    </>
  );
}
const ProfileHeader = styled.div`
  font-size: 20px;
  margin-bottom: 40px;
`;

// const CoverImageWrapper = styled.div`
//   background: url(${(props) => props.image});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   border-bottom: 1px solid ${theme.greyBorder};
//   height: 200px;
//   // aspect-ratio: 14/8;
//   width: 100%;
// `;

const ProfileImageWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  left: 13px;
  overflow: hidden;
  background: ${theme.wrapperGray};
  border: 1px solid ${theme.greyBorder};
  border-radius: 60px;
  height: 60px;
  width: 60px;
`;

const ProfileInfoWrapper = styled.div`
  .image-section {
    position: relative;
    margin-bottom: 25px;
    height: 200px;
    // background: url(${(props) => props.bgImage});
    // background-size: cover;

    // .image-container {
    //   position: absolute; /* Position the image container */
    //   top: 0; /* Align to the top of the background container */
    //   left: 50%; /* Align to the left of the background container */
    //   transform: translateX(-50%);
    //   height: 100%; /* Make the image container fill the background container vertically */
    //   backdrop-filter: blur(5px); /* Apply a blur effect to the background */
    // }

    .cover-image {
      object-fit: cover;
      //   height: 100%; /* Make the image fill the image container vertically */
    }
  }
  border-radius: 10px;
  background: ${theme.wrapperGray};
  .listing {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .left-list {
    padding: 0px 5px 25px 15px;
  }
  .right-list {
    padding: 0px 15px 25px 5px;
  }
  .social-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .info {
    display: flex;
    padding: 2px;
  }
  .key {
    width: 102px;
    text-align: left;
    margin-right: 8px;
    font-size: 14px;
  }
  .value {
    display: flex;
    align-items: center;
    justify-content: left;
    max-width: 280px;
    word-wrap: break-word;
  }
  .social-key {
    justify-content: right;
    display: flex;
    align-items: center;
    width: 80px;
    font-size: 13px;
    margin-right: 15px;
  }
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 130px;
    word-wrap: break-word;
    gap: 10px;
  }
`;
