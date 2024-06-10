import { Circle } from "Pages/styles";
import { theme } from "Utils/theme";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import styled from "styled-components";

export const dummyData = [
  {
    name: "amt",
    xLabel: "Dec 8, 2023",
    uv: 3,
    pv: 1,
    amt: 2400,
  },
  {
    name: "amt",
    xLabel: "Dec 8, 2023",
    uv: 7,
    pv: 7,
    amt: 2210,
  },
  {
    name: "amt",
    xLabel: "Dec 8, 2023",
    uv: 2,
    pv: 6,
    amt: 2290,
  },
  {
    name: "amt",
    xLabel: "Dec 8, 2023",
    uv: 6,
    pv: 1,
    amt: 2000,
  },
  {
    name: "amt",
    xLabel: "Dec 8, 2023",
    uv: 5,
    pv: 8,
    amt: 2181,
  },
  {
    name: "amt",
    xLabel: "Dec 8, 2023",
    uv: 3.6,
    pv: 3,
    amt: 2500,
  },
  {
    name: "amt",
    xLabel: "Dec 8, 2023",
    uv: 3.0,
    pv: 4,
    amt: 2100,
  },
];

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <LegendWrapper>
      {payload.map((entry, index) => (
        <LegendList key={`item-${index}`}>
          <Circle color={entry?.color} size="12px" />
          {entry?.dataKey}
        </LegendList>
      ))}
    </LegendWrapper>
  );
};

const CustomTooltip = ({ active, payload }) => {
  let unit = payload[0]?.payload?.["unit"] ?? "Podcast";
  const { name } = payload[0]?.payload || {};

  if (active && payload && payload?.length) {
    return (
      <CustomTooltipWrapper className="custom-tooltip">
        <div>{payload[0]?.payload?.xLabel}</div>
        {Array.isArray(name) ? (
          name?.map((list) => (
            <div className="label">{`${list}: ${payload[0]?.payload?.[list]}`}</div>
          ))
        ) : (
          <div className="label">{`${unit}: ${payload[0]?.payload?.[name]}`}</div>
        )}
      </CustomTooltipWrapper>
    );
  }
  return null;
};

const CustomTooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: ${theme.darkPrimary};
  padding: 8px 14px;
  color: ${theme.white};
`;

const SimpleLineChart = ({
  lineChart = [],
  showLegend = false,
  LineDataKey = "uv",
  xDataKey = "xLabel",
  yAxisGrid = false,
  yAxisLabel = null,
  yAxisOrientation = "right",
  width = "100%",
  data,
}) => {
  return (
    <ResponsiveContainer width={width} height="100%">
      <LineChartWrapper
        data={data}
        margin={{
          top: 5,
          left: 30,
          right: 10,
          bottom: 5,
        }}
      >
        <Tooltip
          contentStyle={{ color: theme.greyBorder }}
          cursor={false}
          content={CustomTooltip}
        />
        <CartesianGrid vertical={yAxisGrid} stroke={theme.graphAxisLine} />
        <XAxis
          dataKey={xDataKey}
          tick={{ fill: theme.white, fontSize: "12px" }}
          // interval={0}
          reversed
          // interval={"preserveStart"}
        />
        <YAxis
          orientation={yAxisOrientation}
          tick={{ fill: theme.white, fontSize: "12px" }}
          axisLine={false}
        >
          {yAxisLabel && (
            <Label
              value={yAxisLabel}
              position="left"
              angle={270}
              style={{
                textAnchor: "middle",
                fontWeight: "400",
                fill: theme.white,
              }}
            />
          )}
        </YAxis>
        {showLegend && (
          <Legend verticalAlign="top" height={40} content={renderLegend} />
        )}
        {lineChart?.length > 0 ? (
          lineChart?.map((list) => (
            <Line
              type="linear"
              dataKey={list?.key}
              stroke={list?.color ?? theme.primaryColor}
              dot={false}
            />
          ))
        ) : (
          <Line
            type="linear"
            dataKey={LineDataKey ?? "uv"}
            stroke={theme.primaryColor}
            dot={false}
          />
        )}
      </LineChartWrapper>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;

const LineChartWrapper = styled(LineChart)`
  .recharts-active-dot {
    circle {
      fill: ${theme.white};
    }
  }
`;

const LegendWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const LegendList = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  text-transform: capitalize;
`;
