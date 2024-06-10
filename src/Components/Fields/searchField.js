/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Input } from "antd";
import styled from "styled-components";
import { SearchIcon } from "Utils/svgIcons";
import { theme } from "Utils/theme";
// import { theme } from "../../Utils/theme";

const SearchField = ({
  handleSearch,
  size,
  placeholder,
  className = "search-field",
}) => {
  let searchRef;

  const onSearch = (e) => {
    clearTimeout(searchRef);
    searchRef = setTimeout(() => {
      if (handleSearch) handleSearch(e?.target?.value);
    }, 500);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBgContainer: theme.fieldGray,
            colorBorder: theme.fieldGray,
            colorPrimaryHover: theme.greyText,
            colorTextPlaceholder: theme.greyText,
            colorText: theme.white,
            colorPrimary: theme.greyBorder,
          },
        },
      }}
    >
      <SearchComponent
        placeholder={placeholder || "Search..."}
        size={size || "large"}
        allowClear
        suffix={<SearchIcon height="18px" width="18px" />}
        onChange={onSearch}
        className={className}
      />
    </ConfigProvider>
  );
};
export default memo(SearchField);

const SearchComponent = styled(Input)`
  .anticon-close-circle svg path {
    fill: ${theme.greyText};
  }
`;
