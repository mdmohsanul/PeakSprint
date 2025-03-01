import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard_Layout = () => {
  return (
    <div className="flex relative">
      <Sidebar /> {/* Sidebar always visible */}
      <div className="flex-1">
        <Header /> {/* Header always visible */}
        <Outlet /> {/* Child routes (Dashboard, Team, etc.) will render here */}
      </div>
    </div>
  );
};

export default Dashboard_Layout;
