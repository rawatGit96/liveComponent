import SearchField from "Components/Fields/searchField";
// import { createContentItems } from "Utils/constants";
import { font, theme } from "Utils/theme";
import React from "react";
import styled from "styled-components";
import logo from "../../Assests/logo.png";

export default function Header() {
  return (
    <HeaderWrapper>
      <div className="right-section">
        {/* <DropDown items={createContentItems}>
          <div className="create-btn">
            <VideoAddIcon height="18px" width="18px" />
            Create
          </div>
        </DropDown> */}
        <img src={logo} alt="logo" width="60px" height="41px" />
      </div>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 56px;
  padding: 0 16px;
  // box-shadow: 0px 1px 3px grey;
  .search-field {
    max-width: 450px;
    max-width: 450px;
    position: absolute;
    top: 12px;
    left: 0;
  }
  .right-section {
    display: flex;
  }
  // .create-btn {
  //   display: flex;
  //   align-items: center;
  //   gap: 8px;
  //   cursor: pointer;
  //   color: ${theme.greyText};
  //   font-size: ${font.normal};
  //   background: ${theme.fieldGray};
  //   padding: 8px 12px;
  //   border-radius: 5px;
  // }
`;
