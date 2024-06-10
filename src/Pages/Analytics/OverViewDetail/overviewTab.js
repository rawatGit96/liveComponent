import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardGraph from "../cardGraph";
import { font } from "Utils/theme";
import ContentView from "../contentView";
import { useLocation } from "react-router-dom";
import { getAnalyticsContentOverviewAPI } from "Services/Api/collection";
import {
  diffStartToEnd,
  errorMessage,
  filterGraphList,
  getDateRange,
  secToHour,
} from "Utils/constants";

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
];

export default function OverViewDetail({ selectDays = 0 }) {
  const { id } = useLocation()?.state || {};
  const [contentOverview, setContentOverview] = useState({});
  const [cardOptions, setCardOptions] = useState(graphCardOptions);
  const [graphloading, setGraphLoading] = useState(true);

  const modifyGraphData = (data) => {
    const {
      createdAt,
      countOfSubscriber = 0,
      countOfViews = 0,
      countOfwatchTime = 0,
      contentview = [],
      subscriber = [],
    } = data || {};
    const rangeList =
      selectDays === "0" ? diffStartToEnd(createdAt) : getDateRange(selectDays);
    let updateList = ["Views", "Watch Time (Hours)", "Subscribers"]?.map(
      (heading, index) => {
        if (index === 0) {
          const viewData = filterGraphList(
            "countOfViews",
            "Views",
            rangeList,
            contentview
          );
          return { heading, value: countOfViews, data: viewData };
        } else if (index === 1) {
          const watchData = filterGraphList(
            "watchTime",
            "Watch Time",
            rangeList,
            contentview,
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
        }
      }
    );
    setCardOptions(updateList);
  };

  const getContentDetails = async () => {
    const params = new URLSearchParams();
    params.append("content_id", id);
    params.append("type", selectDays);
    setGraphLoading(true);
    const res = await getAnalyticsContentOverviewAPI(params);
    if (res?.status === 200) {
      const details = res?.data[0] || {};
      modifyGraphData(details);
      setContentOverview(details);
    } else errorMessage(res);
    setGraphLoading(false);
  };

  useEffect(() => {
    getContentDetails();
  }, [id, selectDays]);

  return (
    <ViewDetailWrapper>
      <ContentView contentOverview={contentOverview} />
      <div className="card-heading">
        This video has gotten {contentOverview?.viewCount ?? 0} views since it
        was published
      </div>
      <CardGraph options={cardOptions} span={8} graphLoader={graphloading} />
    </ViewDetailWrapper>
  );
}

const ViewDetailWrapper = styled.div`
  .card-heading {
    font-size: ${font.mid2};
    text-align: center;
    margin-bottom: 20px;
  }
`;
