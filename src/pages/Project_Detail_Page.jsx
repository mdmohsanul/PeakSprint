import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Project_Details_Filters from "../components/Project/Project_Details_Filters";
import Add_Task_Btn from "../components/Task/Add_Task_Btn";
import Task_List from "../components/Task/Task_List";
import { statusOptions } from "../data/dashboard";
import { fetchProjects } from "../features/projectSlice";
import { fetchTaskByProject } from "../features/taskSlice";
import Dashboard_Shimmer from "../Shimmer_UI/Dashboard_Shimmer";

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

  let priorityMap = { High: 1, Medium: 2, Low: 3 };
  const filterTasks = [...projectTask].sort(
    (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
  );
  console.log(filterTasks);

  if (status === "loading")
    return (
      <p className="page-container">
        <Dashboard_Shimmer />
      </p>
    );
  if (error) return <p className="page-container">Error: {error}</p>;
  return (
    <>
      <div className="page-container">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">
            {findProject?.name}
          </h1>
          <p className="py-5 text-gray-600">{findProject?.description}</p>
        </div>
        <div className="h-16 flex items-center justify-between">
          <div>
            <Project_Details_Filters />
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
                {statusOptions.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
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
