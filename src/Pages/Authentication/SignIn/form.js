import { memo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import ButtonComponent from "Components/Fields/button";
import { font, theme } from "Utils/theme";
import { loginAPI } from "Services/Api/collection";
import { authlogin } from "Services/Redux/signInSlice";
import { useDispatch } from "react-redux";
// import { loginAPI } from "../../../Services/api/collections";
// import { authlogin } from "../../../Services/redux/signInSlice";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      login_type: values?.email,
      password: values?.password,
      user_role: "2",
    };
    const res = await loginAPI(payload);
    if (res?.status === 200) {
      const { data, token } = res || {};
      dispatch(authlogin({ ...data, token }));
      navigate("/dashboard");
    } else message.error(res?.message || "Something went wrong");
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleNavigation = () => {
    navigate("/forgot-password");
  };

  return (
    <SignInFormWrapper
      name="basic"
      style={{
        width: "100%",
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="heading">Sign in</div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
        style={{ marginBottom: "18px" }}
      >
        <Input
          type="text"
          placeholder="Email or Username"
          size="large"
          style={{
            backgroundColor: theme.fieldBg,
            height: "45px",
          }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        style={{ marginBottom: "0px" }}
      >
        <Input.Password
          placeholder="Password"
          size="large"
          style={{
            backgroundColor: theme.fieldBg,
            height: "45px",
          }}
        />
      </Form.Item>
      <div className="mid-password-section">
        {/* checked={checked} onChange={onChange}> */}
        {/* <div className="remember-me">
            <Checkbox>Remember me </Checkbox>
          </div> */}
        <div className="forgot-password" onClick={handleNavigation} aria-hidden>
          Forgot Password?
        </div>
      </div>
      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="Sign in"
        bg={theme.primaryColor}
        loading={loading}
      />
    </SignInFormWrapper>
  );
};
export default memo(SignInForm);

const SignInFormWrapper = styled(Form)`
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
  // .remember-me {
  //   color: ${theme.black};
  // }
  .forgot-password {
    color: ${theme.darkGreyText};
    line-height: 20.4px;
    text-decoration: underline;
    text-align: center;
    // text-underline-offset: 4px;
    cursor: pointer;
  }
  .custom-button {
    margin-top: 16px;
    height: 45px;
  }
  .mid-password-section {
    display: flex;
    justify-content: end;
    margin: 8px 0;
    font-size: ${font.small};
  }
  .ant-input {
    color: black;
  }
`;
