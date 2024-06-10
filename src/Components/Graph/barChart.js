import { theme } from "Utils/theme";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const dummyData = [
  {
    name: "Sun",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Mon",
    uv: 3000,
    pv: 9398,
    amt: 2510,
  },
  {
    name: "Tue",
    uv: 2000,
    pv: 5800,
    amt: 2290,
  },
  {
    name: "Wed",
    uv: 2780,
    pv: 8908,
    amt: 2000,
  },
  {
    name: "Thur",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Fri",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Sat",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipWrapper className="custom-tooltip">
        <div className="label">{`${payload[0].payload.view} ${payload[0].payload.unit}`}</div>
      </CustomTooltipWrapper>
    );
  }
  return null;
};

const CustomTooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: ${theme.darkPrimary};
  padding: 8px 14px;
  color: ${theme.white};
`;

const SimpleBarChart = ({ xDataKey = "name", YDataKey = "pv", data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        <CartesianGrid vertical={false} stroke={theme.graphAxisLine} />
        <XAxis dataKey={xDataKey} />
        <YAxis hide />
        <Tooltip cursor={false} content={CustomTooltip} />
        <Bar
          dataKey={YDataKey}
          fill={theme.primaryColor}
          radius={[18, 18, 18, 18]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
