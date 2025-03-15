import React from "react";
import { Link } from "react-router";
import useOwners from "../../hooks/useOwners";
import { useSelector } from "react-redux";

const Team_Card = () => {
  const { teams, status, error } = useSelector((state) => state.teams);

  const { getOwner } = useOwners();
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-8 place-items-center">
        {teams?.map((item) => (
          <div
            key={item._id}
            className="w-72 h-32 border border-gray-200 rounded-md p-5 cursor-pointer hover:bg-gray-300 transition-colors duration-300"
          >
            <Link to={`/dashboard/team/details/${item._id}`}>
              <p className="font-medium truncate text-gray-700">{item.name}</p>
              <div className="pl-5 pt-3 flex">{getOwner(item?.members)}</div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Team_Card;
