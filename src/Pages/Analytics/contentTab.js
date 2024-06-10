import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardGraph from "./cardGraph";
import { Col, Row } from "antd";
import { font, theme } from "Utils/theme";
import MultipleButton from "Components/Fields/multipleButton";
import { FlexColumn } from "Pages/styles";
import { ProgressList } from "./list";
import {
  getAnalyticContentRetentionApi,
  getAnalyticContentViewCountApi,
  getContentAnalyticDataApi,
} from "Services/Api/collection";
import {
  diffStartToEnd,
  errorMessage,
  filterGraphList,
  getDateRange,
  isInteger,
} from "Utils/constants";

const graphCardOptions = [
  {
    heading: "Views",
    value: "21",
  },
  {
    heading: "Shown in feed",
    value: "20",
  },
  {
    heading: "Likes",
    value: "+1",
  },
  {
    heading: "Subscribers",
    value: "11",
  },
];

const btnList = [
  {
    name: "All",
    value: 0,
  },
  {
    name: "Videos",
    value: 1,
  },
  {
    name: "Audio",
    value: 2,
  },
  {
    name: "Klipz",
    value: 3,
  },
];

const content_btn = [
  {
    name: "Overall",
  },
  {
    name: "External",
  },
  {
    name: "Live Kanvas Search",
  },
  {
    name: "Shows You May Like",
  },
];

const ListView = ({ heading, data }) => (
  <div className="flex-wrap">
    <div>{heading}</div>
    <div>{data}</div>
  </div>
);

const contentViewDefault = {
  video: {
    count: 0,
    percentage: 0,
  },
  klipz: {
    count: 0,
    percentage: 0,
  },
  audio: {
    count: 0,
    percentage: 0,
  },
};

export default function ContentTab({ selectDays = 0, setApprovedDate }) {
  const [selectedBtn, setSelectedBtn] = useState(btnList[0]);
  const [viewerBtn, setViewerBtn] = useState("Overall");
  const [contentView, setContentView] = useState(contentViewDefault);
  const [cardOptions, setCardOptions] = useState(graphCardOptions);
  const [retention, setRetention] = useState({});
  const [graphloading, setGraphLoading] = useState(true);

  const handleBtnSelection = (list) => setSelectedBtn(list);

  const handleViewerBtn = (list) => setViewerBtn(list?.name);

  const modifyGraphData = (data) => {
    const {
      views,
      impression,
      likes,
      subscriber,
      approved_date,
      countOfLikes,
      countOfShownInFeed,
      countOfSubscribers,
      countOfViews,
    } = data || {};
    const rangeList =
      selectDays == "0"
        ? diffStartToEnd(approved_date)
        : getDateRange(selectDays);
    if (setApprovedDate) setApprovedDate(approved_date);
    let updateList = ["Views", "Shown in feed", "Likes", "Subscribers"]?.map(
      (heading, index) => {
        if (index === 0) {
          const viewData = filterGraphList(
            "countOfViews",
            "Views",
            rangeList,
            views
          );
          return {
            heading,
            value: countOfViews,
            data: viewData,
          };
        } else if (index === 1) {
          const feedData = filterGraphList(
            "countOfShownInFeed",
            "Shown in feed",
            rangeList,
            impression
          );
          return {
            heading,
            value: countOfShownInFeed,
            data: feedData,
          };
        } else if (index === 2) {
          const likeData = filterGraphList(
            "countOfLikes",
            "Likes",
            rangeList,
            likes
          );
          return {
            heading,
            value: countOfLikes,
            data: likeData,
          };
        } else if (index === 3) {
          const subscriberData = filterGraphList(
            "countOfSubscribers",
            "Subscribers",
            rangeList,
            subscriber
          );
          return {
            heading,
            value: countOfSubscribers,
            data: subscriberData,
          };
        }
      }
    );
    setCardOptions(updateList);
  };

  const handleContentAnalytic = async () => {
    const params = new URLSearchParams();
    params.append("type", selectDays);
    params.append("content_type", selectedBtn?.value);
    setGraphLoading(true);
    const res = await getContentAnalyticDataApi(params);
    if (res?.status === 200) {
      const details = res?.data || {};
      modifyGraphData(details);
    } else errorMessage(res);
    setGraphLoading(false);
  };

  const handleContentView = async () => {
    const res = await getAnalyticContentViewCountApi(selectDays);
    if (res?.status === 200) {
      const { data = [] } = res || {};
      const output = { ...contentView };
      for (let i = 0; i < data.length; i++) {
        const { count = 0, percentage = 0 } = data[i];
        const key = data[i]?.["type"];
        output[key] = { count, percentage };
      }
      setContentView(output);
    } else errorMessage(res);
  };

  const getAudienceRetention = async () => {
    const res = await getAnalyticContentRetentionApi(selectDays);
    if (res?.status === 200) {
      const { view_duration = 0, percentage = 0 } = res?.data[0] || {};
      setRetention({ view_duration, percentage });
    } else errorMessage(res);
  };

  const msg =
    selectDays != 0 ? `Last ${selectDays} days` : "Last, since it upload";

  useEffect(() => {
    handleContentAnalytic();
    handleContentView();
    getAudienceRetention();
  }, [selectedBtn, selectDays]);

  return (
    <ContentTabWrapper>
      <MultipleButton
        btnList={btnList}
        value={selectedBtn?.name}
        handleClick={handleBtnSelection}
      />
      <CardGraph options={cardOptions} span={6} graphLoader={graphloading} />
      <Row gutter={6} className="card-view-wrapper">
        <Col span={12}>
          <div className="card-view">
            <div className="card-heading">How viewers find your Content</div>
            <div className="card-subheading">View {msg}</div>
            <MultipleButton
              btnList={content_btn}
              value={viewerBtn}
              handleClick={handleViewerBtn}
              border={theme.graphAxisLine}
              br="2px"
              btnGap="16px"
            />
            <div className="progress-section left-section">
              <ProgressList heading="Direct or unknown" percent="30" />
              <ProgressList heading="Other Livekanvas features" percent="19" />
              <ProgressList heading="Browse features" percent="9.5" />
              <ProgressList heading="Channel pages" percent="4.8" />
              <ProgressList heading="Suggested videos " percent="4.8" />
              <ProgressList heading="Others" percent="9.5" />
            </div>
            <div className="see-more">See more</div>
          </div>
        </Col>
        <Col span={12} className="right-section-cards">
          <div className="card-view pl-10">
            <div className="card-heading">Audience Retention</div>
            <div className="card-subheading">{msg}</div>
            <FlexColumn gap="16px" className="list-wrapper">
              <ListView
                heading="Average view duration"
                data={isInteger(retention?.view_duration)}
              />
              <ListView
                heading="Average percentage viewed"
                data={retention?.percentage?.toFixed(2) + "%"}
              />
            </FlexColumn>
            <div className="see-more">See more</div>
          </div>
          <div className="card-view pl-10">
            <div className="card-heading">Views</div>
            <div className="card-subheading">{msg}</div>
            <div className="progress-section right-bt-section">
              <ProgressList
                heading="Videos"
                percent={isInteger(contentView["video"]?.percentage)}
                extraInfo={`(${contentView["video"]?.count})`}
              />
              <ProgressList
                heading="Audio"
                percent={isInteger(contentView["audio"]?.percentage)}
                extraInfo={`(${contentView["audio"]?.count})`}
              />
              <ProgressList
                heading="Klipz"
                percent={isInteger(contentView["klipz"]?.percentage)}
                extraInfo={`(${contentView["klipz"]?.count})`}
              />
            </div>
            <div className="see-more">See more</div>
          </div>
        </Col>
      </Row>
    </ContentTabWrapper>
  );
}

const ContentTabWrapper = styled.div`
  .card-view-wrapper {
    margin-top: 40px;
  }
  .list-wrapper {
    margin: 22px 0 10px 0;
  }
  .pl-10 {
    padding-left: 34px !important;
  }
  .card-view {
    background: ${theme.wrapperGray};
    border-radius: 15px;
    padding: 16px;
    border: 1px solid ${theme.backgroundGray};
    .card-heading {
      font-size: ${font.normal16};
      font-weight: 400;
      line-height: normal;
      margin-bottom: 9px;
    }
    .card-subheading {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      color: ${theme.greyText};
    }
  }
  .right-section-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .progress-section {
    // margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .right-bt-section {
    margin: 25px 0;
    .ant-progress-outer {
      margin-inline-end: calc(-2em - 36px);
      padding-inline-end: calc(2em + 36px);
    }
  }
  .left-section {
    margin: 35px 0 60px 0;
  }
  .see-more {
    text-align: right;
    cursor: pointer;
    padding: 5px 15px;
  }
`;
