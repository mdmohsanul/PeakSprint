import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task_Page_List from "../components/Task/Task_Page_List";
import { fetchTask } from "../features/taskSlice";
import Dashboard_Shimmer from "../Shimmer_UI/Dashboard_Shimmer";

const Task_Page = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchTask());
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
      <div className="page-container">
        <h1 className="text-3xl font-medium">Tasks</h1>
        {/* Filters for tasks */}

        {/* Display All tasks */}
        <div className="grid gap-3 my-5">
          {tasks?.map((item) => (
            <Task_Page_List task={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Task_Page;
