import Table from "Components/Table";
import Pagination from "Components/Table/pagination";
import {
  defaultPageLimit,
  errorMessage,
  secToHourMinuteSec,
} from "Utils/constants";
import React, { useEffect, useState } from "react";
import { IconWrapper, Image } from "./data";
import ConfirmModal from "Components/Modal/confirmModal";
import ModalComponent from "Components/Modal/simpleModal";
import { Tooltip, message } from "antd";
import { EllipseText, FlexCenter, IconContainer } from "Pages/styles";
import {
  ClockIcon,
  DeleteIcon,
  EditIcon,
  HeadPhoneIcon,
  ViewIcon,
} from "Utils/svgIcons";
import {
  deleteContentApi,
  getCreatorContentListApi,
} from "Services/Api/collection";
import { useNavigate } from "react-router-dom";

const AudioListing = ({ filter, searchtext = null }) => {
  const [contentLoader, setContentLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [deleteModal, setDeleteModal] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [deleteContentInfo, setDeleteContentInfo] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const pageSizeChange = (_, size) => setLimit(size);

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleDeleteContentInfo = (userData) => {
    setDeleteContentInfo(userData);
    setDeleteModal((pre) => !pre);
  };

  const handleDeleteContent = async () => {
    setDeleteLoading(true);
    const res = await deleteContentApi(deleteContentInfo?.["_id"]);
    if (res?.status === 200) {
      if (currentPage > 1) {
        const samePage = (currentPage - 1) * limit + 1 <= totalCount - 1;
        if (samePage) getContent();
        else setCurrentPage((pre) => pre - 1);
      } else getContent();
      message.success(res?.message || "Content delete successfully");
    } else errorMessage(res);
    setDeleteLoading(false);
    setDeleteModal((pre) => !pre);
  };

  const audioColumns = [
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
      title: "Audios",
      dataIndex: "thumbnail",
      key: "thumbnail",
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
      title: "Plays",
      dataIndex: "viewCount",
      key: "viewCount",
      align: "center",
      width: 140,
      render: (_, record) => (
        <FlexCenter>
          <HeadPhoneIcon width="20px" height="19px" />
          &nbsp;&nbsp;
          {record?.viewCount}
        </FlexCenter>
      ),
    },
    {
      title: "Average Play Duration",
      dataIndex: "avgDuration",
      key: "avgDuration",
      align: "center",
      width: 160,
      render: (_, record) => (
        <FlexCenter>
          <ClockIcon width="20px" height="19px" />
          &nbsp;&nbsp;
          <span className="percentage">
            {secToHourMinuteSec(record?.avgDuration) ?? 0}
          </span>
        </FlexCenter>
      ),
    },
    {
      title: "",
      key: "action",
      align: "center",
      width: 140,
      render: (_, record) => (
        <IconWrapper gap="8px">
          <IconContainer
            onClick={() => navigate("/details", { state: { record } })}
          >
            <ViewIcon width="19px" height="20px" />
          </IconContainer>
          <IconContainer
            onClick={() => navigate("/edit-content", { state: { record } })}
          >
            <EditIcon width="19px" height="20px" />
          </IconContainer>
          <IconContainer onClick={() => handleDeleteContentInfo(record)}>
            <DeleteIcon width="20px" height="21px" />
          </IconContainer>
        </IconWrapper>
      ),
    },
  ];

  const getContent = async () => {
    setContentLoader(true);
    const params = new URLSearchParams();
    params.append("type", filter);
    params.append("content_type", 1);
    params.append("page", currentPage);
    params.append("limit", limit);
    if (searchtext) {
      params.append("search", searchtext);
    }
    const res = await getCreatorContentListApi(params);
    if (res?.status === 200) {
      const { data = [], count } = res || {};
      setTotalCount(count);
      setContentList(data);
    } else errorMessage(res);
    setContentLoader(false);
  };

  useEffect(() => {
    getContent();
  }, [currentPage, filter, searchtext]);

  return (
    <>
      <Table
        columns={audioColumns}
        data={contentList}
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
};

export default AudioListing;
