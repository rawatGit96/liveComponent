import {
  audienceOptions,
  // liveOptions,
  contentTypeOptions,
  formatOptions,
  genreOptions,
  visibilityOptions,
} from "Utils/constants";

export const fieldList = [
  {
    placeholder: "Cover Art",
    name: "cover_art",
    xs: 24,
    md: 24,
    xl: 24,
    aspectRatio: 4 / 4,
    component: "upload-cover",
    rule: [
      {
        required: true,
      },
    ],
  },
  {
    placeholder: "Series Title",
    name: "title",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
    rule: [
      {
        required: true,
      },
    ],
  },
  {
    placeholder: "Genre",
    name: "genre",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: genreOptions,
    rule: [
      {
        required: true,
      },
    ],
  },
  {
    placeholder: "Content Type",
    name: "content_type",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: contentTypeOptions,
    rule: [
      {
        required: true,
      },
    ],
  },
  {
    placeholder: "Format",
    name: "format",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: formatOptions,
    rule: [
      {
        required: true,
      },
    ],
  },
  {
    placeholder: "Audience",
    name: "audience",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: audienceOptions,
    rule: [
      {
        required: true,
      },
    ],
  },
  {
    placeholder: "Visibilty",
    name: "visibility",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: visibilityOptions,
    rule: [
      {
        required: true,
      },
    ],
  },
  {
    placeholder: "Upload Trailer",
    name: "upload_trailer",
    xs: 24,
    md: 24,
    xl: 24,
    component: "upload-content",
    size: "small",
    disabled: true,
  },
  {
    type: "textarea",
    placeholder: "Write description here...",
    name: "description",
    xs: 24,
    md: 24,
    xl: 24,
    component: "textarea",
    maxLength: 600,
    className: "description-textarea",
    rule: [
      {
        required: true,
      },
    ],
  },
];

export const fieldListMangSeries = [
  {
    placeholder: "Cover Art",
    name: "thumbnail",
    xs: 24,
    md: 24,
    xl: 24,
    aspectRatio: 4 / 4,
    component: "upload-cover",
    rule: [
      {
        required: true,
        message: "Thumbnail is required",
      },
    ],
  },
  {
    placeholder: "Series Title",
    name: "title",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
    rule: [
      {
        required: true,
        message: "Series Title is required",
      },
    ],
  },
  {
    placeholder: "Genre",
    name: "genre",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: genreOptions,
    rule: [
      {
        required: true,
        message: "Genre is required",
      },
    ],
  },
  // {
  //   placeholder: "Cast",
  //   name: "add_cast",
  //   xs: 24,
  //   md: 12,
  //   component: "select",
  // },
  {
    placeholder: "Content Type",
    name: "content_type",
    options: contentTypeOptions,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Content Type is required",
      },
    ],
  },
  {
    placeholder: "Audience",
    name: "audience",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: audienceOptions,
    rule: [
      {
        required: true,
        message: "Audience is required",
      },
    ],
  },
  {
    placeholder: "Upload Trailer",
    name: "trailer",
    xs: 24,
    md: 24,
    xl: 24,
    component: "upload-content",
    size: "small",
    disabled: true,
  },
  {
    type: "textarea",
    placeholder: "Write description here...",
    name: "description",
    xs: 24,
    md: 24,
    xl: 24,
    component: "textarea",
    maxLength: 600,
    className: "description-textarea",
    rule: [
      {
        required: true,
        message: "Description is required",
      },
    ],
  },
];

export const episodeFields = [
  {
    placeholder: "Cover Art",
    name: "thumbnail",
    xs: 24,
    md: 24,
    xl: 24,
    aspectRatio: 4 / 4,
    component: "upload-cover",
    rule: [
      {
        required: true,
        message: "Thumbnail is required",
      },
    ],
  },
  {
    placeholder: "Episode Title",
    name: "title",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
    rule: [
      {
        required: true,
        message: "Episode Title is required",
      },
    ],
  },
  {
    placeholder: "Cast",
    name: "cast",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
  },
  {
    type: "textarea",
    placeholder: "Write description here...",
    name: "description",
    xs: 24,
    md: 24,
    xl: 24,
    component: "textarea",
    maxLength: 600,
    className: "description-textarea",
    rule: [
      {
        required: true,
        message: "Description is required",
      },
    ],
  },
];
