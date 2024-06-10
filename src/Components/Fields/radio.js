/* eslint-disable react/prop-types */
import { ConfigProvider, Radio } from "antd";
import styled from "styled-components";
import { theme } from "../../Utils/theme";

const RadioComponent = ({ onChange, value, options, padding }) => (
  <ConfigProvider
    theme={{
      components: {
        Radio: {
          colorPrimary: theme.primaryColor,
          colorBorder: theme.lightWhite,
          dotSize: 0,
          colorBgContainer: theme.grey2,
          colorText: theme.white,
        },
      },
    }}
  >
    <RadioGroupWrapper onChange={onChange} value={value} padding={padding}>
      {options.map((list) => (
        <Radio className="options" value={list.value}>
          {list.name}
        </Radio>
      ))}
    </RadioGroupWrapper>
  </ConfigProvider>
);
export default RadioComponent;

const RadioGroupWrapper = styled(Radio.Group)`
  padding: ${(props) => props.padding || "10px"};
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  .ant-radio-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .ant-radio-wrapper::after {
    content: none;
  }
  // .options {
  //   color: ${theme.lightWhite};
  //   background: ${theme.grey2};
  //   padding: 5px 20px 5px 7px;
  //   border-radius: 4px;
  // }
`;
