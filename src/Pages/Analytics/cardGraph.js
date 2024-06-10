import SimpleLineChart from "Components/Graph/lineChart";
import { FlexColumn } from "Pages/styles";
import { font, theme } from "Utils/theme";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InfoCard = ({ heading, value, note }) => {
  return (
    <>
      <div className="cardGraph-heading">{heading}</div>
      <div className="cardGraph-value">{value}</div>
      {note && <div className="cardGraph-note">{note}</div>}
    </>
  );
};

export default function CardGraph({
  options,
  span = 6,
  lineChart = null,
  showLegend = false,
  bottom = "",
  graphLoader = false,
}) {
  const [selectedCard, setSelectedCard] = useState(options[0]?.heading);
  const [selectedGraph, setSelectedGraph] = useState([]);
  const [selectedLineChart, setSelectedLineChart] = useState(null);

  const handleCardClick = (list) => {
    setSelectedGraph(list?.data);
    setSelectedCard(list?.heading);
    const actualLineChart = lineChart ? lineChart : list?.lineChart ?? null;
    setSelectedLineChart(actualLineChart);
  };

  useEffect(() => {
    setSelectedCard(options[0]?.heading);
    setSelectedGraph(options[0]?.data);
    const actualLineChart = lineChart
      ? lineChart
      : options[0]?.lineChart ?? null;
    setSelectedLineChart(actualLineChart);
  }, [options]);

  return (
    <CardGraphWrapper gap="15px" className="graph-wrapper">
      {graphLoader ? (
        <div className="graph-loader">loading...</div>
      ) : (
        <>
          <Row className="card-listing">
            {options?.map((list) => (
              <CardView
                span={span}
                onClick={() => handleCardClick(list)}
                status={selectedCard === list?.heading}
              >
                <InfoCard
                  heading={list?.heading}
                  value={list?.value}
                  note={list?.note}
                />
              </CardView>
            ))}
          </Row>
          <div className="chart">
            <SimpleLineChart
              data={selectedGraph}
              lineChart={selectedLineChart}
              showLegend={selectedLineChart ? true : false}
              LineDataKey={selectedGraph?.[0]?.name ?? null}
            />
          </div>
          {bottom && bottom}
        </>
      )}
    </CardGraphWrapper>
  );
}

const CardGraphWrapper = styled(FlexColumn)`
  background-color: ${theme.backgroundGray} !important;
  border: 1px solid ${theme.wrapperGray};
  .chart {
    height: 240px;
    width: 100%;
  }
  .graph-loader {
    padding: 20px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CardView = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  cursor: pointer;
  background: ${({ status }) =>
    status ? theme.backgroundGray : theme.wrapperGray};
  height: 155px;
  box-shadow: 0px 4px 8.1px 0px ${theme.shadow} inset;
  // &:first-child {
  //   background: ${theme.backgroundGray};
  // }
  .cardGraph-heading {
    font-size: ${font.normal16};
    font-weight: 500;
    text-align: center;
  }
  .cardGraph-value {
    font-size: ${font.large};
    line-height: 29.05px;
    font-weight: 300;
  }
  .cardGraph-note {
    font-size: ${font.small10};
    color: ${theme.greyText};
  }
`;
