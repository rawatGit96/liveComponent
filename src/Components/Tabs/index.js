import React from "react";
import { ConfigProvider, Tabs } from "antd";
import { theme } from "Utils/theme";
import styled from "styled-components";

// const default_items = [
//   {
//     key: "1",
//     label: "Audio",
//     // children: "Audio listing",
//   },
//   {
//     key: "2",
//     label: "Video",
//     // children: "Video listing",
//   },
//   {
//     key: "3",
//     label: "Series",
//     // children: "Series listing",
//   },
// ];

const TabComponent = ({
  items, //= default_items,
  operations = null,
  onChange,
  activeKey = 1,
}) => (
  <ConfigProvider
    theme={{
      components: {
        Tabs: {
          itemColor: theme.greyText,
          itemHoverColor: theme.white,
          itemActiveColor: theme.white,
          inkBarColor: theme.primaryColor,
          itemSelectedColor: theme.white,
          colorText: theme.white,
          /* here is your component tokens */
        },
      },
    }}
  >
    <TabsStyles
      defaultActiveKey={activeKey}
      tabBarExtraContent={operations}
      items={items}
      onChange={onChange}
    />
  </ConfigProvider>
);

export default TabComponent;

const TabsStyles = styled(Tabs)``;
