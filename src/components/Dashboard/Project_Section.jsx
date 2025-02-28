import React from "react";
import { useSelector } from "react-redux";

const Project_Section = () => {
  const { projects, status, error } = useSelector((state) => state.projects);
  console.log(projects);
  return (
    <>
      <div className="flex items-center justify-between">
        <span>
          <h1 className="text-2xl text-gray-900 font-semibold inline pr-10">
            Projects
          </h1>
          <label htmlFor="projectFilter">
            <select
              name="projectFilter"
              id="projectFilter"
              className="border-gray-300 border rounded-md text-gray-600 text-sm px-3 py-1 focus:outline-blue-300"
            >
              <option value="">Filter</option>
              <option value="Completed">Completed</option>
              <option value="Not Started">Not Started</option>
            </select>
          </label>
        </span>
        <button className="text-white bg-blue-600 py-2 px-4 rounded-md">
          + Add Project
        </button>
      </div>
    </>
  );
};

export default Project_Section;
