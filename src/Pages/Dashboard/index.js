import { EllipseText, FlexColumn, FlexRow, Text } from "Pages/styles";
import {
  CommentIcon,
  // DownArrowIcon,
  // FilterIcon,
  RightArrowIcon,
  SingleDownArrowIcon,
  SingleUpArrowIcon,
  ThumbsUpIcon,
  // ViewIcon,
} from "Utils/svgIcons";
import { font, theme } from "Utils/theme";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import DropDown from "Components/Fields/dropdown";
import SimpleBarChart from "Components/Graph/barChart";
import {
  // dashboardFiltersOptions,
  isInteger,
  weekYearGraphData,
  weeksName,
} from "Utils/constants";
import {
  getDashboardMostActiveTimeApi,
  getDashboardMostDownloadApi,
  getDashboardPublishedContentAPI,
  getDashboardSubscribeCountApi,
  getDashboardTopContentAPI,
} from "Services/Api/collection";
import { NoData } from "Components/Fields/backButton";
import AvatarLineLoader, { LineLoader } from "./skeletonLoader";
import moment from "moment";

const OverallInfoCard = ({ heading, data, note, percent, profit, loader }) => {
  return (
    <OverallCardWrapper className="wrapper" profit={profit}>
      {loader ? (
        <LineLoader repeat={[1, 2, 3]} />
      ) : (
        <>
          <Text
            className="card-heading"
            size={font.normal16}
            weight="400"
            lineHeight="24px"
          >
            {heading}
            {percent && (
              <span className="percent-status">
                {profit ? <SingleUpArrowIcon /> : <SingleDownArrowIcon />}&nbsp;
                {percent}
              </span>
            )}
          </Text>
          <Text
            className="card-data"
            size={font.large28}
            weight="700"
            lineHeight="42px"
          >
            {data}
          </Text>
          {note && (
            <Text
              className="card-note"
              size={font.normal}
              weight="400"
              lineHeight="21px"
              color={theme.greyText}
            >
              {note}
            </Text>
          )}
        </>
      )}
    </OverallCardWrapper>
  );
};

const OverallCardWrapper = styled.div`
  height: 140px;
  .card-heading {
    margin-bottom: 12px;
  }
  .percent-status {
    font-size: ${font.small};
    line-height: 14.56px;
    margin-left: 13px;
    padding: 3px 4px;
    border-radius: 50px;
    color: ${(props) => (props.profit ? theme.green : "rgba(255, 0, 0, 1)")};
    background: ${(props) =>
      props.profit ? theme.backgroundGray : "rgba(255, 0, 0, 0.1)"};
  }
`;
function Dashboard() {
  const [publishedContent, setPublishedContent] = useState([]);
  const [topContent, setTopContent] = useState([]);
  const [filter, setFilter] = useState("30");
  const [mostDownloadList, setMostDownloadList] = useState({});
  const [subscribeCount, setSubscribeCount] = useState({});
  //loader
  const [subscribeLoader, setSubscribeLoader] = useState(true);
  const [topContentLoader, setTopContentLoader] = useState(true);
  const [publishedContentLoader, setPublishedContentLoader] = useState(true);
  const [downloadedLoader, setDownloadedLoader] = useState(true);
  const [graphLoader, setGraphLoader] = useState(true);
  const [activeTime, setActiveTime] = useState([]);
  const { data } = useSelector((e) => e.signIn);
  const { userDetail } = data || {};
  const full_name = userDetail?.first_name + " " + userDetail?.last_name;

  const getPublishedContentList = async () => {
    setPublishedContentLoader(true);
    const params = new URLSearchParams();
    params.append("type", filter);
    params.append("page", 1);
    params.append("limit", 4);
    const res = await getDashboardPublishedContentAPI(params);
    if (res?.status === 200) {
      const { data = [] } = res || {};
      setPublishedContent(data);
    }
    setPublishedContentLoader(false);
  };

  const getTopContentList = async () => {
    setTopContentLoader(true);
    const res = await getDashboardTopContentAPI(filter);
    if (res?.status === 200) {
      const { data = [] } = res || {};
      setTopContent(data);
    }
    setTopContentLoader(false);
  };

  const getMostDownloadContent = async () => {
    setDownloadedLoader(true);
    const res = await getDashboardMostDownloadApi(filter);
    if (res?.status === 200) {
      const { data } = res || {};
      setMostDownloadList(data?.[0] ?? {});
    }
    setDownloadedLoader(false);
  };

  const handleFilterSelection = (data) => {
    setFilter(data?.key);
  };

  const getSubscribeCount = async () => {
    setSubscribeLoader(true);
    const res = await getDashboardSubscribeCountApi(filter);
    if (res?.status === 200) {
      const { data } = res || {};
      const { lastCount = 0, totalCount = 1 } = data || {};

      let getTotal = totalCount - lastCount;
      const percent =
        getTotal > 0 ? isInteger((lastCount / getTotal) * 100) : 0; //(lastCount / totalCount) * 100 ?? 0;
      const profit = lastCount >= 0 ? true : false;
      setSubscribeCount({ ...data, percent, profit });
    }
    setSubscribeLoader(false);
  };

  const getMostActiveTime = async () => {
    const currentDay = moment().day() + 1;
    setGraphLoader(true);
    const res = await getDashboardMostActiveTimeApi();
    if (res?.status === 200) {
      const result = weekYearGraphData(weeksName, currentDay, res?.data);
      setActiveTime(result);
    }
    setGraphLoader(false);
  };

  useEffect(() => {
    getPublishedContentList();
    getTopContentList();
    getMostDownloadContent();
    getSubscribeCount();
    getMostActiveTime();
  }, [filter]);

  return (
    <DashboardWrapper>
      <div className="flex-wrap top-section-wrapper">
        <div className="top-heading-wrapper">
          <div className="main-heading">Welcome {full_name}!</div>
          <div className="sub-heading">Creator Dashboard</div>
        </div>
        {/* <FlexRow>
          <Text
            size="13px"
            weight="500"
            lineHeight="15.73px"
            className="today-date"
          >
            Today:Jan 9,2024 &nbsp;
            <DownArrowIcon />
          </Text>
          <DropDown
            items={dashboardFiltersOptions}
            horizontalPadding={1}
            onClick={handleFilterSelection}
          >
            <div className="cursor-pointer">
              <FilterIcon />
            </div>
          </DropDown>
        </FlexRow> */}
      </div>
      <Row gutter={[7, 12]}>
        <Col xs={6} md={8}>
          <OverallInfoCard
            heading="Subscribers"
            data={subscribeCount?.totalCount ?? 0}
            note={`${
              subscribeCount?.lastCount ?? 0
            } in the last ${filter} days`}
            percent={(subscribeCount?.percent ?? 0) + "%"}
            profit={subscribeCount?.profit}
            loader={subscribeLoader}
          />
        </Col>
        <Col xs={6} md={8}>
          <OverallInfoCard
            heading="Today’s  Earnings"
            data="$2,868.99"
            percent="3.0%"
            profit={false}
          />
        </Col>
        <Col xs={6} md={8}>
          <OverallInfoCard heading="Overall Earnings" data="$1,568" />
        </Col>
        <Col xs={14}>
          <PublisedContent className="wrapper">
            <div>
              <Text
                size={font.normal16}
                weight="500"
                lineHeight="19.36px"
                color={theme.greyText}
                className="published-heading"
              >
                Published Content
              </Text>
              {publishedContentLoader ? (
                <AvatarLineLoader repeat={[1, 2, 3, 4]} />
              ) : publishedContent?.length ? (
                publishedContent?.map((list) => (
                  <FlexRow gap="11px" className="content-wrapper">
                    <div className="img-wrapper">
                      <img
                        width="100%"
                        height="auto"
                        src={list?.thumbnail}
                        alt=""
                      />
                    </div>
                    <FlexColumn gap="10px" className="content">
                      <EllipseText
                        size="14px"
                        lineHeight="14.52px"
                        width="100%"
                      >
                        {list?.title}
                      </EllipseText>
                      <FlexRow gap="0px" className="published-content-review">
                        <span>{list?.viewCount ?? 0}</span>
                        <span className="comment-count">
                          <CommentIcon />
                          &nbsp;&nbsp;
                          {list?.comment_count ?? 0}
                        </span>
                        <span className="thumbsup-count">
                          <ThumbsUpIcon width="18px" height="20px" />
                          &nbsp;&nbsp;
                          {list?.likeCount ?? 0}
                        </span>
                      </FlexRow>
                    </FlexColumn>
                  </FlexRow>
                ))
              ) : (
                <NoData />
              )}
            </div>
            <div className="go-to">
              Go to Content &nbsp;
              <RightArrowIcon width="16px" height="16px" />
            </div>
          </PublisedContent>
        </Col>
        <Col xs={10}>
          <TopListing className="wrapper">
            <div>
              <Text
                size="16px"
                weight="500"
                lineHeight="19.36px"
                className="top-list-heading"
              >
                Top 05
              </Text>
              <Text
                size="12px"
                weight="500"
                lineHeight="16.39px"
                className="sub-info"
              >
                <span>
                  {filter !== "1" ? "Last " + filter + " Days" : "Last 24 hrs."}
                </span>
                <span>Views</span>
              </Text>
              {topContentLoader ? (
                <LineLoader repeat={[1, 2, 3]} />
              ) : topContent?.length ? (
                topContent.map((list) => (
                  <ListCount
                    description={list?.title}
                    view={list?.views_count}
                  />
                ))
              ) : (
                <NoData />
              )}
            </div>
            <div className="go-to">
              Go to Analyitcs &nbsp;
              <RightArrowIcon width="16px" height="16px" />
            </div>
          </TopListing>
        </Col>
        <Col xs={12} className="most-hightest-section">
          <PopularContentCard
            heading="Highest Ranking Content"
            contentHeading={topContent?.[0]?.title}
            info={topContent?.[0]?.description}
            dataCount={topContent?.length}
            loader={topContentLoader}
          />
          <PopularContentCard
            heading="Most Downloaded Content"
            contentHeading={mostDownloadList?.title}
            info={`${mostDownloadList?.download_count ?? 0} downloads`}
            dataCount={Object.keys(mostDownloadList)?.length}
            loader={downloadedLoader}
          />
        </Col>
        <Col xs={12}>
          <div className="wrapper">
            <div className="graph-heading">Most Active Times</div>
            <div className="graph-wrapper">
              {graphLoader ? (
                <LineLoader height="260px" />
              ) : (
                <SimpleBarChart
                  YDataKey="view"
                  xDataKey="name"
                  data={activeTime}
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
      <FlexRow gap="30px" className="term-policy-section">
        <span>Terms of use</span>
        <span>Privacy policy </span>
        <span>Mobile App</span>
      </FlexRow>
    </DashboardWrapper>
  );
}

export default Dashboard;

const PopularContentCard = ({
  heading,
  contentHeading,
  info,
  dataCount = 0,
  loader = false,
}) => {
  return (
    <PopularCardWrapper className="wrapper">
      <Text
        size="20px"
        weight="500"
        lineHeight="24px"
        className="popular-heading"
      >
        {heading}
      </Text>
      {loader ? (
        <LineLoader height="96px" />
      ) : (
        <FlexColumn className="content-section" gap="14px">
          {dataCount ? (
            <>
              <div className="popular-content-heading">{contentHeading}</div>
              <div className="flex-wrap">
                <EllipseText
                  width="100%" //"calc(100% - 130px)"
                  className="popular-info"
                >
                  {info}
                </EllipseText>
                {/* <div className="popular-go-to">
                  Go to Content &nbsp;&nbsp;
                  <RightArrowIcon width="16px" height="16px" />
                </div> */}
              </div>
            </>
          ) : (
            <NoData />
          )}
        </FlexColumn>
      )}
    </PopularCardWrapper>
  );
};

const PopularCardWrapper = styled.div`
  padding: 11px 40px;
  .popular-heading {
    margin-bottom: 20px;
  }
  .content-section {
    padding: 19px 24px;
    height: 96px;
    background: rgba(89, 89, 89, 1);
    border-radius: 6px;
    width: 70%;
  }
  .popular-info {
    font-size: ${font.small10};
    font-weight: 500;
    line-height: 12px;
    color: ${theme.greyText};
  }
  .popular-go-to {
    cursor: pointer;
    display: flex;
  }
`;

const ListCount = ({ description, view }) => {
  return (
    <ListCountWrapper className="flex-wrap">
      <EllipseText
        size={font.normal}
        lineHeight="16.94px"
        width="240px"
        className="top-content-description"
      >
        {description}
      </EllipseText>
      <div className="top-content-view">{view}</div>
    </ListCountWrapper>
  );
};
const ListCountWrapper = styled.div`
  padding: 13px 0;
`;

const TopListing = styled.div`
  padding: 23px 29px;
  height: 100%;
  .sub-info {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 17px 0;
    color: ${theme.greyText};
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PublisedContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .published-heading {
    margin-bottom: 21px;
  }
  .content-wrapper {
    margin-bottom: 17px;
  }
  .content {
    width: calc(100% - 140px);
  }
  .img-wrapper {
    height: 50px;
    width: 80px;
    border-radius: 5px;
    overflow: hidden;
    background: ${theme.backgroundGray};
    img {
      object-fit: contain;
    }
  }
  .comment-count,
  .thumbsup-count {
    display: flex;
    align-items: center;
  }
  .published-content-review {
    font-size: 12px;
    line-height: 12.1px;
    font-weight: 400;
    width: 50%;
    justify-content: space-between;
  }
`;

const DashboardWrapper = styled.div`
  position: relative;
  .top-section-wrapper {
    align-items: flex-start !important;
  }
  .top-heading-wrapper {
    padding: 0 5px;
    color: rgba(218, 218, 218, 1);
  }
  .today-date {
    padding: 14px 7px;
    background-color: ${theme.fieldGray};
    border-radius: 5px;
    color: ${theme.greyText};
  }
  .main-heading {
    font-size: ${font.mid2};
    line-height: 24.2px;
    font-weight: 400;
    margin-bottom: 8px;
  }
  .sub-heading {
    font-size: ${font.normal16};
    font-weight: 400;
    line-height: 19.36px;
    margin-bottom: 8px;
  }
  .wrapper {
    background-color: ${theme.wrapperGray};
    padding: 19px 24px;
    border-radius: 24px;
  }
  .go-to {
    display: flex;
    justify-content: end;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.94px;
    margin-top: 50px;
    cursor: pointer;
  }
  .most-hightest-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .graph-heading {
    margin-bottom: 30px;
  }
  .graph-wrapper {
    height: 280px;
    width: 100%;
  }
  .term-policy-section {
    span {
      text-decoration: underline;
      cursor: pointer;
    }
    position: fixed;
    bottom: 5px;
    left: 261px;
    padding: 5px 40px;
    background: ${theme.backgroundGray};
    width: 100%;
  }
`;
