import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusOptions } from "../../data/dashboard";
import { fetchTask } from "../../features/taskSlice";
import Add_Task_Btn from "../Task/Add_Task_Btn";
import Task_Card from "../Task/Task_Card";

const Task_Section = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  console.log(tasks);
  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);
  return (
    <>
      <div>
        <div className={`grid grid-cols-3 md:grid-cols-12 grid-rows-1`}>
          <span className="flex flex-col md:flex-row justify-between md:col-span-4 col-span-1">
            <h1 className="text-3xl text-gray-800 font-semibold inline-block md:pr-10 pb-5 md:pb-0 ">
              My Tasks
            </h1>
            <label htmlFor="projectFilter" className="">
              <select
                name="projectFilter"
                id="projectFilter"
                className="border-gray-300 border rounded-md text-gray-600 text-sm px-3 py-1 focus:outline-blue-300"
              >
                <option value="" className="text-sm text-gray-600 ">
                  Filter
                </option>
                {statusOptions.map(({ id, option }) => (
                  <option key={id} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </span>
          <span className="md:col-span-6 col-span-1"></span>
          <div className="md:col-span-2 col-span-1">
            <Add_Task_Btn />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-5  place-self-center">
          {tasks?.map((item) => (
            <Task_Card data={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Task_Section;
