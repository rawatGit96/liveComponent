import { Skeleton } from "antd";
import styled from "styled-components";

function AvatarLineLoader({ repeat = [1, 2] }) {
  return (
    <LoaderWrapper>
      {repeat.map((list) => (
        <div className="multiple-list" key={list}>
          <Skeleton.Avatar active size="small" shape="rectangle" />
          <Skeleton.Input
            size="small"
            active
            className="ant-line-avator-skeleton-input"
          />
        </div>
      ))}
    </LoaderWrapper>
  );
}

export function LineLoader({ repeat = [1], height = "25px" }) {
  return (
    <LoaderWrapper>
      {repeat.map((list) => (
        <Skeleton.Input
          key={list}
          style={{ height }}
          // size="small"
          active
          className="ant-line-skeleton-input"
        />
      ))}
    </LoaderWrapper>
  );
}

export const SkeletonLoader = () => (
  <LoaderWrapper>
    <Skeleton active size="small" />
  </LoaderWrapper>
);

export default AvatarLineLoader;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .ant-line-skeleton-input {
    width: 100% !important;
  }
  .ant-line-avator-skeleton-input {
    width: 90% !important;
  }
  .multiple-list {
    display: flex;
    gap: 8px;
  }
  .ant-skeleton {
    li,
    h3,
    span {
      background-image: linear-gradient(
        90deg,
        rgba(178, 178, 178, 0.2) 25%,
        rgba(164, 164, 164, 0.04) 37%,
        rgba(154, 154, 154, 0.2) 63%
          /* rgba(0, 0, 0, 0.2) 25%,
      rgba(0, 0, 0, 0.3) 37%,
      rgba(0, 0, 0, 0.09) 63% */
      ) !important;
    }
  }
`;
