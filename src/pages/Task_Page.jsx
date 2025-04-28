import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task_Page_Filters from "../components/Task/Task_Page_Filters";
import Task_Page_Lists from "../components/Task/Task_Page_Lists";
import { fetchTask } from "../features/taskSlice";
import Dashboard_Shimmer from "../Shimmer_UI/Dashboard_Shimmer";

const Task_Page = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.tasks);

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
    return <div className="page-container">Error: {error}</div>;
  return (
    <>
      <div className="page-container">
        <h1 className="text-3xl font-medium">Tasks</h1>
        {/* Filters for tasks */}
        <Task_Page_Filters />
        {/* Display All tasks */}
        <div className="grid gap-3 my-5">
          <Task_Page_Lists />
        </div>
      </div>
    </>
  );
};

export default Task_Page;
