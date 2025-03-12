import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { statusOptions } from "../../data/dashboard";
import Project_List from "../Project/Project_List";
import Add_Project_Btn from "../Project/Add_Project_Btn";

const Project_Section = () => {
  const { projects, status, error } = useSelector((state) => state.projects);

  const showProject = projects.slice(0, 3);

  if (status === "loading") return <p>Loading......</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <>
      <div className="mb-10">
        <div className={`grid grid-cols-3 md:grid-cols-12 grid-rows-1`}>
          <span className="flex flex-col md:flex-row justify-between md:col-span-4 col-span-1">
            <h1 className="text-3xl text-gray-800 font-semibold inline-block md:pr-10 pb-5 md:pb-0 ">
              Projects
            </h1>
            <label htmlFor="projectFilter" className="">
              <select
                name="projectFilter"
                id="projectFilter"
                className="border-gray-300 border rounded-md text-gray-600 text-sm px-3 py-1 focus:outline-blue-300"
              >
                <option value="" className="text-sm text-gray-600 ">
                  Filter
                </option>
                {statusOptions.map(({ id, option }) => (
                  <option key={id} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </span>
          <span className="md:col-span-6 col-span-1"></span>
          <div className="md:col-span-2 col-span-1">
            <Add_Project_Btn />
          </div>
        </div>
        <Project_List projectList={showProject} />
        {/* Projects page  link */}
        <div className="flex items-center justify-center">
          <Link
            to="/dashboard/projects"
            className="px-5 py-2 bg-blue-600 text-white cursor-pointer rounded-md hover:bg-blue-800 transition-colors duration-300"
          >
            More Projects
          </Link>
        </div>
      </div>
    </>
  );
};

export default Project_Section;
