import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

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
      <div className={`relative`}>
        <div className={` `}>
          <div className={`flex  items-center justify-between `}>
            <span>
              <h1 className="text-2xl text-gray-900 font-semibold inline md:pr-10">
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
            <button
              className="text-white flex-1/2 md:flex-none bg-blue-600 py-2 md:px-4 rounded-md cursor-pointer text-sm "
              onClick={() => setOpenModal(!openModal)}
            >
              + Add Project
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-5 place-self-center">
            {showProject?.map((item) => (
              <div
                key={item._id}
                className="w-72 rounded-lg bg-gray-100 h-64 p-6 "
              >
                <div className="flex flex-col  h-full gap-3">
                  <p>{projectStatus(item.status)}</p>
                  <h1 className="text-xl font-medium">{item.name}</h1>
                  <p className="text-gray-500">{item.description}.</p>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-black/50">
            <div className="md:w-2/6 w-5/6 h-96 bg-white p-6">
              <div className="flex items-center justify-between pb-5">
                <h1 className="text-xl font-medium">Create New Project</h1>
                <button onClick={() => setOpenModal(false)}>Close</button>
              </div>
              <form>
                <div className="pb-4">
                  <label htmlFor="name" className="block pb-2">
                    Project Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Project Name"
                    className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
                  />
                </div>

                <div className="pb-4">
                  <label htmlFor="description" className="block pb-2">
                    Project Description:
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="2"
                    placeholder="Enter Project Description"
                    className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
                  ></textarea>
                </div>
                <div className="pb-4">
                  <label htmlFor="status" className="block pb-2">
                    Project Status:
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
                  >
                    <option value="">Select Project Status</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Project_Section;
