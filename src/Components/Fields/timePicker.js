import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ConfigProvider, TimePicker } from "antd";
import { theme } from "Utils/theme";
import styled from "styled-components";

dayjs.extend(customParseFormat);

const TimePickerComponent = (props) => {
  const { onChange, placeholder = "Select Time" } = props;

  const handleTime = (time, timeString) => {
    if (onChange) onChange(timeString);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: theme.backgroundGray, // container background
          colorTextQuaternary: theme.white, // icon color change//previous/next month date color
        },
        components: {
          DatePicker: {
            colorBgContainer: theme.backgroundGray, // used to change the bg color of datepicker-field
            colorText: theme.white,
            colorTextPlaceholder: theme.greyText,
            colorBorder: theme.wrapperGray,
            controlItemBgActive: theme.primaryColor, // used to show the selected range background
            colorPrimary: theme.white,
            colorPrimaryHover: theme.white,
          },
        },
      }}
    >
      <TimePickerWrapper
        format="HH:mm"
        prefixCls="time-picker"
        onChange={handleTime}
        placeholder={placeholder}
        //   defaultValue={dayjs("12:08:23", "HH:mm:ss")}
      />
    </ConfigProvider>
  );
};

export default TimePickerComponent;

const TimePickerWrapper = styled(TimePicker)`
  width: 100%;
  height: 47px;
  svg {
    fill: ${theme.lightWhite};
  }
`;
