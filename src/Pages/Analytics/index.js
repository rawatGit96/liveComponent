import TabComponent from "Components/Tabs";
import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Overview from "./overView";
import { font } from "Utils/theme";
import RangeSelector from "Components/Fields/rangePicker";
import SelectComponent from "Components/Fields/select";
import { getStartEndDate, last_days_opt } from "Utils/constants";
import ContentTab from "./contentTab";
import AudienceTab from "./audienceTab";
import dayjs from "dayjs";

function Analytics() {
  const [selectDays, setSelectDays] = useState("7");
  const [rangeDate, setRangeDate] = useState([]);
  const [approvedDate, setApprovedDate] = useState(null);

  const items = [
    {
      key: "1",
      label: "Overview",
      children: (
        <Overview selectDays={selectDays} setApprovedDate={setApprovedDate} />
      ),
    },
    {
      key: "2",
      label: "Content",
      children: (
        <ContentTab selectDays={selectDays} setApprovedDate={setApprovedDate} />
      ),
    },
    {
      key: "3",
      label: "Audience",
      children: <AudienceTab selectDays={selectDays} />,
    },
  ];

  useEffect(() => {
    if (selectDays == "0") {
      const startDate = approvedDate
        ? dayjs(approvedDate)
        : dayjs().subtract(1, "day");
      const endDate = dayjs();
      setRangeDate([startDate, endDate]);
    } else {
      const { startDate, endDate } = getStartEndDate(selectDays - 1);
      setRangeDate([startDate, endDate]);
    }
  }, [selectDays]);

  const handleSelect = (e) => setSelectDays(e);

  const operations = (
    <SelectComponent
      placeholder="select last days"
      options={last_days_opt}
      size="middle"
      onChange={handleSelect}
      value={selectDays}
      allowClear={false}
    />
  );
  return (
    <AnalyticsWrapper>
      <div className="flex-wrap">
        <div className="top-heading">Content Analytics</div>
        <RangeSelector disabled={true} defaultValue={rangeDate} />
      </div>
      <TabComponent items={items} operations={operations} />
    </AnalyticsWrapper>
  );
}

export default memo(Analytics);

const AnalyticsWrapper = styled.div`
  .top-heading {
    font-size: ${font.mid2};
  }
`;
