import React from "react";

const Dashboard_Shimmer = () => {
  const boxArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse "
      >
        <div className="h-16 bg-gray-200  dark:bg-gray-700 w-full mb-10"></div>

        <div className="grid md:grid-cols-3 place-content-center place-items-center gap-y-12 ">
          {boxArr.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-end  h-48 bg-gray-300 rounded-sm w-56 dark:bg-gray-700"
            >
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-10"></div>
            </div>
          ))}
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default Dashboard_Shimmer;
