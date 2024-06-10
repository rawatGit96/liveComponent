import { CloseCircleOutlined, StopOutlined } from "@ant-design/icons";
import { message } from "antd";
import { theme } from "./theme";
import { DownTriangleIcon, FileIcon } from "./svgIcons";
import moment from "moment";
import dayjs from "dayjs";
import styled from "styled-components";
import axios from "axios";
import store from "Services/Redux/store";
import { route } from "Services/Api/collection";

export const defaultPageLimit = 10;

export const defaultMessage = {
  invalidToken: "Please try again or use valid token.",
};

export const errorMessage = (res) =>
  message.error(res?.message || res || "Something went wrong");

export const createContentItems = [
  {
    label: "Upload Videos",
    key: "0",
  },
  {
    label: "Go Live",
    key: "1",
  },
  {
    label: "Create Post",
    key: "2",
  },
  {
    label: "New Playlist",
    key: "3",
  },
  {
    label: "New Podcast",
    key: "4",
  },
];

const profile_management = ["profile-management", "profile-edit"];
const analytic = ["analytics", "overview-detail"];
const comment = ["comments"];
const earn = ["earnings"];
const billing = ["billings"];
const support = ["support"];
const content = [
  "content-management",
  "content-upload",
  "review-cover",
  "review-content",
  "edit-content",
  "episodes",
  "schedule-event",
  "schedule-content",
  "create-series",
  "edit-series",
  "edit-episode",
  "details",
];

export const checkCurrentRoute = (location) => {
  const arr = location?.pathname.split("/");
  const route = arr.pop();
  if (profile_management.includes(route)) return "Profile Management";
  if (analytic.includes(route)) return "Analytics";
  if (comment.includes(route)) return "Comments";
  if (earn.includes(route)) return "Earnings";
  if (billing.includes(route)) return "Billings";
  if (support.includes(route)) return "Support";
  if (content.includes(route)) return "Content Management";
  return "Dashboard";
};

export const commentOptionsItems = [
  {
    label: (
      <div>
        <CloseCircleOutlined style={{ color: theme.greyText }} />
        &nbsp; Remove
      </div>
    ),
    key: "0",
  },
  {
    label: (
      <div className="vertical-center">
        <FileIcon />
        &nbsp; Report
      </div>
    ),
    key: "1",
  },
  {
    label: (
      <div>
        <StopOutlined style={{ color: theme.greyText, rotate: "90deg" }} />
        &nbsp; Block
      </div>
    ),
    key: "2",
  },
];

export const reportOptions = [
  {
    name: "Unwanted commercial content or spam",
    value: 1,
  },
  {
    name: "Pornography or sexually explicit material",
    value: 2,
  },
  {
    name: "Child abuse",
    value: 3,
  },
  {
    name: "Hate speech or graphic violence",
    value: 4,
  },
  {
    name: "Promotes terrorism",
    value: 5,
  },
  {
    name: "Harassment or bullying",
    value: 6,
  },
  {
    name: "Suicide or self injury",
    value: 7,
  },
  {
    name: "Misinformation",
    value: 8,
  },
];

export const last_days_opt = [
  {
    value: "7",
    label: "Last 7 days",
  },
  {
    value: "30",
    label: "Last 30 days",
  },
  {
    value: "90",
    label: "Last 90 days",
  },
  {
    value: "365",
    label: "Last 365 days",
  },
  {
    value: "0",
    label: "Lifetime",
  },
];

export const earning_options = [
  {
    value: "7",
    label: "Month View",
  },
  {
    value: "30",
    label: "Week View",
  },
  {
    value: "90",
    label: "Last Year View",
  },
];

export const overviewBreadcrumbs = [
  { title: <a href="/analytics">Content Analytics</a> },
  { title: "Overview" },
];

export const analyticBreadcrumbs = [
  { title: <a href="/analytics">Content Analytics</a> },
  { title: "Reach" },
];

export const engagementBreadcrumbs = [
  { title: <a href="/analytics">Content Analytics</a> },
  { title: "Engagements" },
];

export const audienceBreadcrumbs = [
  { title: <a href="/analytics">Content Analytics</a> },
  { title: "Audience" },
];

export const genderOptions = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Non-Binary",
    label: "Non-Binary",
  },
  {
    value: "Transgender",
    label: "Transgender",
  },
  {
    value: "Prefer not to say",
    label: "Prefer not to say",
  },
];

export const genreOptions = [
  {
    value: "Black Stories",
    label: "Black Stories",
  },
  {
    value: "Business",
    label: "Business",
  },
  {
    value: "Children",
    label: "Children",
  },
  {
    value: "Comedy",
    label: "Comedy",
  },
  {
    value: "Action",
    label: "Action",
  },
  {
    value: "Adventure",
    label: "Adventure",
  },
  {
    value: "Anime",
    label: "Anime",
  },
  {
    value: "Art",
    label: "Art",
  },
  {
    value: "Beauty",
    label: "Beauty",
  },

  {
    value: "Crime & Mystery",
    label: "Crime & Mystery",
  },
  {
    value: "Drama",
    label: "Drama",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Faith",
    label: "Faith",
  },
  {
    value: "Fantasy",
    label: "Fantasy",
  },
  {
    value: "Fiction",
    label: "Fiction",
  },
  {
    value: "Financial",
    label: "Financial",
  },
  {
    value: "Gaming",
    label: "Gaming",
  },
  {
    value: "Health",
    label: "Health",
  },
  {
    value: "Horror",
    label: "Horror",
  },
  {
    value: "Motivational",
    label: "Motivational",
  },
  {
    value: "Music",
    label: "Music",
  },
  {
    value: "News",
    label: "News",
  },
  {
    value: "Reality",
    label: "Reality",
  },
  {
    value: "Romance",
    label: "Romance",
  },
  {
    value: "Science fiction",
    label: "Science fiction",
  },
  {
    value: "Sports",
    label: "Sports",
  },
  {
    value: "Travel",
    label: "Travel",
  },
  {
    value: "Other",
    label: "Other",
  },
];
export const typeOptions = [
  {
    value: "audio",
    label: "Audio",
  },
  {
    value: "video",
    label: "Video",
  },
];
export const contentTypeOptions = [
  {
    value: "Video PodShow",
    label: "Video Podshow",
  },
  {
    value: "Audio Podshow",
    label: "Audio Podshow",
  },
  {
    value: "Short Film",
    label: "Short Film",
  },
  {
    value: "Television Show",
    label: "Television Show",
  },
  {
    value: "Movie",
    label: "Movie",
  },
  {
    value: "Documentary",
    label: "Documentary",
  },
  // {
  //   value: "Klipz",
  //   label: "Klipz",
  // },
];

export const formatOptions = [
  {
    label: "Video",
    value: "video",
  },
  {
    label: "Audio",
    value: "audio",
  },
];

export const joinList = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Private",
    value: "private",
  },
];

export const audienceOptions = [
  {
    label: "Yes, its’s made for kids.",
    value: true,
  },
  {
    label: "No, it’s not made for kids.",
    value: false,
  },
];

export const visibilityOptions = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Private",
    value: "private",
  },
];

export const liveOptions = [
  {
    label: "Live Podshow",
    value: "Live Podshow",
  },
  {
    label: "Live Sports",
    value: "Live Sports",
  },
  {
    label: "Live Faith",
    value: "Live Faith",
  },
  {
    label: "Live News",
    value: "Live News",
  },
];

export const goLiveOptions = [
  {
    label: "Streaming software",
    value: "streaming",
  },
  // {
  //   label: "Webcam",
  //   value: "webcam",
  // },
  // {
  //   label: "Mobile",
  //   value: "mobile",
  // },
];

export const eventliveType = [
  {
    label: "Live Concert",
    value: "Live Concert",
  },
  {
    label: "Live Entertainment",
    value: "Live Entertainment",
  },
];

export const pickerDateFormat = "MMM DD,YYYY";

const dateFormat = "DD/MM/yyyy";

// used to get dates array according date count like:--7 or 30 or 90 or365
export const getDateRange = (maxCount = 7) => {
  let count = maxCount;
  const dateRanges = [];
  while (count) {
    const date = moment()
      .subtract(maxCount - count, "day")
      .format(dateFormat);
    dateRanges.push(date);
    count = count - 1;
  }
  return dateRanges;
};

export const filterGraphList = (
  name,
  unit,
  range,
  actualData = [],
  changeToHr = false
) => {
  let filterData = [];
  for (let i = 0; i < range?.length; i++) {
    let update = 0;
    for (let j = 0; j < actualData?.length; j++) {
      if (actualData[j]?.date === range[i]) {
        filterData.push({
          name,
          unit,
          xLabel: moment(actualData[j]?.date, "DD/MM/yyyy").format(
            "MMM DD,yyyy"
          ),
          [name]: changeToHr
            ? secToHour(actualData[j][name])
            : actualData[j][name],
          date: actualData[j]?.["date"],
          // ...actualData[j],
        });
        update = update + 1;
      }
    }
    if (update === 0)
      filterData.push({
        name,
        unit,
        xLabel: moment(range[i], "DD/MM/yyyy").format("MMM DD,yyyy"),
        [name]: 0,
      });
  }
  return filterData;
};

export const filter_CombineGraphList = (
  names,
  unit,
  range,
  actualData,
  changeToHr = false
) => {
  const name = "count";
  let filterData = [];
  for (let i = 0; i < range?.length; i++) {
    const maxRange =
      actualData[names[0]]?.length > actualData[names[1]]?.length
        ? actualData[names[0]]?.length
        : actualData[names[1]]?.length;
    const data1 = actualData[names[0]];
    const data2 = actualData[names[1]];
    let obj = {};
    obj["name"] = names;
    obj["unit"] = unit;
    obj["xLabel"] = moment(range[i], "DD/MM/yyyy").format("MMM DD,yyyy");
    obj[[names[0]]] = 0;
    obj[[names[1]]] = 0;
    obj["date"] = range[i];
    for (let j = 0; j < maxRange; j++) {
      if (data1?.[j]?.date === range[i]) {
        obj[[names[0]]] = changeToHr
          ? secToHour(data1[j]?.[name])
          : data1[j]?.[name] ?? 0;
      }
      if (data2?.[j]?.date === range[i]) {
        obj[[names[1]]] = changeToHr
          ? secToHour(data2[j]?.[name])
          : data2[j]?.[name] ?? 0;
      }
    }
    filterData.push({ ...obj });
  }
  return filterData;
};

export const diffStartToEnd = (start) => {
  let previous = start ? moment(start) : moment().subtract(6, "day");
  let current = moment();
  const diff = current.diff(previous, "days");
  const actualList = getDateRange(diff + 1); // add 1 here because this miss one loop and not include last date
  return actualList;
};

//used for get rangePicker default date range therfore used "dayjs" instead of moment
export const getStartEndDate = (diff) => {
  const previous = Math.abs(diff);
  const startDate = dayjs().subtract(previous, "day");
  const endDate = dayjs();
  return { startDate, endDate };
};

export const secToHour = (sec = 0, upto = 2) => {
  const hour = sec ? isInteger(sec / 3600, upto) : sec;
  return hour;
};

const FilterHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${theme.greyBorder};
  align-items: center;
  padding: 0 5px;
  width: 120px;
`;

export const dashboardFiltersOptions = [
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
        key: "1",
        label: "Day",
      },
      {
        key: "7",
        label: "Week",
      },
      {
        key: "30",
        label: "Month",
      },
      {
        key: "365",
        label: "Year",
      },
    ],
  },
];

export const isInteger = (number = 0, upto = 2) => {
  const intNumber = Number.isInteger(number);
  if (!intNumber) return number?.toFixed(upto);
  return number;
};

export const joinArrayString = (array, key, symbol) => {
  const listing = array?.map((list) => list?.[key]);
  const result = listing?.length ? listing?.join(symbol) : "---";
  return result;
};

export function secondsToHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

export function secToHourMinuteSec(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const second = Math.floor((seconds % 3600) % 60);
  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${second < 10 ? "0" : ""}${second}`;
}

export const handleUploadFile = async (formData, setUploadProgress) => {
  // if (!selectedFile) {
  //   alert("Please select a file");
  //   return;
  // }
  const token = `Bearer ${store?.getState()?.signIn?.data?.token}`;

  try {
    const response = await axios.post(
      "http://ec2-3-219-174-154.compute-1.amazonaws.com:5000/" +
        route.upload_content_file, //  "http://192.168.1.108:5000/" +
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
          "Access-Control-Allow-Origin": "*",
        },

        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          console.log("test", progress, progressEvent);
          if (setUploadProgress) setUploadProgress(progress);
        },
      }
    );
    console.log("File uploaded successfully:", response.data);
    return response?.data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const weekYearGraphData = (type, today, data) => {
  const next = [];
  const previous = [];
  type?.forEach((name, index) => {
    let time = 0;
    data?.forEach((doc) => {
      const minutes = doc?.time ? Math.floor(doc?.time / 60) : 0;
      if (doc?.day - 1 === index) time = minutes;
    });
    const object = { name, view: time, unit: "min" };
    if (today < index + 1) next.push(object);
    else previous.push(object);
  });
  return [...next, ...previous];
};

export const weeksName = [
  "Sun", // 1
  "Mon", // 2
  "Tue", // 3
  "Wed", // 4
  "Thu", // 5
  "Fri", // 6
  "Sat", // 7
];

// use this constent to upload file into s3Bucket
export const constant = {
  COVER_TYPE: 1,
  AUDIO_TYPE: 2,
  VIDEO_TYPE: 3,
  PROFILE_TYPE: 4,
  PROFILE_FOLDER: "profile",
  COVER_FOLDER: "cover",
  AUDIO_FOLDER: "audio",
  VIDEO_FOLDER: "video",
  THUMBNAIL_FOLDER: "thumbnail",
};

export const folderName = {
  1: "cover",
  2: "audio",
  3: "video",
  4: "profile",
};
