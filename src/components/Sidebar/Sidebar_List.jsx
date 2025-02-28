import React, { useState } from "react";
import { sidebarList } from "../../data/sidebar.js";
import { Link } from "react-router";

const Sidebar_List = ({ setNav }) => {
  const [activeStatus, setActiveStatus] = useState("Dashboard");
  return (
    <>
      <div className="mx-10 flex flex-col gap-3 mt-7 cursor-pointer">
        {sidebarList.map((item) => (
          <Link to={item.linkTo} key={item.id}>
            {" "}
            <div
              onClick={() => {
                setActiveStatus(item.name);
                setNav(false);
              }}
              className={`flex items-center justify-start gap-4 py-2 text-xl   transition-colors duration-300 
            ${activeStatus === item.name && "text-blue-700"} `}
            >
              <span>{<item.linkIcon />}</span>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar_List;
