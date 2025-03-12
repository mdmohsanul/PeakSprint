import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard_Layout = () => {
  return (
    <div className=" relative">
      <Sidebar /> {/* Sidebar always visible */}
      <div className="relative">
        {/* Header always visible */}
        <Header />
        {/* Child routes (Dashboard, Team, etc.) will render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard_Layout;
