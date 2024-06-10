import {
  goLiveOptions,
  genreOptions,
  audienceOptions,
  eventliveType,
} from "Utils/constants";

export const eventList = [
  {
    placeholder: "Banner Image",
    name: "cover_art",
    xs: 24,
    md: 16,
    component: "coverArt",
    // aspectRatio: 4 / 4,
    rule: [
      {
        required: true,
        message: "Banner image is required",
      },
    ],
  },
  {
    placeholder: "Event Icon",
    name: "event_icon",
    xs: 24,
    md: 8,
    component: "coverArt",
    aspectRatio: 4 / 4,
    rule: [
      {
        required: true,
        message: "Event icon is required",
      },
    ],
  },
  {
    placeholder: "Title of Event",
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
    placeholder: "Cast",
    name: "cast",
    xs: 24,
    md: 12,
    multiple: true,
    component: "select",
  },
  {
    placeholder: "Genre",
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
  // {
  //   placeholder: "Content type",
  //   name: "contentType",
  //   options: contentTypeOptions,
  //   xs: 24,
  //   md: 12,
  //   component: "select",
  //   rule: [
  //     {
  //       required: true,
  //       message: "Content type is required",
  //     },
  //   ],
  // },
  {
    placeholder: "Live Type",
    name: "content_type",
    options: eventliveType,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Content type is required",
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
    placeholder: "Ticket Amount",
    name: "ticket_amount",
    xs: 24,
    md: 12,
    component: "input",
    rule: [
      {
        required: true,
        message: "Ticket amount is required",
      },
    ],
  },
  {
    placeholder: "How do you want to go live?",
    name: "go_live",
    options: goLiveOptions,
    xs: 24,
    md: 12,
    component: "select",
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
    placeholder: "Venue",
    name: "venue",
    xs: 24,
    md: 12,
    component: "input",
    rule: [
      {
        required: true,
        message: "Venue is required",
      },
    ],
  },
  // {
  //   placeholder: "Video URL",
  //   name: "rss_url",
  //   xs: 24,
  //   md: 24,
  //   component: "input",
  // },
  {
    placeholder: "Upload Trailer",
    name: "upload_trailer",
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
    placeholder: "Event description...",
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
