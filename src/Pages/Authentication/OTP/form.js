import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import ButtonComponent from "Components/Fields/button";
import { font, theme } from "Utils/theme";
import {
  forgetAPI,
  sendPhoneNoOTP,
  verifyEmailOTP,
  verifyPhoneOTP,
} from "Services/Api/collection";
import { errorMessage } from "Utils/constants";

const OTPForm = () => {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [countDown, setCountDown] = useState({ m: 4, s: 60 });
  const navigate = useNavigate();
  const {
    email = null,
    phone_number = null,
    country_code = null,
  } = useLocation()?.state || {};

  const onFinish = async (values) => {
    let res;
    setLoading(true);
    if (email) {
      const payload = { ...values, email };
      res = await verifyEmailOTP(payload);
    } else {
      const payload = { ...values, phone_number, country_code };
      res = await verifyPhoneOTP(payload);
    }
    if (res?.status === 200)
      navigate("/reset-password", { state: { id: res?.id } });
    else errorMessage(res);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleResendOTP = async () => {
    setCountDown({ m: 0, s: 0 });
    setOtpLoading(true);
    let res;
    if (email) {
      res = await forgetAPI({
        verification_type: email,
      });
    } else {
      res = await sendPhoneNoOTP({
        phone_number,
        country_code,
      });
    }
    if (res?.status === 200) {
      setCountDown({ m: 4, s: 60 });
      message.success(res?.message || "");
    } else errorMessage(res);
    setOtpLoading(false);
  };

  // const handleCountDown = () => {
  //   if (countDown.m !== 0) {
  //     const data = countDown;
  //     if (countDown.s !== 0) {
  //       setCountDown({ m: data.m, s: data.s - 1 });
  //     } else setCountDown({ m: data.m - 1, s: 60 });
  //   } else {
  //     if (countDown.s !== 0) {
  //       const data = countDown;
  //       setCountDown({ m: data.m, s: data.s - 1 });
  //     } else setCountDown({ m: 0, s: 0 });
  //   }
  // };

  //   useEffect(() => {
  //     if (countDown.m > 0 || countDown.s > 0)
  //       setTimeout(() => handleCountDown(), 1000);
  //   }, [countDown]);

  return (
    <OTPFormWrapper
      name="basic"
      style={{
        width: "100%",
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="heading">Enter OTP-code</div>
      <Form.Item
        name="otp"
        rules={[
          {
            required: true,
            message: "Please input your otp!",
          },
        ]}
        style={{ marginBottom: "10px" }}
      >
        <Input
          type="number"
          placeholder="Enter otp"
          size="large"
          style={{
            backgroundColor: theme.fieldBg,
            height: "45px",
          }}
        />
      </Form.Item>
      <div className="mid-password-section">
        {/* <div>
          0{countDown.m}:{countDown.s < 10 ? `0` + countDown.s : countDown.s}
        </div> */}
        {otpLoading ? (
          "...loading"
        ) : (
          <div className="resend-otp" onClick={handleResendOTP} aria-hidden>
            Resend otp
          </div>
        )}
      </div>
      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="Submit"
        bg={theme.primaryColor}
        loading={loading}
      />
    </OTPFormWrapper>
  );
};
export default memo(OTPForm);

const OTPFormWrapper = styled(Form)`
  border: 1px solid ${theme.greyBorder};
  background: ${theme.white};
  padding: 30px;
  border-radius: 12px;
  .heading {
    color: ${theme.primaryColor};
    font-size: 26px;
    text-underline-offset: 6px;
    display: flex;
    justify-content: center;
    text-decoration: underline;
    margin-bottom: 16px;
    font-weight: 600;
  }
  .resend-otp {
    color: ${theme.darkGreyText};
    line-height: 20.4px;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
  }
  .custom-button {
    margin-top: 16px;
    height: 45px;
  }
  .mid-password-section {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    font-size: ${font.small};
  }
  .ant-input {
    color: black;
  }
`;
