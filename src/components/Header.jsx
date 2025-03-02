import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router";
import { logout } from "../utils/auth";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(user);
  const handleInputChange = (value) => {
    setSearchTerm(value);
  };
  return (
    <>
      <div className="w-full md:ml-64 fixed top-14 md:top-0 h-14   bg-white   shadow-[1px_1px_20px_10px_#00000024]">
        <div className="max-w-4xl md:pl-12 pl-5">
          <div className="flex items-center justify-between py-1">
            {/* Search bar */}
            <div className=" relative md:w-56 w-44">
              <div className="absolute end-0 inset-y-0 flex items-center ps-3 pointer-events-none">
                <CiSearch className="text-slate-500 font-semibold" size={20} />
              </div>
              <input
                type="text"
                name=""
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={`Search`}
                className="py-2 md:pr-5 w-full hover:outline-none outline-none  border-b border-slate-600"
              />
            </div>
            {/* User Profile */}
            <div className="pt-2 relative group flex items-center justify-center gap-4 cursor-pointer mx-7 md:mx-0">
              <p className="text-gray-800 hidden md:block group-hover:text-gray-600 transition-colors duration-300">
                {user?.name}
              </p>
              <div className=" ">
                <button className="text-xl bg-emerald-700 group text-emerald-200 p-2 rounded-full group-hover:text-emerald-700 group-hover:bg-emerald-200 transition-colors duration-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] cursor-pointer">
                  <FaUser />
                </button>
                <div className="absolute right-0 top-full z-50 mt-2 w-48 bg-white border border-gray-300 group-hover:block shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <div className="block px-4 py-2 hover:bg-gray-200">
                    {/* remove token and navigate to login page */}
                    <button onClick={logout}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Header;
