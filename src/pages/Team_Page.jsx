import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add_Team_Btn from "../components/Team/Add_Team_Btn";
import Team_Card from "../components/Team/Team_Card";
import { fetchTeams } from "../features/teamSlice";
import { fetchUsers } from "../features/userSlice";
import Dashboard_Shimmer from "../Shimmer_UI/Dashboard_Shimmer";

const Team_Page = () => {
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(teams);
  if (status === "loading")
    return (
      <div className="page-container">
        <Dashboard_Shimmer />
      </div>
    );
  if (status === "failed")
    return <p className="page-container">Error: {error}</p>;

  return (
    <>
      {status === "success" && (
        <div className="page-container">
          <div className=" flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Teams</h1>
            <Add_Team_Btn />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-8 place-items-center">
            {teams?.map((item) => (
              <Team_Card data={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Team_Page;
