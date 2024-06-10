import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardGraph from "../cardGraph";
import ContentView from "../contentView";
import { font, theme } from "Utils/theme";
import { Col, Row } from "antd";
import { ProgressList } from "../list";
import { FlexColumn, Line } from "Pages/styles";
import { useLocation } from "react-router-dom";
import {
  diffStartToEnd,
  errorMessage,
  filterGraphList,
  filter_CombineGraphList,
  getDateRange,
  isInteger,
} from "Utils/constants";
import {
  getAnalyticsContentAudienceAPI,
  getContentAgeAnalyticsAPI,
  getContentCountryAnalyticsAPI,
  getContentGenderAnalyticsAPI,
  getContentSubscribeAnalyticsAPI,
} from "Services/Api/collection";

const graphCardOptions = [
  {
    heading: "Returning Viewers",
    value: "---",
  },
  {
    heading: "Unique Viewers",
    value: "---",
  },
  {
    heading: "Subscribers",
    value: "---",
  },
];

const defaultGenderCount = { male: 0, female: 0, unspecified: 0 };

const defaultAgeCount = {
  "13-17": 0,
  "18-24": 0,
  "25-34": 0,
  "35-44": 0,
  "45-54": 0,
  "55-64": 0,
  "65+": 0,
};

const defaultSubscribesCount = {
  1: 0, //used for subscibed user
  0: 0, //used for unsubscibed user
};

const defaultCountries = {
  italy: 0,
  mexico: 0,
  france: 0,
  jamaica: 0,
  // "united states": 0,
};

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

export default function AudienceTab({ selectDays }) {
  const { id } = useLocation()?.state || {};
  const [cardOptions, setCardOptions] = useState(graphCardOptions);
  const [audienceData, setAudienceData] = useState({});
  const [genderViewPercent, setGenderViewPercent] =
    useState(defaultGenderCount);
  const [ageViewPercent, setAgeViewPercent] = useState(defaultAgeCount);
  const [subscribePercent, setSubscribePercent] = useState(
    defaultSubscribesCount
  );
  const [countryPercent, setCountryPercent] = useState(defaultCountries);
  const [graphloading, setGraphLoading] = useState(true);

  const modifyGraphData = (data) => {
    const {
      countOfuniqueView = 0,
      countOfReturningViews = 0,
      countOfSubscriber = 0,
      contentview = [],
      subscriber = [],
      createdAt,
    } = data || {};
    const rangeList =
      selectDays == "0" ? diffStartToEnd(createdAt) : getDateRange(selectDays);
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
            returningViewer: contentview?.returningViewer,
            newViewer: contentview?.newViewer,
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
          contentview?.uniqueViewer
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

  const params = new URLSearchParams();
  params.append("content_id", id);
  params.append("type", selectDays);

  const getAudienceData = async () => {
    setGraphLoading(true);
    const res = await getAnalyticsContentAudienceAPI(params);
    if (res?.status === 200) {
      const details = res?.data[0] || {};
      setAudienceData(details);
      modifyGraphData(details);
    } else errorMessage(res);
    setGraphLoading(false);
  };

  const getAudienceGenderData = async () => {
    const res = await getContentGenderAnalyticsAPI(params);
    if (res?.status === 200) {
      const { users = [] } = res?.data || {};
      const genderCounts = { ...defaultGenderCount };
      for (let i = 0; i < users.length; i++) {
        const data = users[i]["gender"]?.toLowerCase();
        genderCounts[data] = isInteger(users[i]?.percentage, 1);
      }
      setGenderViewPercent(genderCounts);
    } else errorMessage(res);
  };

  const getAudienceAgeData = async () => {
    const res = await getContentAgeAnalyticsAPI(params);
    if (res?.status === 200) {
      const { users = [] } = res?.data || {};
      const ageCounts = { ...defaultAgeCount };
      for (let i = 0; i < users.length; i++) {
        const data = users[i]["range"];
        ageCounts[data] = isInteger(users[i]?.percentage);
      }
      setAgeViewPercent(ageCounts);
    } else errorMessage(res);
  };

  const getAudienceSubscribeData = async () => {
    const res = await getContentSubscribeAnalyticsAPI(params);
    if (res?.status === 200) {
      const { users = [] } = res?.data || {};
      const subscribeCounts = { ...defaultAgeCount };
      for (let i = 0; i < users.length; i++) {
        const data = users[i]["subscribe"];
        subscribeCounts[data] = isInteger(users[i]?.percentage);
      }
      setSubscribePercent(subscribeCounts);
    } else {
      errorMessage(res);
    }
  };
  const getAudienceCountryData = async () => {
    const res = await getContentCountryAnalyticsAPI(params);
    if (res?.status === 200) {
      const { users = [] } = res?.data || {};
      const countriesCounts = { ...defaultCountries };
      for (let i = 0; i < users.length; i++) {
        const data = users[i]["country"].toLowerCase();
        countriesCounts[data] = isInteger(users[i]?.percentage);
      }
      setCountryPercent(countriesCounts);
    } else {
      errorMessage(res);
    }
  };

  useEffect(() => {
    getAudienceData();
    getAudienceGenderData();
    getAudienceAgeData();
    getAudienceSubscribeData();
    getAudienceCountryData();
  }, [id, selectDays]);

  return (
    <AudienceTabWrapper>
      <ContentView contentOverview={audienceData} />
      <CardGraph
        options={cardOptions}
        span={8}
        // lineChart={lineChart}
        showLegend
        graphLoader={graphloading}
      />
      <Row gutter={6} className="audience-card-section">
        {/* left section ------------ */}
        <Col span={12}>
          <div className="audience-card">
            <div className="audience-heading">Age and gender</div>
            <div className="upload-time">
              Views -{" "}
              {selectDays === "0"
                ? "since uploaded"
                : `Last ${selectDays} Days`}
            </div>
            <FlexColumn gap="10px" className="progress-section">
              <ProgressList
                heading="Female"
                percent={genderViewPercent.female}
              />
              <ProgressList heading="Male" percent={genderViewPercent.male} />
              <ProgressList
                heading="Unspecified"
                percent={genderViewPercent.unspecified}
              />
            </FlexColumn>
            <Line />
            <FlexColumn gap="10px" className="progress-section">
              <ProgressList
                heading="13 - 17 years"
                percent={ageViewPercent["13-17"]}
              />
              <ProgressList
                heading="18 - 24 years"
                percent={ageViewPercent["18-24"]}
              />
              <ProgressList
                heading="25 - 34 years"
                percent={ageViewPercent["25-34"]}
              />
              <ProgressList
                heading="35 - 44 years"
                percent={ageViewPercent["35-44"]}
              />
              <ProgressList
                heading="45 - 54 years"
                percent={ageViewPercent["45-54"]}
              />
              <ProgressList
                heading="55 - 64 years"
                percent={ageViewPercent["55-64"]}
              />
              <ProgressList
                heading="65+ years"
                percent={ageViewPercent["65+"]}
              />
            </FlexColumn>
            <div className="see-more">See more</div>
          </div>
        </Col>
        {/* right section---------- */}
        <Col span={12} className="card-left-section">
          <div className="audience-card">
            <div className="audience-heading">Watch time from subscribers</div>
            <div className="upload-time">
              Watch time -{" "}
              {selectDays === "0"
                ? "since uploaded"
                : `Last ${selectDays} Days`}
            </div>
            <FlexColumn gap="10px" className="progress-section">
              <ProgressList
                heading="Not Subscribed"
                percent={subscribePercent[0]}
              />
              <ProgressList
                heading="Subscribed"
                percent={subscribePercent[1]}
              />
            </FlexColumn>
            <div className="see-more">See more</div>
          </div>
          <div className="audience-card">
            <div className="audience-heading">Top geographies</div>
            <div className="upload-time">
              Views -{" "}
              {selectDays === "0"
                ? "since uploaded"
                : `Last ${selectDays} Days`}
            </div>
            <FlexColumn gap="10px" className="progress-section">
              <ProgressList heading="Italy" percent={countryPercent?.italy} />
              <ProgressList heading="Mexico" percent={countryPercent?.mexico} />
              <ProgressList heading="France" percent={countryPercent.france} />
              <ProgressList
                heading="Jamaica"
                percent={countryPercent.jamaica}
              />
              <ProgressList
                heading="Unspecified"
                percent={countryPercent.other}
              />
            </FlexColumn>
            <div className="see-more">See more</div>
          </div>
        </Col>
      </Row>
    </AudienceTabWrapper>
  );
}

const AudienceTabWrapper = styled.div`
  .audience-card-section {
    margin-top: 50px;
    .audience-heading {
      font-size: ${font.mid2};
      font-weight: 400;
      line-height: normal;
      margin-bottom: 7px;
    }
    .upload-time {
      color: ${theme.greyText};
      font-size: ${font.small13};
      font-weight: 500;
      line-height: normal;
    }
    .card-left-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .audience-card {
      background: ${theme.backgroundGray};
      border: 0.3px solid ${theme.wrapperGray};
      padding: 18px 30px;
    }
    .progress-section {
      margin: 27px 0;
    }
    .see-more {
      font-size: ${font.normal};
      font-weight: 400;
      line-height: normal;
      color: ${theme.greyText};
      cursor: pointer;
    }
  }
`;
