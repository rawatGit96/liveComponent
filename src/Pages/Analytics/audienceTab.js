import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardGraph from "./cardGraph";
import QuestionCard from "./OverViewDetail/QuestionCard";
import { Col, Row } from "antd";
import { font, theme } from "Utils/theme";
import {
  diffStartToEnd,
  errorMessage,
  filterGraphList,
  filter_CombineGraphList,
  getDateRange,
} from "Utils/constants";
import { getAudienceAnalyticDataApi } from "Services/Api/collection";

const graphCardOptions = [
  {
    heading: "Returning Viewers",
    value: "12",
  },
  {
    heading: "Unique Viewers",
    value: "25",
    note: "34% less than previous 30 days",
  },
  {
    heading: "Subscribers",
    value: "-25",
    note: "26% more than previous 30 days",
  },
];

const lineChart = [
  {
    key: "returningViewer",
    color: theme.primaryColor,
    legendName: "Retuning Viewers",
  },
  {
    key: "newViewer",
    color: theme.darkBlue,
    legendName: "New Viewers",
  },
];

export default function AudienceTab({ selectDays = 0, setApprovedDate }) {
  const [cardOptions, setCardOptions] = useState(graphCardOptions);
  const [graphloading, setGraphLoading] = useState(true);

  const modifyGraphData = (data) => {
    const {
      countOfuniqueView = 0,
      countOfReturningViews = 0,
      countOfSubscriber = 0,
      // contentview = [],
      subscriber = [],
      createdAt,
      approved_date,
    } = data || {};
    const { newViewer, returningViewer, uniqueViewer } = data?.content || {};
    const rangeList =
      selectDays == "0" ? diffStartToEnd(createdAt) : getDateRange(selectDays);
    if (setApprovedDate) setApprovedDate(approved_date);
    let updateList = [
      "Returning Viewers",
      "Unique Viewers",
      "Subscribers",
    ]?.map((heading, index) => {
      if (index === 0) {
        const watchData = filter_CombineGraphList(
          ["returningViewer", "newViewer"],
          "Views",
          rangeList,
          {
            returningViewer: returningViewer,
            newViewer: newViewer,
          }
        );
        return {
          heading,
          value: countOfReturningViews,
          data: watchData,
          lineChart,
        };
      } else if (index === 1) {
        const uniqueData = filterGraphList(
          "count",
          "View",
          rangeList,
          uniqueViewer
        );
        return {
          heading,
          value: countOfuniqueView,
          data: uniqueData,
        };
      } else if (index === 2) {
        const subscriberData = filterGraphList(
          "count",
          "Subscribes",
          rangeList,
          subscriber
        );
        return {
          heading,
          value: countOfSubscriber,
          data: subscriberData,
        };
      }
    });
    setCardOptions(updateList);
  };

  const getAudienceData = async () => {
    const params = new URLSearchParams();
    params.append("type", selectDays);
    setGraphLoading(true);
    const res = await getAudienceAnalyticDataApi(params);
    if (res?.status === 200) {
      const details = res?.data || {};
      // setAudienceData(details);
      modifyGraphData(details);
    } else errorMessage(res);
    setGraphLoading(false);
  };

  useEffect(() => {
    getAudienceData();
  }, [selectDays]);

  return (
    <AudienceTabWrapper>
      <CardGraph
        options={cardOptions}
        span={8}
        // lineChart={lineChart}
        graphLoader={graphloading}
        showLegend
        bottom={
          <ChartBottom className="flex-wrap">
            <div className="cursor-pointer">See more</div>
            <div className="cursor-pointer">Chart guide </div>
          </ChartBottom>
        }
      />
      <Row className="question-wrapper" gutter={[6, 6]}>
        <Col span={12}>
          <QuestionCard
            heading="When your viewers are on Livekanvas"
            time="Your local time (GMT-0500) - Last 30 days"
            data="Not enough viewer data to show this report"
          />
        </Col>
        <Col span={12}>
          <QuestionCard
            heading="Creators your audience watches "
            time="Last 30 days"
            data="Not enough eligible audience data to show this report. Learn more"
          />
        </Col>
        <Col span={12}>
          <QuestionCard
            heading="What your audience watches"
            time="Last 30 days"
            data="Not enough eligible audience data to show this report. Learn more"
          />
        </Col>
      </Row>
    </AudienceTabWrapper>
  );
}

const AudienceTabWrapper = styled.div`
  .graph-wrapper {
    margin-top: 30px;
  }
  .question-wrapper {
    margin-top: 20px;
  }
`;

const ChartBottom = styled.div`
  color: ${theme.greyText};
  font-size: ${font.small};
  padding: 0 25px;
  margin-bottom: 20px;
`;
