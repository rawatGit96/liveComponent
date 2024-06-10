import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sidebarSelection } from "Services/Redux/sidebarSlice";
import { checkCurrentRoute } from "Utils/constants";
import { font, theme } from "Utils/theme";
import sidebarList, { bottomSidebarList } from "./util";
import { LogoutIcon } from "Utils/svgIcons";
import { authlogout } from "Services/Redux/signInSlice";
import ModalComponent from "Components/Modal/simpleModal";
import ConfirmModal from "Components/Modal/confirmModal";

export default function Sidebar() {
  const { selectedTab } = useSelector((e) => e.sidebar);
  const { data } = useSelector((e) => e.signIn);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail } = data || {};
  const [logoutModal, setLogoutModal] = useState(false);

  const checkActiveRoute = (path) => {
    const newRoute = checkCurrentRoute(path);
    dispatch(sidebarSelection(newRoute));
  };

  useEffect(() => {
    checkActiveRoute(location);
  }, [location]);

  const handleListSelection = (list) => navigate(list.route);

  const handleLogout = () => {
    dispatch(authlogout({}));
  };

  const handleLogoutModal = () => setLogoutModal((pre) => !pre);

  return (
    <>
      <LogoWrapper>
        <ProfileImageWrapper profile={userDetail?.profile_pic_url} />
        <div className="user-info">
          <div className="email">{data?.email}</div>
          <div className="name">{data?.user_name}</div>
        </div>
      </LogoWrapper>
      {sidebarList.map((list) => (
        <List
          key={list.name}
          select={list.name === selectedTab}
          onClick={() => handleListSelection(list)}
        >
          {list.icon}
          <div className="list-name">{list.name}</div>
        </List>
      ))}
      <Line />
      {bottomSidebarList.map((list) => (
        <List
          key={list.name}
          select={list.name === selectedTab}
          onClick={() => handleListSelection(list)}
        >
          {list.icon}
          <div className="list-name">{list.name}</div>
        </List>
      ))}
      <List
        key="logout"
        select={"Logout" === selectedTab}
        onClick={handleLogoutModal}
      >
        <LogoutIcon height="20px" width="20px" />
        <div className="list-name">Logout</div>
      </List>
      {logoutModal && (
        <ModalComponent
          openModal={logoutModal}
          setOpenModal={handleLogoutModal}
        >
          <ConfirmModal
            handleCancel={handleLogoutModal}
            handleConfirm={handleLogout}
            mainHeading="Log Out?"
            subheading="Are you sure you would like to be log out ?"
          />
        </ModalComponent>
      )}
    </>
  );
}

const ProfileImageWrapper = styled.div`
  background: url(${(props) => props.profile});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 52px;
  width: 54px;
  border-radius: 50px;
`;

const Line = styled.div`
  margin: 8px 0;
  border-bottom: 1px solid ${theme.greyText};
`;

const List = styled.div`
  display: flex;
  align-items: center;
  font-size: ${font.small};
  line-height: 14.52px;
  font-weight: 400;
  gap: 5px;
  cursor: pointer;
  .list-name {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: ${(props) =>
      props.select
        ? "linear-gradient(to left, rgba(208, 43, 53, 0.99) , rgba(208, 43, 53, 0.2))"
        : "transparent"};
    border-radius: 5px;
    padding: 0 10px;
  }
  padding-left: 8px;
  height: 49px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 70px;
  padding-left: 8px;
  margin-bottom: 20px;
  font-size: 11px;
  .user-info .email {
    margin-bottom: 5px;
  }
`;
