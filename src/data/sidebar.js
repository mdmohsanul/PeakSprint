import { RxDashboard } from "react-icons/rx";
import { GoProjectSymlink } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsBarChart } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

export const sidebarList = [
  {
    id: 1,
    name: "Dashboard",
    linkIcon: RxDashboard,
    linkTo: "/",
  },
  {
    id: 2,
    name: "Project",
    linkIcon: GoProjectSymlink,
    linkTo: "",
  },
  {
    id: 3,
    name: "Team",
    linkIcon: HiOutlineUserGroup,
    linkTo: "/team",
  },
  {
    id: 4,
    name: "Report",
    linkIcon: BsBarChart,
    linkTo: "/dashboard/report",
  },
  {
    id: 5,
    name: "Settings",
    linkIcon: IoSettingsOutline,
    linkTo: "/settings",
  },
  {
    id: 6,
    name: "Sign Up",
    linkIcon: IoSettingsOutline,
    linkTo: "/signup",
  },
  {
    id: 7,
    name: "Log In",
    linkIcon: IoSettingsOutline,
    linkTo: "/login",
  },
];
