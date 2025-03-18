import React from "react";

const Project_Details_Filters = () => {
  return (
    <>
      <div>
        <div className="flex items-center">
          <h2>Sort By: </h2>
          <select
            name="priority"
            id="priority"
            className="py-1 px-3 rounded-3xl border border-gray-500 text-gray-700 hover:bg-gray-200 text-sm cursor-pointer ml-4"
          >
            <option value="">Priority</option>
            <option value="High">High - Low</option>
            <option value="Low">Low - High</option>
          </select>
          <select
            name="date"
            id="date"
            className="py-1 px-3 rounded-3xl border border-gray-500 text-gray-700 hover:bg-gray-200 text-sm cursor-pointer ml-4"
          >
            <option value="">Date</option>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Project_Details_Filters;
