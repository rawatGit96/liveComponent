/* eslint-disable react/prop-types */
import { theme } from "Utils/theme";
import { ConfigProvider, Spin } from "antd";
import { memo } from "react";

const Loader = ({ loading, fullscreen = true }) => (
  <ConfigProvider
    theme={{
      components: {
        Spin: {
          colorTextLightSolid: theme.primaryColor,
        },
      },
    }}
  >
    <Spin tip="Loading..." spinning={loading} fullscreen={fullscreen} />
  </ConfigProvider>
);
export default memo(Loader);
