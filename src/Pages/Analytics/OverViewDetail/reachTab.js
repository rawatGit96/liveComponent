import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { font } from "Utils/theme";
import CardGraph from "../cardGraph";
import ContentView from "../contentView";
import { useLocation } from "react-router-dom";
import {
  diffStartToEnd,
  errorMessage,
  filterGraphList,
  getDateRange,
} from "Utils/constants";
import { getAnalyticsContentReachAPI } from "Services/Api/collection";

const graphCardOptions = [
  {
    heading: "Impressions",
    value: "0",
  },
  {
    heading: "Impressions click-through rate",
    value: "0",
  },
  {
    heading: "Views",
    value: "0",
  },
  {
    heading: "Unique Viewers",
    value: "0",
  },
];

export default function ReachTab({ selectDays }) {
  const { id } = useLocation()?.state || {};
  const [reachData, setsReachData] = useState({});
  const [cardOptions, setCardOptions] = useState(graphCardOptions);
  const [graphloading, setGraphLoading] = useState(true);

  const modifyGraphData = (data) => {
    const {
      clickThroughRate,
      countOfImpression,
      countOfViews,
      countOfuniqueView,
      contentview = [],
      impression,
      createdAt,
    } = data || {};
    const rangeList =
      selectDays == "0" ? diffStartToEnd(createdAt) : getDateRange(selectDays);
    let updateList = graphCardOptions?.map(({ heading }, index) => {
      if (index === 0) {
        const impressionData = filterGraphList(
          "totalImpression",
          "Impression",
          rangeList,
          impression
        );
        return { heading, value: countOfImpression, data: impressionData };
      } else if (index === 1) {
        const clickThroughRateData = filterGraphList(
          "clickCount",
          "Impression rate",
          rangeList,
          impression
        );
        return {
          heading,
          value: clickThroughRate,
          data: clickThroughRateData,
        };
      }
      if (index === 2) {
        const viewData = filterGraphList(
          "countOfViews",
          "Views",
          rangeList,
          contentview?.views
        );
        return { heading, value: countOfViews, data: viewData };
      } else if (index === 3) {
        const uniqueViewData = filterGraphList(
          "count",
          "Unique Views",
          rangeList,
          contentview?.uniqueViewer
        );

        return {
          heading,
          value: countOfuniqueView,
          data: uniqueViewData,
        };
      }
    });
    setCardOptions(updateList);
  };

  const getReachData = async () => {
    const params = new URLSearchParams();
    params.append("content_id", id);
    params.append("type", selectDays);
    setGraphLoading(true);
    const res = await getAnalyticsContentReachAPI(params);
    if (res?.status === 200) {
      const details = res?.data[0] || {};
      setsReachData(details);
      modifyGraphData(details);
    } else {
      errorMessage(res);
    }
    setGraphLoading(false);
  };

  useEffect(() => {
    getReachData();
  }, [id, selectDays]);

  return (
    <ReachTabWrapper>
      <ContentView contentOverview={reachData} />
      <div className="card-heading">
        This video has gotten {reachData?.viewCount} views since it was
        published
      </div>
      <CardGraph options={cardOptions} span={6} graphLoader={graphloading} />
    </ReachTabWrapper>
  );
}

const ReachTabWrapper = styled.div`
  .card-heading {
    font-size: ${font.mid2};
    text-align: center;
    margin-bottom: 20px;
  }
`;
