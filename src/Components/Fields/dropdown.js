/* eslint-disable react/prop-types */
import React from "react";
import { ConfigProvider, Dropdown } from "antd";
import { theme } from "Utils/theme";

const listItems = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const DropDown = ({
  children,
  items = listItems,
  horizontalPadding,
  onClick = () => {},
  textColor = theme.white,
  background = theme.wrapperGray,
}) => (
  <ConfigProvider
    theme={{
      components: {
        Dropdown: {
          colorText: textColor,
          colorBgElevated: background,
          colorTextDescription: theme.greyText,
          controlPaddingHorizontal: horizontalPadding || "12px",
        },
      },
    }}
  >
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      {children}
    </Dropdown>
  </ConfigProvider>
);
export default DropDown;
