import { memo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import { forgetAPI } from "Services/Api/collection";
import ButtonComponent from "../../../Components/Fields/button";
import { theme } from "../../../Utils/theme";
import { errorMessage } from "Utils/constants";

const ForgotForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await forgetAPI({
      verification_type: values?.email,
    });
    if (res?.status === 200) {
      message.success(res?.message || "Email sent successfully");
      navigate("/otp-screen", {
        state: { email: values?.email },
      });
    } else errorMessage(res);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        Please enter your registered email id. We will send the verification
        code to reset your password.
      </div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
        style={{ marginBottom: "10px" }}
      >
        <Input
          type="email"
          placeholder="Email"
          size="large"
          style={{
            backgroundColor: theme.midGrey,
            height: "45px",
          }}
        />
      </Form.Item>
      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="Send Link"
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
`;
