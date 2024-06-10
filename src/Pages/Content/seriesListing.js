import Table from "Components/Table";
import Pagination from "Components/Table/pagination";
import { errorMessage } from "Utils/constants";
import React, { useEffect, useState } from "react";
import { IconWrapper, Image } from "./data";
import { Tooltip, message } from "antd";
import { EllipseText, FlexCenter, IconContainer, LinkText } from "Pages/styles";
import { DeleteIcon, EditIcon, UploadIcon } from "Utils/svgIcons";
import ConfirmModal from "Components/Modal/confirmModal";
import ModalComponent from "Components/Modal/simpleModal";
import {
  deleteSeriesApi,
  getSeriesContentListApi,
} from "Services/Api/collection";
import { useNavigate } from "react-router-dom";

const SeriesListing = ({ filter, searchtext = null }) => {
  const [contentLoader, setContentLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteModal, setDeleteModal] = useState(false);
  const [seriesList, setSeriesList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteSeriesInfo, setDeleteSeriesInfo] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const pageSizeChange = (_, size) => setLimit(size);

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleNavigate = (record) =>
    navigate("/edit-series", { state: { record } });

  const handleDeleteSeries = async () => {
    setDeleteLoading(true);
    const params = new URLSearchParams();
    params.append("series_id", deleteSeriesInfo?.["_id"]);
    params.append("delete_all", 1);
    const res = await deleteSeriesApi(params);
    if (res?.status === 200) {
      if (currentPage > 1) {
        const samePage = (currentPage - 1) * limit + 1 <= totalCount - 1;
        if (samePage) getSeriesList();
        else setCurrentPage((pre) => pre - 1);
      } else getSeriesList();
      message.success(res?.message || "Series delete successfully");
    } else errorMessage(res);
    setDeleteLoading(false);
    setDeleteModal((pre) => !pre);
  };

  const updateDeleteSeriesInfo = (data) => {
    setDeleteSeriesInfo(data);
    setDeleteModal((pre) => !pre);
  };

  const seriesColumns = [
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
      title: "Series",
      dataIndex: "thumbnail",
      key: "thumbnail",
      align: "center",
      width: 110,
      render: (_, record) => <Image src={record?.thumbnail} alt="" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      title: "Episodes",
      dataIndex: "episodeCount",
      key: "episodeCount",
      align: "center",
      width: 140,
      render: (_, record) => <div>{record?.episodeCount} episodes</div>,
    },
    {
      title: "Views",
      dataIndex: "totalViews",
      key: "view",
      align: "center",
      width: 140,
    },
    {
      title: "",
      key: "action",
      align: "center",
      width: 200,
      render: (_, record) => (
        <IconWrapper gap="8px">
          <IconContainer>
            <UploadIcon width="21px" height="21px" />
          </IconContainer>
          <IconContainer onClick={() => handleNavigate(record)}>
            <EditIcon width="19px" height="20px" />
          </IconContainer>
          <IconContainer onClick={() => updateDeleteSeriesInfo(record)}>
            <DeleteIcon width="20px" height="21px" />
          </IconContainer>
          <LinkText
            to="/content-management/series/episodes"
            state={{ data: record }}
          >
            <FlexCenter>View All</FlexCenter>
          </LinkText>
        </IconWrapper>
      ),
    },
  ];

  const getSeriesList = async () => {
    setContentLoader(true);
    const params = new URLSearchParams();
    params.append("type", filter);
    params.append("page", currentPage);
    params.append("limit", limit);
    if (searchtext) {
      params.append("search", searchtext);
    }
    let res = await getSeriesContentListApi(params);
    if (res?.status === 200) {
      const { data = [], count = 0 } = res || {};
      setSeriesList(data);
      setTotalCount(count);
    } else errorMessage(res);
    setContentLoader(false);
  };

  useEffect(() => {
    getSeriesList();
  }, [currentPage, filter, searchtext]);

  return (
    <>
      <Table
        columns={seriesColumns}
        data={seriesList}
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
            handleConfirm={handleDeleteSeries}
            mainHeading="Delete Content"
            subheading="Are you sure you would like to delete the content ?"
            loading={deleteLoading}
          />
        </ModalComponent>
      )}
    </>
  );
};

export default SeriesListing;
