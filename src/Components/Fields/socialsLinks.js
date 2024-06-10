import React, { useRef, useState } from "react";
import { ConfigProvider, Input } from "antd";
import { theme } from "Utils/theme";
import { TwitterIcon } from "Utils/svgIcons";
import styled from "styled-components";

const SocialLinks = ({
  placeholder = "Enter value",
  type = "text",
  value = "",
  onChange,
  style,
  prefix,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const input_ref = useRef();

  const handleRemove = () => {
    setInputValue("");
    console.log("remove", input_ref.current);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            /* here is your component tokens */
            colorBgContainer: theme.transparent,
            colorTextPlaceholder: theme.greyText,
            colorPrimary: theme.greyText,
            colorPrimaryActive: theme.greyText,
            colorPrimaryHover: theme.greyText,
            colorText: theme.white,
            activeShadow: null,
            colorBorder: theme.greyBorder,
          },
        },
      }}
    >
      <SocialInputWrapper
        ref={input_ref}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ ...style }}
        type={type}
        prefix={prefix || <TwitterIcon />}
        suffix={
          <div className="remove" onClick={handleRemove}>
            Remove
          </div>
        }
      />
    </ConfigProvider>
  );
};
export default SocialLinks;

const SocialInputWrapper = styled(Input)`
  .remove {
    padding: 5px 10px 7px;
    cursor: pointer;
    display: flex;
    border-radius: 2px;
    font-size: 13px;
    background: ${theme.fieldGray};
  }
`;
