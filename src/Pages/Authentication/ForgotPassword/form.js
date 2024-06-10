import { memo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { forgetAPI, sendPhoneNoOTP } from "Services/Api/collection";
import ButtonComponent from "../../../Components/Fields/button";
import { theme } from "../../../Utils/theme";
import PhoneField from "Components/Fields/phoneNo";
import { errorMessage } from "Utils/constants";

const ForgotForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const phone_data = values?.phone_no.split(" ");
    const phone_number = phone_data[0],
      country_code = phone_data[1];
    const res = await forgetAPI({
      verification_type: phone_number,
    });
    if (res?.status === 200) {
      const resp = await sendPhoneNoOTP({
        phone_number,
        country_code,
      });
      if (resp?.status === 200) {
        message.success(res?.message);
        navigate("/otp-screen", {
          state: { phone_number, country_code },
        });
      } else errorMessage(res);
    } else errorMessage(res);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOpenEmailOption = () => navigate("/forgot-password-email");

  return (
    <ForgotFormWrapper
      name="basic"
      style={{
        width: "100%",
      }}
      layout="  "
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="heading">Forgot Password?</div>
      <div className="content">
        Please enter your registered Phone Number . We will send the
        verification code to reset your password.
      </div>
      <Form.Item
        name="phone_no"
        initialValue=""
        rules={[
          {
            required: true,
            message: "Please input your phone-no",
          },
        ]}
        style={{ marginBottom: "10px" }}
      >
        <PhoneField themeColor="white" />
      </Form.Item>
      <div className="other-method-link" onClick={handleOpenEmailOption}>
        Use another method
      </div>
      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="SEND OTP"
        bg={theme.primaryColor}
        loading={loading}
      />
    </ForgotFormWrapper>
  );
};
export default memo(ForgotForm);

const ForgotFormWrapper = styled(Form)`
  border: 1px solid ${theme.greyBorder};
  background: ${theme.white};
  padding: 30px;
  border-radius: 12px;
  .heading {
    font-size: 24px;
    display: flex;
    gap: 32px;
    color: ${theme.primaryColor};
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 6px;
    justify-content: center;
  }
  .content {
    font-size: 12px;
    margin: 16px 0;
    color: ${theme.greyText};
    line-height: 16px;
    word-spacing: 3px;
  }
  .custom-button {
    margin: 16px 0 10px 0;
    height: 45px;
  }
  .ant-input {
    color: black;
  }
  .other-method-link {
    text-align: right;
    color: ${theme.darkBlue};
    cursor: pointer;
  }
`;
