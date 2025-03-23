import React, { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { statusOptions } from "../../data/dashboard";
import { fetchTask } from "../../features/taskSlice";
import Add_Task_Btn from "../Task/Add_Task_Btn";
import Task_Card from "../Task/Task_Card";
import Dropdown_Select from "../Filter_Component/Dropdown_Select";
import Dashboard_Shimmer from "../../Shimmer_UI/Dashboard_Shimmer";

const Task_Section = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const showTasks = tasks.slice(0, 3);
  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);
  console.log(tasks);
  if (status === "loading") return <Dashboard_Shimmer />;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <>
      {status === "success" && (
        <div>
          <div className={`grid grid-cols-3 md:grid-cols-12 grid-rows-1`}>
            <span className="flex flex-col md:flex-row justify-between md:col-span-4 col-span-1">
              <h1 className="text-3xl text-gray-800 font-semibold inline-block md:pr-10 pb-5 md:pb-0 ">
                My Tasks
              </h1>
              {/* Filter */}
              <Dropdown_Select options={statusOptions} name="projectFilter" />
            </span>
            <span className="md:col-span-6 col-span-1"></span>
            <div className="md:col-span-2 col-span-1">
              <Add_Task_Btn />
            </div>
          </div>
          {/* Task cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-5  place-self-center">
            {showTasks?.map((item) => (
              <Task_Card data={item} key={item._id} />
            ))}
          </div>
          {/* Projects page  link */}
          <div className="flex items-center justify-center">
            <Link
              to="/dashboard/tasks"
              className="px-5 py-2 bg-gray-600 text-white cursor-pointer rounded-md hover:bg-gray-700 transition-colors duration-300"
            >
              Task Lists →
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Task_Section;
