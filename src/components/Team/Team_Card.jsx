import React from "react";
import { Link } from "react-router";

const Team_Card = ({ data }) => {
  const member = data?.members?.map((item) => {
    const spl = item?.name?.split(" ");
    return `${
      spl.length > 1 ? spl[0].charAt(0) + spl[1]?.charAt(0) : spl[0].charAt(0)
    }`;
  });
  const memberCount = member.slice(0, 3);
  const getName = (idx) => {
    const classes = {
      0: "bg-orange-500 text-orange-100",
      1: "bg-blue-500 text-blue-100",
      2: "bg-red-500 text-red-100",
      3: "bg-gray-600 text-gray-100",
    };
    return classes[idx];
  };
  return (
    <>
      <div className="w-72 h-32 bg-gray-200 rounded-md p-5 cursor-pointer hover:bg-gray-300 transition-colors duration-300">
        <Link to={`/dashboard/team/details/${data._id}`}>
          <p className="font-medium truncate text-gray-700">{data.name}</p>
          <div className="pl-5 pt-3">
            {memberCount.map((item, i) => (
              <button
                className={`-ml-2   p-2 w-10 h-10 rounded-full ${getName(i)}`}
              >
                {item}
              </button>
            ))}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Team_Card;
