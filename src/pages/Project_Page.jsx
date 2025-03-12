import React, { useEffect } from "react";
import Project_List from "../components/Project/Project_List";
import { useDispatch, useSelector } from "react-redux";
import Add_Project_Btn from "../components/Project/Add_Project_Btn";
import { fetchProjects } from "../features/projectSlice";

const Project_Page = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  if (status === "loading") return <p>Loading......</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto md:p-8 p-4 md:mt-16 mt-28 bg-white">
        <Add_Project_Btn />
        <Project_List projectList={projects} />
      </div>
    </>
  );
};

export default Project_Page;
