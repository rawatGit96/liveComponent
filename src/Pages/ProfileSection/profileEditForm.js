import { Col, Form, Row, Tooltip, message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { fieldList, socialList } from "./list";
import { font, theme } from "Utils/theme";
import Button from "Components/Fields/button";
import InputComponent from "Components/Fields/input";
import PhoneField from "Components/Fields/phoneNo";
import { updateContentAPI, updateProfileAPI } from "Services/Api/collection";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, genderOptions } from "Utils/constants";
import SocialLinks from "Components/Fields/socialsLinks";
import { InfoIcon, ProfilePersonIcon } from "Utils/svgIcons";
import CustomFileLoad from "Components/Fields/customFileLoad";
import { authlogin } from "Services/Redux/signInSlice";
import BackButton from "Components/Fields/backButton";
import SelectComponent from "Components/Fields/select";
import { useLocation } from "react-router-dom";

export default function ProfileEditForm() {
  const { token } = useSelector((e) => e?.signIn?.data) || {};
  const userData = useLocation()?.state?.data || {};
  const { _id = "", userDetail, podcastDetail, ...rest } = userData || {};
  const {
    cover_photo_url = "",
    cover_photo = "",
    profile_pic_url = "",
    profile_pic = "",
  } = userDetail || {};
  const [loading, setLoading] = useState(false);
  const [coverUrl, setCoverUrl] = useState({
    cover_photo_url,
    cover_photo,
  });
  const [profileUrl, setProfileUrl] = useState({
    profile_pic_url,
    profile_pic,
  });
  const dispatch = useDispatch();

  const payload = {
    user_name: rest?.user_name,
    email: rest?.email,
    phone_number: rest?.country_code + rest?.phone_number || "",
    first_name: userDetail?.first_name,
    gender: userDetail?.gender,
    profile_pic,
    cover_photo,
    profile_pic_url,
    cover_photo_url,
    last_name: userDetail?.last_name,
    about_me: userDetail?.about_me,
    facebook_link: userDetail?.facebook_link,
    twitter_link: userDetail?.twitter_link,
    instagram_link: userDetail?.instagram_link,
  };

  const onFinish = async (values) => {
    setLoading(true);
    const phone_val = values?.phone_number?.split(" ")[1];
    const updatedData = {
      ...values,
      ...profileUrl,
      ...coverUrl,
      phone_number: phone_val,
    };
    const res = await updateProfileAPI({
      account_id: _id,
      user_role: "2",
      ...updatedData,
    });
    if (res?.status === 200) {
      message.success(res?.message || "Create profile update successfully");
      const { user_name, phone_number, email, ...other } = values;
      dispatch(
        authlogin({
          _id,
          ...rest,
          user_name,
          phone_number: phone_val,
          email,
          country_code: phone_number.split(" ")[0],
          userDetail: { ...userDetail, ...other, ...profileUrl, ...coverUrl },
          token,
        })
      );
    } else errorMessage(res);
    setLoading(false);
  };

  const handleUploadContent = async (file, id) => {
    if (file) {
      const form_data = new FormData();
      const type = id === "cover" ? 1 : 4;
      form_data.append("upload_type", type);
      form_data.append("content", file);
      const res = await updateContentAPI(form_data);
      if (res?.status === 200) {
        const { data } = res || {};
        if (id === "cover")
          setCoverUrl({
            cover_photo: data?.key_name,
            cover_photo_url: data?.url,
          });
        else
          setProfileUrl({
            profile_pic: data?.key_name,
            profile_pic_url: data?.url,
          });
      } else errorMessage(res);
    }
  };

  return (
    <ProfileEditWrapper
      name="basic"
      initialValues={payload}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <ProfileEditHeader className="flex-wrap">
        <div className="flex-wrap">
          <BackButton />
          &nbsp;Profile Management
        </div>
        <Button
          type="primary"
          htmlType="submit"
          text="Save"
          bg={theme.fieldGray}
          loading={loading}
          width="90px"
        />
      </ProfileEditHeader>
      <Row gutter={40} className="row-section">
        {/* used to show profile and cover photo */}
        <Col xs={24} md={12} className="cover-profile-col">
          <CoverWrapper>
            <div className="cover-image flex-center">
              {coverUrl?.cover_photo_url ? (
                <img
                  src={coverUrl?.cover_photo_url}
                  alt=""
                  height="100%"
                  width="100%"
                />
              ) : (
                <span className="banner-placeholder">Banner Image</span>
              )}
              <Tooltip
                title="Banner Image ratio 7:4 (Requirement:1400 x 800) (.JPEG. PNG.)"
                overlayStyle={{ fontSize: "10px" }}
              >
                <div className="cover-info-icon">
                  <InfoIcon width="12px" height="14px" />
                </div>
              </Tooltip>
              <Tooltip
                title="User Photo ratio 1:1 (Requirement:1000 x 1000) (.JPEG. PNG.) "
                overlayStyle={{ fontSize: "10px" }}
              >
                <div className="profile-info-icon">
                  <InfoIcon width="12px" height="14px" />
                </div>
              </Tooltip>
            </div>
            <div className="profile-image">
              {profileUrl?.profile_pic_url ? (
                <img
                  src={profileUrl?.profile_pic_url}
                  alt=""
                  height="100%"
                  width="100%"
                />
              ) : (
                <ProfilePersonIcon />
              )}
            </div>
          </CoverWrapper>
        </Col>
        {/* used to show custome input field for upload cover photo */}
        <Col xs={24} md={12}>
          <CustomFileLoad
            className="custom-cover-picker"
            id="cover"
            note="User Photo (Requirement:1400 x 800) (.JPEG. PNG.) This image represents your show or 
content branding and will appear on your profile page."
            onChange={handleUploadContent}
            ratioType={14}
          />
        </Col>
        {/* used to show custome input field for upload profile photo */}
        <Col xs={24} md={12}>
          <CustomFileLoad
            className="custome-profile-picker"
            id="profile"
            note="User Photo (Requirement:1000 x 1000) (.JPEG. PNG.)  This image should be a picture or symbol that represents your content and is used in large and small sizes throughout the app"
            onChange={handleUploadContent}
            ratioType={1}
          />
        </Col>
        {fieldList.map((list, index) => (
          <Col
            xs={list.xs}
            md={list.md}
            className={list.component === "phone_number" && "phone-column"}
          >
            {index === 5 && (
              <Form.Item
                name="gender"
                label={
                  <label style={{ color: theme.greyText, fontSize: "14px" }}>
                    Gender
                  </label>
                }
                style={{ marginBottom: "18px" }}
              >
                <SelectComponent
                  placeholder="select gender"
                  options={genderOptions}
                  value={genderOptions.filter(
                    (el) => el.value === payload?.gender
                  )}
                  border={theme.greyBorder}
                />
              </Form.Item>
            )}
            <Form.Item
              name={list.name}
              label={
                list?.label ? (
                  <label style={{ color: theme.greyText, fontSize: "14px" }}>
                    {list.label}
                  </label>
                ) : (
                  ""
                )
              }
              style={{ marginBottom: "18px" }}
            >
              {list.component === "input" && (
                <InputComponent
                  type={list?.type}
                  placeholder={list?.placeholder}
                  style={{
                    height: "45px",
                  }}
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
                />
              )}
              {list.component === "phone_number" && <PhoneField />}
            </Form.Item>
          </Col>
        ))}
        {/* used to show social links input */}
        <Col xs={24} md={12}>
          <div className="social_link">
            {socialList?.map((socialData) => (
              <Form.Item
                name={socialData.name}
                label={
                  socialData?.label && (
                    <label style={{ color: theme.greyText, fontSize: "14px" }}>
                      Social Links
                    </label>
                  )
                }
                style={{ marginBottom: "12px" }}
              >
                <SocialLinks
                  style={{
                    height: "45px",
                  }}
                  prefix={socialData?.icon}
                  placeholder={socialData?.placeholder}
                />
              </Form.Item>
            ))}
          </div>
        </Col>
      </Row>
    </ProfileEditWrapper>
  );
}

const CoverWrapper = styled.div`
  position: relative;
  .profile-image {
    position: absolute;
    bottom: -28px;
    left: -14px;
    img {
      object-fit: contain;
    }
    overflow: hidden;
    background: ${theme.wrapperGray};
    border: 1px solid ${theme.greyBorder};
    border-radius: 50px;
    height: 60px;
    width: 60px;
    svg {
      height: 100%;
      width: 100%;
    }
  }
  .cover-image {
    img {
      object-fit: contain;
    }
    background: ${theme.wrapperGray};
    overflow: hidden;
    width: 100%;
    aspect-ratio: 4/1;
    // height: 110px;
    .banner-placeholder {
      color: ${theme.greyText};
      font-size: ${font.small};
    }
  }
`;

const ProfileEditHeader = styled.div`
  font-size: 20px;
  margin: 5px 0 40px 0;
`;

const ProfileEditWrapper = styled(Form)`
  color: ${theme.white};
  .row-section {
    padding: 0 40px;
  }
  .cover-profile-col {
    position: relative;
    .cover-info-icon {
      position: absolute;
      display: flex;
      left: -25px;
      top: 25px;
      cursor: pointer;
    }
    .profile-info-icon {
      position: absolute;
      display: flex;
      left: -36px;
      bottom: -24px;
      cursor: pointer;
    }
  }
  .button-container {
    width: 100%;
    text-align: right;
  }
  .social_link {
    display: flex;
    flex-direction: column;
  }
  .phone-column {
    display: flex;
    align-items: end;
    .ant-form-item {
      width: 100%;
    }
  }
  .custome-profile-picker {
    margin: 12px 0 16px 50px;
  }
  .custom-cover-picker {
    position: absolute;
    left: -4px;
  }
`;
