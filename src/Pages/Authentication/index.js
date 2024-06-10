/* eslint-disable react/prop-types */
import styled from "styled-components";
import logo from "Assests/logo.png";
import BackgroundImage from "Assests/authBackground.png";

export default function FormWrapper({ children }) {
  return (
    <OuterWrapper>
      <Card>
        <LogoWrapper>
          <img src={logo} alt="" height="155px" width="auto" />
        </LogoWrapper>
        {children}
      </Card>
    </OuterWrapper>
  );
}

const OuterWrapper = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${BackgroundImage});
  background-size: contain;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
  overflow: auto;
`;

const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
  min-height: 380px;
`;

const LogoWrapper = styled.div`
  // width: 263.41px;
  // height: 180px;
  margin-bottom: 25px;
  // width: 280px;
  // height: 240px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
