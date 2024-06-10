/* eslint-disable react/prop-types */
import { memo } from "react";
import styled from "styled-components";
import { ConfigProvider, Select } from "antd";
import { theme } from "Utils/theme";

const list = [
  {
    value: "active",
    label: "Active User",
  },
  {
    value: "inactive",
    label: "InActive User",
  },
];

const SelectComponent = ({
  options = list,
  value,
  onChange,
  placeholder,
  multiple = false,
  size,
  style = {},
  border,
  bg,
  allowClear = true,
  loading = false,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: { colorIcon: "white" },
        components: {
          Select: {
            colorTextPlaceholder: theme.greyText,
            colorBorder: border ? border : "transparent",
            colorText: theme.white,
            colorPrimary: "transparent",
            colorPrimaryHover: border ? theme.greyText : "transparent",
            colorBgContainer: bg || "transparent", // input bg
            colorBgElevated: theme.backgroundGray, // options section bg
            optionSelectedBg: theme.fieldGray, // selected option bg
            clearBg: theme.white,
          },
        },
      }}
    >
      <SelectWrapper
        maxTagCount="responsive"
        size={size || "large"}
        className="select-component"
        defaultValue={
          multiple
            ? value
            : value
              ? options.find((element) => element.value === value)
              : null
        }
        style={{
          ...style,
          minWidth: 120,
        }}
        mode={multiple ? "multiple" : ""}
        placeholder={placeholder || "Select"}
        onChange={onChange}
        options={options}
        allowClear={allowClear}
        dropdownStyle={{
          "min-width": "150px",
        }}
        loading={loading}
        // suffixIcon={<DownTriangleIcon />}
      />
    </ConfigProvider>
  );
};
export default memo(SelectComponent);

const SelectWrapper = styled(Select)`
  .ant-select-suffix svg {
    fill: ${theme.white};
  }
  .ant-select-clear {
    color: white;
    &:hover {
      color: white;
    }
  }
`;
