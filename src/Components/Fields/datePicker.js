import { theme } from "Utils/theme";
import { ConfigProvider, DatePicker } from "antd";
// import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

function DatePickerComponent(props) {
  const { height, onChange, placeholder = "Select Date" } = props;

  const handleChange = (e, date) => {
    if (onChange) onChange(date);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: theme.backgroundGray, // container background
          colorSplit: theme.white,
          colorTextQuaternary: theme.greyText, // previous/next month date color
          colorText: theme.white,
        },
        components: {
          DatePicker: {
            colorBgContainer: theme.backgroundGray, // used to change the bg color of datepicker-field
            colorTextPlaceholder: theme.greyText,
            colorBorder: theme.wrapperGray,
            cellActiveWithRangeBg: theme.fieldGray, // used to show the selected range background
            colorTextHeading: theme.greyText, // used to change the heading color in calender
            colorPrimary: theme.primaryColor,
            colorPrimaryHover: theme.white,
          },
        },
      }}
    >
      <DatePickerWrapper
        height={height}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </ConfigProvider>
  );
}

export default DatePickerComponent;

const DatePickerWrapper = styled(DatePicker)`
  width: 100%;
  height: ${(props) => props.height || "47px"};
  svg {
    fill: ${theme.lightWhite};
  }
`;
