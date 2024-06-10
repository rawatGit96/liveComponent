import Table from "Components/Table";
import Pagination from "Components/Table/pagination";
import {
  dashboardFiltersOptions,
  errorMessage,
  isInteger,
  joinArrayString,
} from "Utils/constants";
import React, { useEffect, useState } from "react";
import {
  IconWrapper,
  Image,
  UploadContentButton,
  uploadContentOptions,
  videoListing,
} from "./data";
import { EllipseText, FlexRow, IconContainer, Text } from "Pages/styles";
import DropDown from "Components/Fields/dropdown";
import {
  DeleteIcon,
  DownArrowIcon,
  EditIcon,
  FilterIcon,
  ViewIcon,
} from "Utils/svgIcons";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import BreadcrumbComponent from "Components/BreadCrumb";
import { Tooltip, message } from "antd";
import ConfirmModal from "Components/Modal/confirmModal";
import ModalComponent from "Components/Modal/simpleModal";
import { theme } from "Utils/theme";
import {
  deleteSeriesApi,
  getCreatorContentListApi,
} from "Services/Api/collection";
import SearchField from "Components/Fields/searchField";

function SeriesEpisode() {
  const [contentLoader, setContentLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteModal, setDeleteModal] = useState(false);
  const [seriesEpisode, setSeriesEpisode] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteEpisodeInfo, setDeleteEpisodeInfo] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchtext, setSearchtext] = useState("");
  const { data } = useLocation()?.state || {};

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const pageSizeChange = (_, size) => setLimit(size);
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      title: (
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          Content Management
        </div>
      ),
    },
    { title: data?.title ?? "--" },
  ];

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleDeleteContent = async () => {
    setDeleteLoading(true);
    const params = new URLSearchParams();
    params.append("series_id", data?.["_id"]);
    params.append("content_id", deleteEpisodeInfo?.["_id"]);
    const res = await deleteSeriesApi(params);
    if (res?.status === 200) {
      if (currentPage > 1) {
        const samePage = (currentPage - 1) * limit + 1 <= totalCount - 1;
        if (samePage) getSeriesEpisode();
        else setCurrentPage((pre) => pre - 1);
      } else getSeriesEpisode();
      message.success(res?.message || "Episode delete successfully");
    } else errorMessage(res);
    setDeleteLoading(false);
    setDeleteModal((pre) => !pre);
  };

  const handleDeleteEpisodeInfo = (info) => {
    setDeleteEpisodeInfo(info);
    setDeleteModal((pre) => !pre);
  };

  const navigateToEditSection = (record) =>
    navigate("/edit-episode", {
      state: { episodeInfo: record, seriesInfo: data },
    });

  const videoColumns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 30,
      render: (_, record, index) => (
        <div>{(currentPage - 1) * limit + index + 1}</div>
      ),
    },
    {
      title: "Episode",
      dataIndex: "thumbnail",
      key: "content_url",
      align: "center",
      width: 110,
      render: (_, record) => <Image src={record?.thumbnail} alt="" />,
    },
    {
      title: "Title",
      dataIndex: "content_des",
      key: "content_des",
      align: "center",
      width: 280,
      render: (_, record) => (
        <Tooltip title={record?.title}>
          <EllipseText size="13px" width="250px">
            {record?.title}
          </EllipseText>
        </Tooltip>
      ),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "view",
      align: "center",
      width: 140,
    },
    {
      title: "Cast",
      dataIndex: "cast",
      key: "view",
      align: "center",
      width: 140,
      render: (_, record, index) => (
        <div>{joinArrayString(record?.cast, "user_name", ",")}</div>
      ),
    },
    {
      title: "Views",
      dataIndex: "viewCount",
      key: "view",
      align: "center",
      width: 140,
      render: (_, record) => <div>{record?.viewCount}</div>,
    },
    {
      title: "",
      key: "action",
      align: "center",
      width: 140,
      render: (_, record) => (
        <IconWrapper gap="8px">
           <IconContainer  onClick={()=>navigate("/details",{state:{record}})}>
          <ViewIcon width="19px" height="20px"/> 
          </IconContainer>
          <IconContainer onClick={() => navigateToEditSection(record)}>
            <EditIcon width="19px" height="20px" />
          </IconContainer>
          <IconContainer onClick={() => handleDeleteEpisodeInfo(record)}>
            <DeleteIcon width="20px" height="21px" />
          </IconContainer>
        </IconWrapper>
      ),
    },
  ];

  const getSeriesEpisode = async () => {
    setContentLoader(true);
    const params = new URLSearchParams();
    params.append("type", "365");
    params.append("series_id", data?._id);
    params.append("page", currentPage);
    params.append("limit", limit);
    params.append("search", searchtext);
    const res = await getCreatorContentListApi(params);
    if (res?.status === 200) {
      const { data = [], count = 0 } = res || {};
      setSeriesEpisode(data);
      setTotalCount(count);
    } else errorMessage(res);
    setContentLoader(false);
  };

  useEffect(() => {
    getSeriesEpisode();
  }, [currentPage, searchtext]);

  return (
    <>
      <SearchField
        size="middle"
        handleSearch={setSearchtext}
        className="header-search"
      />
      <TopHeader>
        <BreadcrumbComponent items={breadcrumbs} />
        {/* <FlexRow>
          <DropDown
            items={uploadContentOptions}
            textColor="black"
            background="white"
          >
            <UploadContentButton>
              <div className="upload-btn-text">Upload content</div>
              <span className="down-arrow-wrapper">
                <DownArrowIcon fill="white" />
              </span>
            </UploadContentButton>
          </DropDown>
          <Text
            size="13px"
            weight="500"
            lineHeight="15.73px"
            className="today-date"
          >
            Today:Jan 9,2024 &nbsp;
            <DownArrowIcon />
          </Text>
          <DropDown items={dashboardFiltersOptions} horizontalPadding={1}>
            <div className="cursor-pointer">
              <FilterIcon />
            </div>
          </DropDown>
        </FlexRow> */}
      </TopHeader>
      <Table
        columns={videoColumns}
        data={seriesEpisode}
        loading={contentLoader}
      />
      <Pagination
        onPageChange={onPageChange}
        current={currentPage}
        pageSizeChange={pageSizeChange}
        total={totalCount}
      />
      {deleteModal && (
        <ModalComponent
          openModal={deleteModal}
          setOpenModal={handleDeleteModal}
        >
          <ConfirmModal
            handleCancel={handleDeleteModal}
            handleConfirm={handleDeleteContent}
            mainHeading="Delete Content"
            subheading="Are you sure you would like to delete the content ?"
            loading={deleteLoading}
          />
        </ModalComponent>
      )}
    </>
  );
}

export default SeriesEpisode;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .today-date {
    padding: 14px 7px;
    background-color: ${theme.fieldGray};
    border-radius: 5px;
    color: ${theme.greyText};
  }
`;
