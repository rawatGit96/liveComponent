import { font, theme } from "Utils/theme";
import { ConfigProvider, Progress } from "antd";
import React from "react";
import styled from "styled-components";

const ProgressComponent = ({
  type = "line",
  percent,
  size = "small",
  extraInfo = "",
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Progress: {
            colorText: theme.white,
            fontSize: font.small13,
          },
        },
      }}
    >
      <ProgressWrapper
        percent={percent}
        strokeColor={theme.primaryColor}
        size={size}
        type={type}
        format={(props) => `${extraInfo} ${props}%`}
      />
    </ConfigProvider>
  );
};

export default ProgressComponent;

const ProgressWrapper = styled(Progress)`
  .ant-progress-inner {
    display: flex;
    flex-direction: row-reverse;
  }
`;
