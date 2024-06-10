/* eslint-disable react/prop-types */
import { memo } from "react";
import { Button, ConfigProvider } from "antd";
import styled from "styled-components";
import { theme } from "../../Utils/theme";

const ButtonComponent = ({
  text = "button",
  loading = false,
  onClick,
  htmlType,
  height,
  width,
  bg,
  size,
  color = theme.white,
  showBorder = false,
  br, //border-radius
}) => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          primaryShadow: "",
          borderRadiusLG: br || 3,
          borderRadiusSM: br || 3,
          borderRadius: br || 3,
        },
      },
    }}
  >
    <CustomeButton
      className="custom-button"
      type="primary"
      loading={loading}
      onClick={onClick}
      size={size || "large"}
      htmlType={htmlType || ""}
      bg={bg}
      height={height}
      width={width}
      showBorder={showBorder}
      color={color}
      br={br}
    >
      {text}
    </CustomeButton>
  </ConfigProvider>
);
export default memo(ButtonComponent);

const CustomeButton = styled(Button)`
  // box-shadow: none;
  // border-radius: ${(props) => props.br ?? "3px"}!important;
  background-color: ${(props) => props.bg ?? "rgba(0, 0, 0, 0.63)"};
  font-weight: 500;
  height: ${(props) => (props.height ? props.height : "100%")};
  min-width: ${(props) => (props.width ? props.width : "100%")};
  font-family: "Lato" !important;
  color: ${(props) => props.color};
  border: 1.2px solid
    ${(props) => (props.showBorder ? "rgba(255, 255, 255, 1)" : props.bg)};
  &:hover {
    background-color: ${(props) => props.bg ?? "rgba(0, 0, 0, 0.63)"}!important;
    color: ${(props) => props.color}!important;
    border: 1.2px solid
      ${(props) =>
        props.bg === theme.primaryColor
          ? theme.white
          : theme.greyBorder}!important;
  }
`;
