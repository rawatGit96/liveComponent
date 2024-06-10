import React from "react";
import { Breadcrumb, ConfigProvider } from "antd";
import { theme } from "Utils/theme";

let item = [
  {
    title: "Home",
  },
  {
    title: <a href="">Application Center</a>,
  },
];

const BreadcrumbComponent = ({ items = item }) => (
  <ConfigProvider
    theme={{
      components: {
        Breadcrumb: {
          itemColor: theme.greyText,
          separatorColor: theme.primaryColor,
          lastItemColor: theme.primaryColor,
          fontSize: 14,
          linkColor: theme.greyText,
          linkHoverColor: theme.greyText,
        },
      },
    }}
  >
    <Breadcrumb items={items} />
  </ConfigProvider>
);
export default BreadcrumbComponent;
