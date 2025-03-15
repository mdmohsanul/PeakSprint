import React from "react";
import useOwners from "../../hooks/useOwners";
import { CiFlag1 } from "react-icons/ci";
import useDate from "../../hooks/useDate";
import { Link } from "react-router";

const Task_Page_List = ({ task }) => {
  const { getOwner } = useOwners();
  const extractedDate = useDate();
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
  return (
    <>
      <Link to={`/dashboard/tasks/${task._id}`}>
        {" "}
        <div
          key={task._id}
          className="border border-gray-300 grid grid-cols-5 p-3 gap-4 place-content-center items-center"
        >
          <div className="truncate flex flex-col gap-2">
            <h3 className="text-lg text-gray-800 font-medium">{task.name}</h3>
            <span
              className={`${
                prClasses[task.priority]
              } px-2 text-xs font-medium py-1 rounded-md flex items-center gap-1 w-20 `}
            >
              <CiFlag1 className="text-gray-900" /> {task.priority}
            </span>
          </div>
          <div className="flex pl-4">{getOwner(task.owners)}</div>
          <div className=" col-span-2 text-gray-600 flex flex-col gap-2">
            <p>
              <span className="text-gray-900"> Project: </span>
              {task?.project?.name}
            </p>

            <p>
              <span className="text-gray-900">Team: </span>
              {task.team.name}
            </p>
          </div>
          <div>
            <p>{extractedDate(task?.dueDate)}</p>
            <span
              className={`${
                stClasses[task?.status]
              } text-xs font-medium px-2 py-0.5`}
            >
              {task.status}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Task_Page_List;
