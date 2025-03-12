import React from "react";
import { Link } from "react-router";
import useOwners from "../../hooks/useOwners";

const Team_Card = ({ data }) => {
  const { getOwner } = useOwners();
  console.log(data);
  return (
    <>
      <div className="w-72 h-32 bg-gray-200 rounded-md p-5 cursor-pointer hover:bg-gray-300 transition-colors duration-300">
        <Link to={`/dashboard/team/details/${data._id}`}>
          <p className="font-medium truncate text-gray-700">{data.name}</p>
          <div className="pl-5 pt-3 flex">{getOwner(data?.members)}</div>
        </Link>
      </div>
    </>
  );
};

export default Team_Card;
