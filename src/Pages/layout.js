import Header from "Components/Header";
import Sidebar from "Components/Sidebar";
import { theme } from "Utils/theme";
import { Col, Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function Layout() {
  return (
    <LayoutWrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <MainContentWrapper>
        <Header />
        <div className="content-section">
          <Outlet />
        </div>
      </MainContentWrapper>
    </LayoutWrapper>
  );
}
const LayoutWrapper = styled(Row)`
  // padding: 10px;
  background: ${theme.backgroundGray};
  color: ${theme.white};
`;

const SidebarWrapper = styled(Col)`
  display: flex;
  flex-direction: column;
  width: 240px;
  margin: 10px;
  height: calc(100vh - 20px);
  overflow: auto;
  background: ${theme.wrapperGray};
  padding: 10px 0;
  color: ${theme.white};
  border-radius: 15px;
`;

const MainContentWrapper = styled(Col)`
  width: calc(100% - 260px);
  overflow: auto;
  overflow: auto;
  .content-section {
    padding: 20px;
    height: calc(100vh - 76px);
    overflow: auto;
    background: ${theme.screenBackground};
  }
  .content-section::-webkit-scrollbar {
    width: 0px;
  }
`;
