import React, { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { Link } from "react-router";
import Sidebar_List from "./Sidebar_List";

const Sidebar = () => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <div className="max-w-screen md:max-w-64 bg-gray-300 md:min-h-screen h-14 fixed top-0 left-0 w-full z-10 ">
        <div className="">
          <div className="flex items-center h-14 justify-between md:justify-center mx-4 md:mx-0 ">
            <button
              className="md:hidden cursor-pointer text-3xl"
              onClick={() => setNav(!nav)}
            >
              {nav ? <RxCross1 /> : <RxHamburgerMenu />}
            </button>

            <Link to="/dashboard">
              <h1 className="text-2xl md:text-3xl font-bold cursor-pointer">
                PeakSprint
              </h1>
            </Link>
          </div>
          {/* Desktop View */}
          <div className="hidden md:block">
            <Sidebar_List setNav={setNav} />
          </div>
          {/* Mobile View */}
          <div
            className={`fixed top-14 left-0 h-full w-72 bg-gray-900 text-white shadow-lg z-40 
        transform transition-transform duration-500 ease-in-out border-none
        ${nav ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar_List setNav={setNav} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
