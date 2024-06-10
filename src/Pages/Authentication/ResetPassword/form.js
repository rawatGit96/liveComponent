import React, { memo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import ButtonComponent from "../../../Components/Fields/button";
import { theme } from "../../../Utils/theme";
import { resetPasswordAPI } from "Services/Api/collection";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const formRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const { id = null } = useLocation()?.state || {};

  const onFinish = async (values) => {
    setLoading(true);
    const res = await resetPasswordAPI({
      password: values?.password,
      account_id: id,
    });
    if (res?.status === 200) {
      message.success(res?.message);
      formRef.current?.resetFields();
      navigate("/");
    } else message.error(res?.message);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ResetFormWrapper
      name="basic"
      style={{
        width: "100%",
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      ref={formRef}
    >
      <div className="heading">Reset Password</div>
      <div className="content">
        Lorem Ipsum has been the industry&apos;s standard dummy text ever since
        the 1500s, when an unknown printer took a galley of type and scrambled
      </div>
      <Form.Item
        name="password"
        rules={[
          {
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            required: true,
            message:
              "Please enter minimum 8 character, atleast 1 number,1 character and 1 special character",
          },
        ]}
        style={{ marginBottom: "20px" }}
      >
        <Input.Password
          placeholder="Enter new password"
          size="large"
          style={{
            backgroundColor: theme.fieldBg,
            height: "45px",
          }}
        />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
        style={{ marginBottom: "10px" }}
      >
        <Input.Password
          placeholder="Confirm Password"
          size="large"
          style={{
            backgroundColor: theme.fieldBg,
            height: "45px",
          }}
        />
      </Form.Item>
      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="SAVE PASSWORD"
        bg={theme.primaryColor}
        loading={loading}
      />
    </ResetFormWrapper>
  );
};
export default memo(ResetPasswordForm);

const ResetFormWrapper = styled(Form)`
  border: 1px solid ${theme.greyBorder};
  background: ${theme.white};
  padding: 30px;
  border-radius: 12px;
  .heading {
    color: ${theme.primaryColor};
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 6px;
    justify-content: center;
    font-size: 24px;
    display: flex;
    gap: 32px;
  }
  .back-icon {
    display: flex;
    svg {
      height: 20px;
      width: 20px;
    }
    cursor: pointer;
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
