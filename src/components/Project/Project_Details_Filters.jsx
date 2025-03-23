import React, { useEffect, useState } from "react";
import Dropdown_Select from "../Filter_Component/Dropdown_Select";
import { statusOptions } from "../../data/dashboard";
import { useDispatch } from "react-redux";
import { setDateFilter, setPriorityFilter } from "../../features/taskSlice";

const Project_Details_Filters = () => {
  const dispatch = useDispatch();
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  useEffect(() => {
    dispatch(setPriorityFilter(selectedPriority));
    dispatch(setDateFilter(selectedDate));
  }, [selectedPriority, selectedDate]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <h2>Sort By: </h2>
          <select
            name="priority"
            id="priority"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="py-1 px-3 rounded-3xl border border-gray-300 text-gray-700 text-sm cursor-pointer ml-4 focus:outline-blue-300"
          >
            <option value="">Priority</option>
            <option value="High">High - Low</option>
            <option value="Low">Low - High</option>
          </select>
          <select
            name="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="py-1 px-3 rounded-3xl border border-gray-300 text-gray-700 focus:outline-blue-300 text-sm cursor-pointer ml-4"
          >
            <option value="">Date</option>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
        <div className="flex items-center">
          <h2 className="mr-4">Sort By: </h2>

          <Dropdown_Select
            options={statusOptions}
            name="taskFilter"
            value={selectedStatus}
            setValue={setSelectedStatus}
          />
        </div>
      </div>
    </>
  );
};

export default Project_Details_Filters;
