import { FacebookIcon, InstagramIcon, TwitterIcon } from "Utils/svgIcons";

export const fieldList = [
  {
    label: "Phone Number",
    placeholder: "Enter Phone number",
    name: "phone_number",
    xs: 24,
    md: 12,
    xl: 12,
    component: "phone_number",
  },
  {
    label: "First Name",
    placeholder: "Enter first name",
    name: "first_name",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
  },
  {
    label: "User Name",
    placeholder: "Enter user name",
    name: "user_name",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
  },
  {
    label: "Last Name",
    placeholder: "Enter last name",
    name: "last_name",
    id: "adPlateform",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
  },
  {
    label: "Email Address",
    placeholder: "Enter email",
    name: "email",
    type: "email",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
  },
  {
    label: "Bio",
    type: "textarea",
    placeholder: "Enter bio",
    name: "about_me",
    xs: 24,
    md: 12,
    xl: 12,
    component: "textarea",
  },
];

export const socialList = [
  {
    label: "Social Links",
    name: "twitter_link",
    icon: <TwitterIcon height="13" width="15px" />,
    placeholder: "X",
  },
  {
    name: "facebook_link",
    icon: <FacebookIcon height="16" width="20px" />,
    placeholder: "Facebook",
  },
  {
    name: "instagram_link",
    icon: <InstagramIcon height="16" width="18px" />,
    placeholder: "Instagram",
  },
];
