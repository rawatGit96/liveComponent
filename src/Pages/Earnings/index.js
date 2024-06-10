import SimpleLineChart, { dummyData } from "Components/Graph/lineChart";
import React, { useState } from "react";
import styled from "styled-components";
import SelectComponent from "Components/Fields/select";
import { earning_options, last_days_opt } from "Utils/constants";
import { font, theme } from "Utils/theme";
import RangeSelector from "Components/Fields/rangePicker";
import MultipleButton from "Components/Fields/multipleButton";
import { EarningCard, FlexColumn } from "Pages/styles";

const btnList = [
  {
    name: "All",
  },
  {
    name: "Videos",
  },
  {
    name: "Audio",
  },
  {
    name: "Live",
  },
];

const Earnings = () => {
  const [selectedBtn, setSelectedBtn] = useState("All");
  const handleSelect = (e) => console.log("select", e);
  const handleBtnSelection = (list) => setSelectedBtn(list?.name);
  return (
    <EarningWrapper>
      <div className="flex-wrap">
        <div className="main-heading">Earnings</div>
        <RangeSelector />
      </div>
      <div className="flex-wrap">
        <MultipleButton
          btnList={btnList}
          value={selectedBtn}
          handleClick={handleBtnSelection}
        />
        <SelectComponent
          placeholder="select last days"
          options={last_days_opt}
          size="middle"
          onChange={handleSelect}
        />
      </div>
      <div className="cards-section">
        <div className="buck-donation vertical-center">
          <FlexColumn>
            <div className="data">$2000</div>
            <div className="heading">Live Bucks</div>
          </FlexColumn>
          <FlexColumn>
            <div className="data">$2000</div>
            <div className="heading">Live Bucks</div>
          </FlexColumn>
        </div>
        <EarningCard data="$2000" heading="Total Earnings" />
        <EarningCard data="$2000" heading="Pending Bucks" />
      </div>
      <div className="graph-wrapper">
        <div className="flex-wrap graph-header">
          <div>Podcast Stats</div>
          <div className="vertical-center">
            <div className="podcast-count-section">
              Total Live Poshows <span className="podcast-count">1000</span>
            </div>
            <SelectComponent
              placeholder="select value"
              options={earning_options}
              size="middle"
              onChange={handleSelect}
            />
          </div>
        </div>
        <div className="chart">
          <SimpleLineChart
            yAxisGrid={true}
            yAxisOrientation="left"
            yAxisLabel="Number of Podcast"
            data={dummyData}
          />
        </div>
      </div>
    </EarningWrapper>
  );
};

export default Earnings;

const EarningWrapper = styled.div`
  .main-heading {
    font-size: ${font.mid2};
    font-weight: 400;
    line-height: 24px;
  }
  .graph-wrapper {
    background: ${theme.backgroundGray};
    padding: 50px 30px;
  }
  .chart {
    height: 240px;
    width: 100%;
  }
  .graph-header {
    margin-bottom: 30px;
  }
  .podcast-count-section {
    margin-right: 10px;
    color: ${theme.greyText};
    span {
      color: ${theme.white};
    }
  }
  .cards-section {
    display: flex;
    gap: 35px;
    margin: 10px 0 20px 0;
  }
  .buck-donation {
    gap: 30px;
    padding: 15px 30px;
    border-radius: 8px;
    background: ${theme.backgroundGray};
    border: 1px solid ${theme.greyBorder};
    .heading {
      color: ${theme.greyText};
      font-size: ${font.normal};
      line-height: 19.36px;
    }
    .data {
      font-size: ${font.mid2};
      line-height: 29.05px;
    }
  }
`;
