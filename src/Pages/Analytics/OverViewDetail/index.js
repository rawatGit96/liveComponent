import TabComponent from "Components/Tabs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OverviewTab from "./overviewTab";
import BreadcrumbComponent from "Components/BreadCrumb";
import { font } from "Utils/theme";
import ReachTab from "./reachTab";
import RangeSelector from "Components/Fields/rangePicker";
import SelectComponent from "Components/Fields/select";
import {
  analyticBreadcrumbs,
  audienceBreadcrumbs,
  engagementBreadcrumbs,
  getStartEndDate,
  last_days_opt,
  overviewBreadcrumbs,
} from "Utils/constants";
import EngagementTab from "./engagementTab";
import AudienceTab from "./audienceTab";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

export default function OverDetail() {
  const [selectedTab, setSelectedTab] = useState(overviewBreadcrumbs);
  const [selectDays, setSelectDays] = useState("7");
  const [rangeDate, setRangeDate] = useState([]);
  const { createdAt } = useLocation()?.state?.list || {};

  const items = [
    {
      key: 1,
      label: "Overview",
      children: (
        <OverviewTab selectDays={selectDays} setRangeDate={setRangeDate} />
      ),
    },
    {
      key: 2,
      label: "Reach",
      children: <ReachTab selectDays={selectDays} />,
    },
    {
      key: 3,
      label: "Engagements",
      children: <EngagementTab selectDays={selectDays} />,
    },
    {
      key: 4,
      label: "Audience",
      children: <AudienceTab selectDays={selectDays} />,
    },
  ];

  const handleTabChange = (e) => {
    if (e === 1) setSelectedTab(overviewBreadcrumbs);
    else if (e === 2) setSelectedTab(analyticBreadcrumbs);
    else if (e === 3) setSelectedTab(engagementBreadcrumbs);
    else setSelectedTab(audienceBreadcrumbs);
  };

  useEffect(() => {
    if (selectDays == "0") {
      const startDate = createdAt
        ? dayjs(createdAt)
        : dayjs().subtract(1, "day");
      const endDate = dayjs();
      setRangeDate([startDate, endDate]);
    } else {
      const { startDate, endDate } = getStartEndDate(selectDays - 1);
      setRangeDate([startDate, endDate]);
    }
  }, [selectDays]);

  const handleDaysSelect = (e) => setSelectDays(e);

  const operations = (
    <SelectComponent
      placeholder="select last days"
      options={last_days_opt}
      size="middle"
      onChange={handleDaysSelect}
      value={selectDays}
      allowClear={false}
    />
  );

  return (
    <OverDetailWrapper>
      <BreadcrumbComponent items={selectedTab} />
      <div className="flex-wrap">
        <div className="heading">Content Analytics</div>
        <RangeSelector disabled={true} defaultValue={rangeDate} />
      </div>
      <TabComponent
        items={items}
        operations={operations}
        onChange={handleTabChange}
      />
    </OverDetailWrapper>
  );
}

const OverDetailWrapper = styled.div`
  .heading {
    margin-top: 20px;
    font-size: ${font.mid};
  }
`;
