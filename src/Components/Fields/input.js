import React from "react";
import { ConfigProvider, Input } from "antd";
import { theme } from "Utils/theme";

const InputComponent = ({
  placeholder = "Enter value",
  type = "text",
  value,
  onChange,
  style,
  rowColumn = 7,
  maxLength = 200,
  bg,
  className,
  border = theme.greyBorder,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            /* here is your component tokens */
            colorBgContainer: bg || theme.transparent,
            colorTextPlaceholder: theme.greyText,
            colorPrimary: theme.greyText,
            colorPrimaryActive: theme.greyText,
            colorPrimaryHover:
              border !== "transparent" ? theme.greyText : "transparent",
            colorText: theme.white,
            activeShadow: null,
            colorBorder: border,
            colorTextDescription: theme.greyText,
          },
        },
      }}
    >
      {type === "textarea" ? (
        <Input.TextArea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rowColumn}
          showCount
          maxLength={maxLength}
          className={className}
          // autoSize={true}
        />
      ) : (
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ ...style }}
          type={type}
          className="input-field"
        />
      )}
    </ConfigProvider>
  );
};
export default InputComponent;
