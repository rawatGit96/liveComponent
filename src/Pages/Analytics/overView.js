import Table from "Components/Table";
import { font, theme } from "Utils/theme";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { columns, overviewData } from "./list";
import Pagination from "Components/Table/pagination";
import { useNavigate } from "react-router-dom";
import CardGraph from "./cardGraph";
import {
  getAnalyticOverviewAPI,
  getAnalyticsTopContentAPI,
} from "Services/Api/collection";
import {
  diffStartToEnd,
  errorMessage,
  filterGraphList,
  getDateRange,
  isInteger,
  secToHour,
  secToHourMinuteSec,
} from "Utils/constants";
import { EllipseText } from "Pages/styles";
import { Tooltip } from "antd";

const graphCardOptions = [
  {
    heading: "Views",
    value: 0, //"12.7k",
  },
  {
    heading: "Watch Time",
    value: 0, //"161.3",
  },
  {
    heading: "Subscribers",
    value: 0, //"+1",
  },
  {
    heading: "Downloads",
    value: 0, //"20",
  },
];

export default function Overview({ selectDays = 0, setApprovedDate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [topContentList, setTopContentList] = useState([]);
  const [cardOptions, setCardOptions] = useState(graphCardOptions);
  const [contentLoader, setContentLoader] = useState(true);
  const [graphloading, setGraphLoading] = useState(true);
  const navigate = useNavigate();

  const getAnalyticData = async () => {
    setGraphLoading(true);
    let res = await getAnalyticOverviewAPI(selectDays);
    if (res?.status === 200) {
      const {
        approved_date = null,
        countOfDownload = 0,
        countOfSubscriber = 0,
        countOfViews = 0,
        countOfwatchTime = 0,
        views = [],
        subscriber = [],
        download = [],
      } = res?.data || {};
      if (setApprovedDate) setApprovedDate(approved_date);
      const rangeList =
        selectDays === "0"
          ? diffStartToEnd(approved_date)
          : getDateRange(selectDays);
      let updateList = [
        "Views",
        "Watch Time (Hours)",
        "Subscribers",
        "Downloads",
      ]?.map((heading, index) => {
        if (index === 0) {
          const viewData = filterGraphList(
            "countOfViews",
            "Views",
            rangeList,
            views
          );
          return { heading, value: countOfViews, data: viewData };
        } else if (index === 1) {
          const watchData = filterGraphList(
            "watchTime",
            "Watch Time",
            rangeList,
            views,
            true
          );
          return {
            heading,
            value: secToHour(countOfwatchTime),
            data: watchData,
          };
        } else if (index === 2) {
          const subscribersData = filterGraphList(
            "countOfSubscribers",
            "Subscribers",
            rangeList,
            subscriber
          );
          return { heading, value: countOfSubscriber, data: subscribersData };
        } else if (index === 3) {
          const downloadData = filterGraphList(
            "countOfDownloads",
            "Downloads",
            rangeList,
            download
          );
          return { heading, value: countOfDownload, data: downloadData };
        }
      });
      setCardOptions(updateList);
    } else errorMessage(res);
    setGraphLoading(false);
  };

  const getTopContent = async () => {
    setContentLoader(true);
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", currentPage);
    params.append("type", selectDays);
    let res = await getAnalyticsTopContentAPI(params);
    if (res?.status === 200) {
      const { data = [] } = res || {};
      setTopContentList(data);
    } else errorMessage(res);
    setContentLoader(false);
  };

  useEffect(() => {
    getAnalyticData();
  }, [selectDays]);

  useEffect(() => {
    getTopContent();
  }, [selectDays, limit, currentPage]);

  const handleRowClick = (list) =>
    navigate("/analytics/overview-detail", {
      state: { id: list?.["_id"], list: list?.["content"] },
    });

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const pageSizeChange = (_, size) => setLimit(size);

  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 30,
      render: (_, record, index) => (
        <List>{(currentPage - 1) * limit + index + 1}</List>
      ),
    },
    {
      title: "Content",
      dataIndex: "content_url",
      key: "content_url",
      align: "center",
      width: 140,
      render: (_, record) => <Image src={record?.content?.thumbnail} alt="" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "content_des",
      align: "center",
      width: 280,
      render: (_, record) => (
        <Tooltip title={record?.content?.title}>
          <EllipseText size="13px" width="250px">
            {record?.content?.title}
          </EllipseText>
        </Tooltip>
      ),
    },
    {
      title: "Average View Duration",
      dataIndex: "content_duration",
      key: "content_duration",
      align: "center",
      width: 160,
      render: (_, record) => (
        <ViewSection>
          {secToHourMinuteSec(record?.avgDuration)}&nbsp;&nbsp;
          <span className="percentage">
            ({isInteger(record?.percentage, 1)}%)
          </span>
        </ViewSection>
      ),
    },

    {
      title: "Views ",
      dataIndex: "view",
      key: "view",
      align: "center",
      width: 140,
      render: (_, record) => <div>{record?.totalView}</div>,
    },
  ];

  return (
    <OverViewWrapper>
      <div className="view-count">
        Your content has received {cardOptions?.[0]?.value} views in the last{" "}
        {selectDays === "0" ? "all" : selectDays} days
      </div>
      <CardGraph options={cardOptions} graphLoader={graphloading} />
      <div className="table-heading">
        Top Content in the last {selectDays === "0" ? "all" : selectDays} days
      </div>
      <Table
        columns={columns}
        data={topContentList}
        handleRowClick={handleRowClick}
        loading={contentLoader}
      />
      <Pagination
        onPageChange={onPageChange}
        current={currentPage}
        pageSizeChange={pageSizeChange}
        // total={20}
      />
    </OverViewWrapper>
  );
}

const OverViewWrapper = styled.div`
  color: ${theme.white};
  .view-count {
    display: flex;
    justify-content: center;
    padding: 3px 0 15px 0;
    font-size: ${font.normal16};
  }
  .table-heading {
    margin: 32px 8px 8px 8px;
    font-size: 20px;
    font-weight: 500;
  }
`;

const ViewSection = styled.div`
  .percentage {
    color: ${theme.greyText};
  }
`;
const List = styled.div`
  color: ${theme.greyText};
`;

const Image = styled.img`
  width: 124px;
  height: 88px;
  border-radius: 8px;
  object-fit: contain;
`;
