import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { statusOptions } from "../../data/dashboard";
import Add_Project_Form from "./Add_Project_Form";

const Project_Section = () => {
  const { projects, status, error } = useSelector((state) => state.projects);
  const [openModal, setOpenModal] = useState(false);

  const showProject = projects.slice(0, 3);

  const projectStatus = (status) => {
    const classes = {
      "Not Started": "bg-red-200 text-red-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-700",
      "On Hold": "bg-blue-100 text-blue-700",
    };
    return (
      <span className={`text-xs ${classes[status]} p-1 rounded-md`}>
        {status}
      </span>
    );
  };
  if (status === "loading") return <p>Loading......</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <>
      <div className={``}>
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
          <button
            className="text-white md:col-span-2 col-span-1 w-full h-9 bg-blue-600 py-2 md:px-4 px-1 rounded-md cursor-pointer text-sm "
            onClick={() => setOpenModal(!openModal)}
          >
            + Add Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-5  place-self-center">
          {showProject?.map((item) => (
            <div
              key={item._id}
              className="w-72 rounded-lg bg-gray-100 h-54  pt-8 px-6 "
            >
              <div className="flex flex-col  h-full gap-3">
                <p>{projectStatus(item.status)}</p>
                <h1 className="text-xl font-medium truncate">{item.name}</h1>
                <p className="text-gray-500 h-20">{item.description}.</p>
              </div>
            </div>
          ))}{" "}
        </div>

        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-black/50">
            <Add_Project_Form setOpenModal={setOpenModal} />
          </div>
        )}
      </div>
    </>
  );
};

export default Project_Section;
