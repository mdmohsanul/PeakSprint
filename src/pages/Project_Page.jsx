import React, { useEffect, useState } from "react";
import Project_List from "../components/Project/Project_List";
import { useDispatch, useSelector } from "react-redux";
import Add_Project_Btn from "../components/Project/Add_Project_Btn";
import { fetchProjects } from "../features/projectSlice";
import Dashboard_Shimmer from "../Shimmer_UI/Dashboard_Shimmer";
import Dropdown_Select from "../Filter_Component/Dropdown_Select";
import { statusOptions } from "../data/dashboard";

const Project_Page = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  const [projectStatus, setProjectStatus] = useState("");
  const projectList = projectStatus
    ? projects?.filter((project) => project.status === projectStatus)
    : projects;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  if (status === "loading")
    return (
      <div className="page-container">
        <Dashboard_Shimmer />
      </div>
    );
  if (status === "failed")
    return <p className="page-container">Error: {error}</p>;
  return (
    <>
      {status === "success" && (
        <div className="page-container">
          <div className={`grid grid-cols-3 md:grid-cols-12 grid-rows-1`}>
            <span className="flex flex-col md:flex-row justify-between md:col-span-4 col-span-1">
              <h1 className="text-3xl text-gray-800 font-semibold inline-block md:pr-10 pb-5 md:pb-0 ">
                Projects
              </h1>
              <Dropdown_Select
                options={statusOptions}
                name="projectFilter"
                value={projectStatus}
                setValue={setProjectStatus}
              />
            </span>
            <span className="md:col-span-6 col-span-1"></span>
            <div className="md:col-span-2 col-span-1">
              <Add_Project_Btn />
            </div>
          </div>

          <Project_List projectList={projectList} />
        </div>
      )}
    </>
  );
};

export default Project_Page;
