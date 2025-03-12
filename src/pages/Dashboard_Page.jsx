import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "../features/projectSlice";
import Project_Section from "../components/Dashboard/Project_Section";
import Task_Section from "../components/Dashboard/Task_Section";
import { fetchTeams } from "../features/teamSlice";
import { fetchUsers } from "../features/userSlice";

const Dashboard_Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTeams());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto  md:p-8 p-4 md:mt-16 mt-28 bg-white">
        <Project_Section />
        <Task_Section />
      </div>
    </>
  );
};

export default Dashboard_Page;
