import React, { useState } from "react";
import styled from "styled-components";
import DropDown from "Components/Fields/dropdown";
import TabComponent from "Components/Tabs";
import { FlexRow, Text } from "Pages/styles";
import { DownArrowIcon, FilterIcon } from "Utils/svgIcons";
import { theme } from "Utils/theme";
import VideoListing from "./videoListing";
import SeriesListing from "./seriesListing";
import AudioListing from "./audioListing";
import { UploadContentButton, uploadContentOptions } from "./data";
import { dashboardFiltersOptions } from "Utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedContentTab } from "Services/Redux/contentSlice";
import SearchField from "Components/Fields/searchField";

const ContentManagement = () => {
  const { selectedContentTab } = useSelector((e) => e?.content) || {};
  const [filter, setFilter] = useState("365");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchtext, setSearchtext] = useState("");

  const default_items = [
    {
      key: 1,
      label: "Video",
      children: <VideoListing filter={filter} searchtext={searchtext} />,
    },
    {
      key: 2,
      label: "Audio",
      children: <AudioListing filter={filter} searchtext={searchtext} />,
    },
    {
      key: 3,
      label: "Series",
      children: <SeriesListing filter={filter} searchtext={searchtext} />,
    },
  ];

  const handleTabSelection = (selected) =>
    dispatch(setSelectedContentTab(selected));

  const handleContentDropdown = (selectedList) => {
    if (selectedList.key === "1") navigate("/content-upload");
    else if (selectedList.key === "2") navigate("/create-series");
    else if (selectedList.key === "3") navigate("/schedule-event");
    else if (selectedList.key === "4") navigate("/schedule-content");
  };

  const handleFilterSelection = (selectFilter) => setFilter(selectFilter?.key);

  return (
    <>
      <SearchField
        size="middle"
        handleSearch={setSearchtext}
        className="header-search"
      />
      <ContentManagementStyle>
        <div className="bread-container">
          <div>Content Management</div>
          <FlexRow>
            <DropDown
              items={uploadContentOptions}
              textColor="black"
              background="white"
              onClick={handleContentDropdown}
            >
              <UploadContentButton>
                <div className="upload-btn-text">Upload content</div>
                <span className="down-arrow-wrapper">
                  <DownArrowIcon fill="white" />
                </span>
              </UploadContentButton>
            </DropDown>
            {/* <Text
            size="13px"
            weight="500"
            lineHeight="15.73px"
            className="today-date"
          >
            Today : {todayDate}&nbsp;
            <DownArrowIcon />
          </Text> */}
            <DropDown
              items={dashboardFiltersOptions}
              horizontalPadding={1}
              onClick={handleFilterSelection}
            >
              <div className="cursor-pointer">
                <FilterIcon />
              </div>
            </DropDown>
          </FlexRow>
        </div>
        <TabComponent
          items={default_items}
          onChange={handleTabSelection}
          activeKey={selectedContentTab}
        />
        {/* <div className="listing-container">
          {selectedContentTab == 1 && (
            <AudioListing filter={filter} searchtext={searchtext} />
          )}
          {selectedContentTab == 2 && (
            <VideoListing filter={filter} searchtext={searchtext} />
          )}
          {selectedContentTab == 3 && (
            <SeriesListing filter={filter} searchtext={searchtext} />
          )}
        </div> */}
      </ContentManagementStyle>
    </>
  );
};

export default ContentManagement;

const ContentManagementStyle = styled.div`
  .bread-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .today-date {
    padding: 14px 7px;
    background-color: ${theme.fieldGray};
    border-radius: 5px;
    color: ${theme.greyText};
  }
`;
