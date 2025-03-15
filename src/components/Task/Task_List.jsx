import React from "react";
import useDate from "../../hooks/useDate";
import useOwners from "../../hooks/useOwners";
import { CiFlag1 } from "react-icons/ci";

const Task_List = ({ tasks }) => {
  // custom hook to extract username
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
    "On Hold": "bg-blue-100 text-blue-700",
  };

  return (
    <>
      <table className="border-collapse rounded-md w-full bg-">
        <thead>
          <tr className="grid grid-cols-12 py-3 place-content-center justify-items-start  bg-gray-100 text-gray-700">
            <th className=" col-span-4 pl-5">TASK</th>
            <th className=" col-span-2 pl-3">OWNER</th>
            <th className=" col-span-2 pl-3">PRIORITY</th>
            <th className=" col-span-2 pl-3">DUE ON</th>
            <th className="col-span-2 pl-3">STATUS</th>
          </tr>
        </thead>
        {tasks?.map(({ name, owners, dueDate, priority, status, _id }) => (
          <tbody key={_id}>
            <tr className="grid grid-cols-12   place-content-center border border-gray-300 items-center">
              <td class="  border-r border-gray-300 col-span-4 py-4 pl-5 font-semibold text-gray-900">
                {name}
              </td>
              <td class="border-r border-gray-300 col-span-2 py-2 pl-6 flex">
                {getOwner(owners)}
              </td>
              <td class={`border-r border-gray-300 col-span-2 py-4 pl-3 `}>
                <span
                  className={`${prClasses[priority]} px-2 text-xs font-medium py-1 rounded-md flex items-center gap-3 w-24 `}
                >
                  <CiFlag1 /> {priority}
                </span>
              </td>
              <td class="border-r border-gray-300 col-span-2 py-[18px] pl-3 text-sm font-semibold text-gray-800">
                {extractedDate(dueDate)}
              </td>

              <td class={` col-span-2 py-4 pl-3`}>
                <span
                  className={` ${stClasses[status]} px-2 text-xs font-medium py-1 rounded-md`}
                >
                  {status}
                </span>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};

export default Task_List;
