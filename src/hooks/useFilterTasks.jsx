import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useDate from "./useDate";

const useFilterTasks = (projectTask) => {
  const { priorityFilter, dateFilter } = useSelector((state) => state.tasks);
  const [taskList, setTaskList] = useState(projectTask);
  const extractedDate = useDate();

  // Function to convert date string to a valid Date object
  const convertToDate = (dateStr) => {
    let convert = extractedDate(dateStr);
    const cleanDate = convert.replace(/(\d+)(st|nd|rd|th)/, "$1"); // Remove ordinal suffixes
    return new Date(cleanDate);
  };
  let priorityMap = { High: 1, Medium: 2, Low: 3 };
  console.log(dateFilter);
  useEffect(() => {
    let filteredTasks = taskList;
    if (priorityFilter === "High") {
      filteredTasks = [...filteredTasks]?.sort(
        (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
      );
    }
    if (priorityFilter === "Low") {
      filteredTasks = [...filteredTasks]?.sort(
        (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
      );
    }
    if (dateFilter === "Newest") {
      filteredTasks = [...filteredTasks].sort(
        (a, b) => convertToDate(a.dueDate) - convertToDate(b.dueDate)
      );
    }
    if (dateFilter === "Oldest") {
      filteredTasks = [...filteredTasks].sort(
        (a, b) => convertToDate(b.dueDate) - convertToDate(a.dueDate)
      );
    }
    setTaskList(filteredTasks);
  }, [priorityFilter, dateFilter]);
  return { taskList };
};

export default useFilterTasks;
