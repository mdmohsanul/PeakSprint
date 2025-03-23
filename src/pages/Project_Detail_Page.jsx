import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(fetchTaskByProject(projectId));
    dispatch(fetchProjects());
  }, [dispatch, projectId]);

  if (status === "loading")
    return (
      <div className="page-container">
        <Dashboard_Shimmer />
      </div>
    );
  if (error) return <div className="page-container">Error: {error}</div>;
  return (
    <>
      {status === "success" && (
        <div className="page-container">
          {/* Project Details */}
          <h1 className="text-2xl font-medium text-gray-800">
            {findProject?.name}
          </h1>
          <p className="py-5 text-gray-600">{findProject?.description}</p>

          {/* Task Filters */}
          <div className="mb-4 flex items-center justify-between">
            <Project_Details_Filters />
            <Add_Task_Btn projectId={projectId} />
          </div>
          {/* Task Lists */}
          <Task_List />
        </div>
      )}
    </>
  );
};

export default Project_Detail_Page;
