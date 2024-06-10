/* eslint-disable react/prop-types */
import { memo } from "react";
import { Table, ConfigProvider } from "antd";
import styled from "styled-components";
import "antd/dist/reset.css";
import { theme } from "../../Utils/theme";

const TableComponent = ({
  columns,
  data,
  loading = false,
  handleRowClick = () => {},
}) => (
  <ConfigProvider
    theme={{
      token: {
        colorText: theme.white,
        borderRadius: 0,
        colorPrimary: theme.primaryColor,
        colorTextDisabled: theme.white,
        //headerSplitColor
      },
      components: {
        Table: {
          headerBg: "rgba(32, 32, 32,1);",
          colorBgContainer: theme.screenBackground, //wrapperGray,
          fontSize: "13px",
          borderColor: "transparent",
          // colorBgElevated: "red",
        },
      },
    }}
  >
    <TableWrap
      columns={columns}
      onRow={(i) => ({
        onClick: () => handleRowClick(i),
      })}
      className="table-wrapper"
      dataSource={data}
      scroll={{ x: 400 }}
      loading={loading}
      size="small"
      pagination={false}
      rowClassName="table-row"
    />
  </ConfigProvider>
);

export default memo(TableComponent);

const TableWrap = styled(Table)`
  // used to hide the header right side line
  .ant-table-cell::before {
    background-color: transparent !important;
  }
  table {
    table-layout: fixed !important; /* rewrite inline styles */
  }
  //used to show the table body border-radius
  .table-row {
    background-color: ${theme.wrapperGray};
    td {
      border-bottom: 1px solid ${theme.greyBorder}!important;
    }
  }
  .table-row:nth-child(2) td:last-child {
    border-top-right-radius: 10px;
  }
  .table-row:nth-child(2) td:first-child {
    border-top-left-radius: 10px;
  }

  .table-row:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
  .table-row:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }
  .ant-empty-description {
    color: ${theme.white};
  }
`;
