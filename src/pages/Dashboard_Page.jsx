import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "../features/projectSlice";
import Project_Section from "../components/Dashboard/Project_Section";

const Dashboard_Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto p-8">
        <Project_Section />
        <h1>dlcmdlcmdlcmd</h1>
      </div>
    </>
  );
};

export default Dashboard_Page;
