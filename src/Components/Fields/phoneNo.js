import { theme } from "Utils/theme";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "styled-components";

const PhoneField = ({ value, onChange, themeColor = "black" }) => {
  return (
    <PhoneInputWrapper
      themeColor={themeColor}
      placeholder="Phone Number"
      inputClass="country-phoneNo"
      inputStyle={{
        backgroundColor: theme.transparent,
        borderColor: theme.greyBorder,
        color: themeColor === "white" ? theme.black : theme.white,
      }}
      value={value}
      onChange={(value, country, e, formattedValue) => {
        console.log("phone", value, country, e, formattedValue);
        onChange(formattedValue);
      }}
    />
  );
};

export default PhoneField;

const PhoneInputWrapper = styled(PhoneInput)`
  .country-phoneNo {
    width: 100% !important;
    height: 45px !important;
  }
  .flag-dropdown {
    border: 1px solid ${theme.greyText}!important;
    .selected-flag {
      background-color: ${(props) =>
        props.themeColor === "white" ? "" : theme.backgroundGray}!important;
    }
  }
`;
