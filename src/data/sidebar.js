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
    linkTo: "/dashboard",
  },
  {
    id: 2,
    name: "Projects",
    linkIcon: GoProjectSymlink,
    linkTo: "/dashboard/projects",
  },
  {
    id: 3,
    name: "Teams",
    linkIcon: HiOutlineUserGroup,
    linkTo: "/dashboard/teams",
  },
  {
    id: 4,
    name: "Reports",
    linkIcon: BsBarChart,
    linkTo: "/dashboard/report",
  },
  {
    id: 5,
    name: "Settings",
    linkIcon: IoSettingsOutline,
    linkTo: "/dashboard/settings",
  },
];
