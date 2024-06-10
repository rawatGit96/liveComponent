import Button from "Components/Fields/button";
import { DownTriangleIcon, FilterIcon } from "Utils/svgIcons";
import { theme } from "Utils/theme";
import React from "react";
import styled from "styled-components";
import CommentView from "./commentView";
import DropDown from "Components/Fields/dropdown";
import RangeSelector from "Components/Fields/rangePicker";
import { ScrollBar } from "Pages/styles";
import SelectComponent from "Components/Fields/select";
import { last_days_opt } from "Utils/constants";

const FilterHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${theme.greyBorder};
  align-items: center;
  padding: 0 5px;
`;

export const replyItems = [
  {
    key: "1",
    type: "group",
    label: (
      <FilterHeading>
        Filter
        <DownTriangleIcon />
      </FilterHeading>
    ),
    children: [
      {
        key: "1-1",
        label: "Most popular",
      },
      {
        key: "1-2",
        label: "Latest",
      },
    ],
  },
];

export default function CommentSection() {
  const handleSelect = (e) => console.log("select", e);
  return (
    <CommentsWrapper>
      <div className="top-section">
        <div className="heading">Comments</div>
        <div className="filter-section">
          <Button
            text="Published"
            width="120px"
            size="middle"
            bg={theme.wrapperGray}
          />
          <DropDown items={replyItems} horizontalPadding={1}>
            <div className="cursor-pointer">
              <FilterIcon />
            </div>
          </DropDown>
          <div className="date-section">
            <RangeSelector />
            <SelectComponent
              placeholder="select last days"
              options={last_days_opt}
              size="middle"
              onChange={handleSelect}
            />
          </div>
        </div>
      </div>
      <ScrollBar className="comment-listing" height="calc(100vh - 183px)">
        {[1, 2, 3, 4].map(() => (
          <CommentView />
        ))}
      </ScrollBar>
    </CommentsWrapper>
  );
}
const CommentsWrapper = styled.div`
  .top-section {
    display: flex;
    flex-direction: column;
  }
  .heading {
    font-size: 20px;
    padding-top: 15px;
  }
  .filter-section {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 5px 0 15px 0;
    border-bottom: 1px solid ${theme.greyBorder};
  }
  .date-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;
