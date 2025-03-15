import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Add_Team_Form from "../components/Team/Add_Team_Form";
import Team_Card from "../components/Team/Team_Card";
import { fetchTeams } from "../features/teamSlice";
import { fetchUsers } from "../features/userSlice";
import Dashboard_Shimmer from "../Shimmer_UI/Dashboard_Shimmer";

const Team_Page = () => {
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.teams);
  const { users } = useSelector((state) => state.users);
  console.log(users);

  const [openModal, setOpenModal] = useState(false);
  console.log(teams);
  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchUsers());
  }, [dispatch]);
  if (status === "loading")
    return (
      <div className="md:ml-64 max-w-5xl mx-auto md:p-8 p-4 md:mt-16 mt-28 bg-white">
        <Dashboard_Shimmer />
      </div>
    );
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <>
      {status === "success" && (
        <div className="md:ml-64 max-w-5xl mx-auto md:p-8 p-4 md:mt-16 mt-28 bg-white">
          <div className=" flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Teams</h1>
            <button
              className="text-white   h-9 bg-blue-600 py-2 md:px-4 px-1 rounded-md cursor-pointer text-sm "
              onClick={() => setOpenModal(!openModal)}
            >
              + Add Team
            </button>
          </div>
          <Team_Card />
          {openModal && (
            <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-xs bg-black/50">
              <Add_Team_Form setOpenModal={setOpenModal} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Team_Page;
