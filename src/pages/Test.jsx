import React from "react";

const Test = () => {
  const boxArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto  md:p-8 p-4 md:mt-16 mt-28 bg-white ">
        <div
          role="status"
          class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse "
        >
          <div class="h-16 bg-gray-200  dark:bg-gray-700 w-full mb-10"></div>

          <div className="grid md:grid-cols-3 place-content-center place-items-center gap-y-12 ">
            {boxArr.map((item) => (
              <div class="flex flex-col items-center justify-end  h-48 bg-gray-300 rounded-sm w-56 dark:bg-gray-700">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-10"></div>
              </div>
            ))}
          </div>

          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Test;
