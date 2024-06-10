/* eslint-disable import/no-extraneous-dependencies */
import { memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import ButtonComponent from "Components/Fields/button";
import { theme } from "../../Utils/theme";

function SuccessScreen() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/");
  return (
    <SuccessMsgWrapper>
      <div className="checkIcon">
        <CheckCircleOutlined style={{ fontSize: "40px", color: "green" }} />
      </div>
      <div className="heading">Password Reset Link send successfully.</div>
      <div className="subheading">
        Thanks! If their is an account associate with this email, we will send
        the password reset email immediately .
      </div>
      <ButtonComponent
        text="Go to sign in"
        onClick={handleNavigate}
        bg={theme.primaryColor}
        width="60px"
      />
    </SuccessMsgWrapper>
  );
}
export default memo(SuccessScreen);

const SuccessMsgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: ${theme.black};
  padding: 20px 40px;
  height: 100vh;
  align-items: center;
  .checkIcon {
    margin-top: 40px;
  }
  .heading {
    font-size: 22px;
  }
  .subheading {
    color: ${theme.greyText};
  }
  .custom-button {
    margin-top: 30px;
  }
`;
