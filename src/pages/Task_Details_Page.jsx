import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useDate from "../hooks/useDate";
import useOwners from "../hooks/useOwners";
import { fetchTaskByTaskID } from "../features/taskSlice";

const Task_Details_Page = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { task, status, error } = useSelector((state) => state.tasks);
  //   const findTask = tasks?.find((task) => task._id === taskId);
  const extractedDate = useDate();
  const { getOwner } = useOwners();

  useEffect(() => {
    dispatch(fetchTaskByTaskID(taskId));
  }, [dispatch]);
  const prClasses = {
    High: "bg-red-200 text-red-600",
    Medium: "bg-lime-200 text-lime-600",
    Low: "bg-gray-200 text-gray-600",
  };
  const stClasses = {
    "To Do": "bg-red-200 text-red-800",
    "In Progress": "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-100 text-green-700",
    Blocked: "bg-blue-100 text-blue-700",
  };
  const getNameTag = (name) => {
    const valueArr = name.split(" ");
    const char =
      valueArr.length > 1
        ? valueArr[0].charAt(0) + valueArr[1].charAt(0)
        : valueArr[0].charAt(0);
  };
  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto md:p-8 p-4 md:mt-16 mt-28 bg-white">
        <div className="max-w-4xl mx-auto  overflow-hidden border border-gray-200 rounded-lg px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-800 pb-5">
            {task?.name}
          </h1>

          {/* Team Section */}
          <div className="flex items-start text-xl">
            <div className="w-24 font-medium text-gray-800">Team:</div>
            <div className="text-gray-700">{task?.team?.name}</div>
          </div>
          <div className="flex items-start text-xl">
            <div className="w-24 font-medium text-gray-800">Project:</div>
            <div className="text-gray-700">{task?.project?.name}</div>
          </div>

          {/* Priority Section */}
          <div className="flex items-start">
            <div className="w-1/6 font-medium text-gray-700 text-lg">
              Priority:
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                prClasses[task?.priority]
              }`}
            >
              {task?.priority}
            </span>
          </div>

          {/* Status Section */}
          <div className="flex items-start">
            <div className="w-1/6 font-medium text-gray-700 text-lg">
              Status:
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                stClasses[task?.status]
              }`}
            >
              {task?.status}
            </span>
          </div>

          {/* Tags Section */}
          <div className="flex items-start">
            <div className="w-1/3 font-medium text-gray-700">Tags:</div>
            <div className="flex flex-wrap gap-2">
              {task?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Created At Section */}
          <div className="flex items-start">
            <div className="w-1/3 font-medium text-gray-700">Created At:</div>
            <div>{task?.createdAt}</div>
          </div>

          {/* Time To Complete Section */}
          <div className="flex items-start">
            <div className="w-1/3 font-medium text-gray-700">
              Time To Complete:
            </div>
            <div>{task?.timeToComplete}</div>
          </div>

          {/* Owners Section */}
          <div className="flex items-start col-span-1 md:col-span-2">
            <div className="w-1/6 font-medium text-gray-700">Owners:</div>
            <div className="flex flex-col">
              {task?.owners?.map((item) => (
                <div key={item._id}>
                  {/* // <span>{getNameTag(item?.name)}</span> */}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-end">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit
          </button>
          <button className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Complete Task
          </button>
        </div>
      </div>
    </>
  );
};

export default Task_Details_Page;
