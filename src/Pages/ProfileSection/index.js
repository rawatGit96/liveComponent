import React from "react";
import styled from "styled-components";
import ProfileInfoCard from "./profileCard";
import ProfileEditForm from "./profileEditForm";

export default function ProfileSection() {
  return (
    <ProfileWrappper>
      <div className="main-heading">Profile Management</div>
      <ProfileInfoCard />
    </ProfileWrappper>
  );
}

export function ProfileEditSection() {
  return (
    <ProfileWrappper>
      <div className="main-heading">Profile Management</div>
      <ProfileEditForm />
    </ProfileWrappper>
  );
}

const ProfileWrappper = styled.div`
  .main-heading {
    margin: 20px 0 20px 0;
    font-size: 20px;
  }
`;
