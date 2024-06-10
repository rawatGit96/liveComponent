import React, { useEffect, useState } from "react";
import CardGraph from "../cardGraph";
import ContentView from "../contentView";
import { getAnalyticsContentEngagementAPI } from "Services/Api/collection";
import {
  diffStartToEnd,
  errorMessage,
  filterGraphList,
  getDateRange,
  secToHour,
} from "Utils/constants";
import { useLocation } from "react-router-dom";

const graphCardOptions = [
  {
    heading: "Watch Time (Hours)",
    value: "200.2",
  },
  {
    heading: "Average View Duration",
    value: "11.1",
  },
];

export default function EngagementTab({ selectDays }) {
  const { id } = useLocation()?.state || {};
  const [cardOptions, setCardOptions] = useState(graphCardOptions);
  const [engagementData, setsEngagementData] = useState({});
  const [graphloading, setGraphLoading] = useState(true);

  const modifyGraphData = (data) => {
    const {
      countOfaverageTime = 0,
      countOfwatchTime = 0,
      contentview = [],
      createdAt,
    } = data || {};
    const rangeList =
      selectDays == "0" ? diffStartToEnd(createdAt) : getDateRange(selectDays);
    let updateList = [
      "Watch Time (Hours)",
      "Average View Duration (Hours)",
    ]?.map((heading, index) => {
      if (index === 0) {
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
      } else if (index === 1) {
        const viewData = filterGraphList(
          "averageTime",
          "Average Time",
          rangeList,
          contentview,
          true
        );
        return {
          heading,
          value: secToHour(countOfaverageTime),
          data: viewData,
        };
      }
    });
    setCardOptions(updateList);
  };

  const getEngagementData = async () => {
    const params = new URLSearchParams();
    params.append("content_id", id);
    params.append("type", selectDays);
    setGraphLoading(true);
    const res = await getAnalyticsContentEngagementAPI(params);
    if (res?.status === 200) {
      const details = res?.data[0] || {};
      setsEngagementData(details);
      modifyGraphData(details);
    } else errorMessage(res);
    setGraphLoading(false);
  };

  useEffect(() => {
    getEngagementData();
  }, [id, selectDays]);

  return (
    <>
      <ContentView contentOverview={engagementData} />
      <CardGraph options={cardOptions} span={12} graphLoader={graphloading} />
    </>
  );
}

// const EngagementTabWrapper = styled.div``;
