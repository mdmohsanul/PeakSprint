import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Task_Page = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="py-7">
          <h1 className="text-3xl">Task opage</h1>
        </div>
      </div>
    </>
  );
};

export default Task_Page;
