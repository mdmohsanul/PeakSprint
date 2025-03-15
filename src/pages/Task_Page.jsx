import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task_Page_List from "../components/Task/Task_Page_List";
import { fetchTask } from "../features/taskSlice";

const Task_Page = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);
  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto md:p-8 p-4 md:mt-16 mt-28 bg-white">
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
