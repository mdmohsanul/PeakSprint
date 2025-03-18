import React from "react";
import { format, parseISO } from "date-fns";
import useOwners from "../../hooks/useOwners";
import { Link } from "react-router";

// This Task_Card component is displayed on dasboard page

const Task_Card = ({ data, idx }) => {
  function convertDate(dueDate) {
    const isoDate = dueDate;
    const date = parseISO(isoDate);

    return format(date, "do MMMM , yyyy");
  }

  const { getOwner } = useOwners();

  const classes = {
    "To Do": "bg-red-200 text-red-800",
    "In Progress": "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-100 text-green-700",
    Blocked: "bg-blue-100 text-blue-700",
  };

  return (
    <>
      {/* Task Card */}

      <Link to={`/dashboard/tasks/${data._id}`}>
        {" "}
        <div className="w-72 rounded-lg bg-gray-100 h-48  pt-5 px-6 cursor-pointer">
          <div className="flex flex-col  h-full gap-3">
            <p>
              <span
                className={`text-xs ${
                  classes[data?.status]
                } px-2 p-1 rounded-md w-24 font-medium`}
              >
                {data?.status}
              </span>
            </p>

            <h1 className="text-xl font-semibold truncate text-gray-800">
              {data?.name}
            </h1>
            <p className="text-gray-500  text-sm">
              Due on: {convertDate(data?.dueDate)}
            </p>
            <div className="flex pl-3">{getOwner(data?.owners)}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Task_Card;
