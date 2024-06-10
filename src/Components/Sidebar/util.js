import {
  AnalyticIcon,
  BillingIcon,
  CommentIcon,
  DashboardIcon,
  DollarIcon,
  HelpIcon,
  ProfileIcon,
} from "Utils/svgIcons";

const sidebarList = [
  {
    name: "Dashboard",
    icon: <DashboardIcon height="24px" width="22px" />,
    route: "/dashboard",
  },
  {
    name: "Profile Management",
    icon: <ProfileIcon width="22px" height="21px" />,
    route: "/profile-management",
  },
  {
    name: "Content Management",
    icon: <ProfileIcon width="22px" height="21px" />,
    route: "/content-management",
  },
  {
    name: "Analytics",
    icon: <AnalyticIcon width="27px" height="27px" />,
    route: "/analytics",
  },
  {
    name: "Comments",
    icon: <CommentIcon width="21px" height="20px" />,
    route: "/comments",
  },
  {
    name: "Earnings",
    icon: <DollarIcon />,
    route: "/earnings",
  },
  {
    name: "Billings",
    icon: <BillingIcon />,
    route: "/billings",
  },
];

export const bottomSidebarList = [
  {
    name: "Support",
    icon: <HelpIcon width="23px" height="23px" />,
    route: "/support",
  },
];
export default sidebarList;
