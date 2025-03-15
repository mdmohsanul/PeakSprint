import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Add_Task_Btn from "../components/Task/Add_Task_Btn";
import Task_List from "../components/Task/Task_List";
import { statusOptions } from "../data/dashboard";
import { fetchProjects } from "../features/projectSlice";
import { fetchTaskByProject } from "../features/taskSlice";

const Project_Detail_Page = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { projectTask, status, error } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);
  const findProject = projects?.find((project) => project?._id === projectId);
  const sortClasses =
    "py-1 px-3 rounded-3xl border border-gray-500 text-gray-700 hover:bg-gray-200 text-sm cursor-pointer ml-4";
  useEffect(() => {
    dispatch(fetchTaskByProject(projectId));
    dispatch(fetchProjects());
  }, [dispatch]);

  if (status === "loading") return <p className="ml:64 mt:24">Loading......</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto md:p-8 p-4 md:mt-16 mt-28 bg-white">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">
            {findProject?.name}
          </h1>
          <p className="py-5 text-gray-600">{findProject?.description}</p>
        </div>
        <div className="h-16 flex items-center justify-between">
          <div>
            Sort By:
            <button className={`${sortClasses}`}>Priority Low-High</button>
            <button className={`${sortClasses}`}>Priority High-Low</button>
            <button className={`${sortClasses}`}>Newest First</button>
            <button className={`${sortClasses}`}>Oldest First</button>
          </div>
          <div className="flex items-center gap-3">
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
            <Add_Task_Btn projectId={projectId} />
          </div>
        </div>
        <div>
          <Task_List tasks={projectTask} />
        </div>
      </div>
    </>
  );
};

export default Project_Detail_Page;
