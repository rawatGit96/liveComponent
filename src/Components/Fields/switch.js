/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react";
import { ConfigProvider, Switch } from "antd";
import styled from "styled-components";

const SwitchComponent = ({ onChange, size, checked = false }) => {
  const [checkValue, setCheckValue] = useState(false);
  const handleChange = (e) => {
    setCheckValue(e);
    onChange(e);
  };

  useEffect(() => {
    setCheckValue(checked);
  }, [checked, onChange]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "white",
            handleBg: "rgba(190, 190, 190, 1)", // switch circle color
            colorPrimaryHover: "white", // show active switch color under hover
            // colorPrimaryBorder: "rgba(196, 196, 196, 1)",
            colorTextQuaternary: "black", // show inactive switch color
            colorTextTertiary: "black", // "rgba(196, 196, 196, 1)", show inactive switch color under hover
          },
        },
      }}
    >
      <SwitchWrapper
        size={size || "default"}
        onChange={handleChange}
        checked={checkValue}
      />
    </ConfigProvider>
  );
};
export default memo(SwitchComponent);

const SwitchWrapper = styled(Switch)``;
