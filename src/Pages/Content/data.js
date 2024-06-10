import { FlexRow } from "Pages/styles";
import { theme } from "Utils/theme";
import styled from "styled-components";
import dummyImage from "Assests/dummy.png";
import dummy2 from "Assests/authBackground.png";

export const videoListing = [
  {
    thumbnail: dummyImage,
    content_url: "fdsfads",
    title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
    content_duration: "12:56",
    content_percentage: "36.8",
    view: "11,000",
    genre: "Rock",
    cast: "John Doe",
  },
  {
    thumbnail: dummy2,
    content_url: "fdsfads",
    title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
    content_duration: "30:56",
    content_percentage: "36.8",
    view: "11,000",
    genre: "Rock",
    cast: "John Doe",
  },
  {
    thumbnail: dummyImage,
    content_url: "fdsfads",
    title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
    content_duration: "0:56",
    content_percentage: "36.8",
    view: "11,000",
    genre: "Rock",
    cast: "John Doe",
  },
];

// export const audioListing = [
//   {
//     thumbnail: dummyImage,
//     content_url: "fdsfads",
//     title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
//     avg_duration: "12:56",
//     view: "11,000",
//     genre: "Rock",
//     cast: "John Doe",
//   },
//   {
//     thumbnail: dummy2,
//     content_url: "fdsfads",
//     title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
//     avg_duration: "30:56",
//     view: "11,000",
//     genre: "Rock",
//     cast: "John Doe",
//   },
//   {
//     thumbnail: dummyImage,
//     content_url: "fdsfads",
//     title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
//     avg_duration: "0:56",
//     view: "11,000",
//     genre: "Rock",
//     cast: "John Doe",
//   },
// ];

// export const seriesListing = [
//   {
//     thumbnail: dummyImage,
//     title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
//     episode: "07 episodes",
//     view: "11,000",
//   },
//   {
//     thumbnail: dummy2,
//     title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
//     episode: "07 episodes",
//     view: "11,000",
//   },
//   {
//     thumbnail: dummyImage,
//     title: "Lorem Ipsum Lore Ipsum Lorem Ipsum Lorem Ipsum",
//     episode: "07 episodes",
//     view: "11,000",
//   },
// ];

const FilterHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${theme.greyBorder};
  align-items: center;
  width: 100%;
`;

export const uploadContentOptions = [
  {
    key: "1",
    type: "group",
    // label: <FilterHeading>Upload content</FilterHeading>,
    children: [
      {
        key: "1",
        label: "Video/Audio",
      },
      {
        key: "2",
        label: "Series",
      },
      {
        key: "3",
        label: "Live Event",
      },
      {
        key: "4",
        label: "Live Content",
      },
    ],
  },
];

export const IconWrapper = styled(FlexRow)`
  justify-content: center;
`;
export const Image = styled.img`
  width: 82px;
  height: 80px;
  border-radius: 8px;
  object-fit: contain;
`;

export const UploadContentButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background: ${theme.primaryColor};
  cursor: pointer;
  .upload-btn-text {
    padding: 13px 12px;
    border-right: 1px solid ${theme.black};
  }
  .down-arrow-wrapper {
    padding: 13px;
  }
`;
