import {
  liveOptions,
  genreOptions,
  joinList,
  audienceOptions,
} from "Utils/constants";

export const contentList = [
  {
    placeholder: "Cover Art",
    name: "cover_art",
    xs: 24,
    md: 24,
    component: "coverArt",
    aspectRatio: 4 / 4,
    rule: [
      {
        required: true,
        message: "Cover art is required",
      },
    ],
  },
  // {
  //   placeholder: "Thumbnail",
  //   name: "thumbnail",
  //   xs: 24,
  //   md: 12,
  //   component: "thumbnail",
  //   rule: [
  //     {
  //       required: true,
  //       message: "Thumbnail is required",
  //     },
  //   ],
  // },
  // {
  //   placeholder: "Video Live",
  //   name: "live_video",
  //   options: [],
  //   xs: 24,
  //   md: 12,
  //   component: "select",
  //   rule: [
  //     {
  //       required: true,
  //       message: "Field is required",
  //     },
  //   ],
  // },
  {
    placeholder: "Title of Content",
    name: "title",
    xs: 24,
    md: 12,
    component: "input",
    rule: [
      {
        required: true,
        message: "Title is required",
      },
    ],
  },
  {
    placeholder: "Genre ",
    name: "genre",
    options: genreOptions,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Genre is required",
      },
    ],
  },
  {
    placeholder: "Who can join ",
    name: "join",
    options: joinList,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Field is required",
      },
    ],
  },
  {
    placeholder: "Cast",
    name: "cast",
    // options: [],
    xs: 24,
    md: 12,
    component: "select",
  },
  // {
  //   placeholder: "How do you want to go live?",
  //   name: "go_live",
  //   options: goLiveOptions,
  //   xs: 24,
  //   md: 12,
  //   component: "select",
  // },
  {
    placeholder: "Live Type",
    name: "content_type",
    options: liveOptions,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Type is required",
      },
    ],
  },
  {
    placeholder: "Audience",
    name: "audience",
    options: audienceOptions,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Audience is required",
      },
    ],
  },
  {
    placeholder: "Date",
    name: "event_date",
    xs: 24,
    md: 12,
    component: "date-picker",
    rule: [
      {
        required: true,
        message: "Date is required",
      },
    ],
  },
  {
    placeholder: "Time",
    name: "event_time",
    xs: 24,
    md: 12,
    component: "time-picker",
    rule: [
      {
        required: true,
        message: "Time is required",
      },
    ],
  },
  {
    placeholder: "Upload Trailer",
    name: "upload_content",
    xs: 24,
    md: 24,
    xl: 24,
    component: "upload-content",
    size: "small",
    // rule: [
    //   {
    //     required: true,
    //     message: "Content is required",
    //   },
    // ],
  },
  {
    placeholder: "Content description...",
    type: "textarea",
    name: "description",
    xs: 24,
    md: 24,
    component: "textarea",
    rule: [
      {
        required: true,
        message: "Description is required",
      },
    ],
  },
];
