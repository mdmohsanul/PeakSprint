import React from "react";
import { Link } from "react-router";
import useOwners from "../../hooks/useOwners";

const Team_Card = ({ data }) => {
  const { getOwner } = useOwners();
  return (
    <>
      <div
        key={data._id}
        className="w-72 h-32 border border-gray-200 rounded-md p-5 cursor-pointer hover:bg-gray-300 transition-colors duration-300"
      >
        <Link to={`/dashboard/team/details/${data._id}`}>
          <p className="font-medium truncate text-gray-700">{data?.name}</p>
          {/* using conditional rendering here bcoz if members details is populated successfull then show icons  */}
          {data.members[0].name && (
            <div className="pl-5 pt-3 flex">{getOwner(data?.members)}</div>
          )}
        </Link>
      </div>
    </>
  );
};

export default Team_Card;
