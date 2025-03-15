import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Add_Member_Form from "../components/Team/Add_Member_Form";
import { fetchTeams } from "../features/teamSlice";

const Team_Details_Page = () => {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.teams);
  const [openModal, setOpenModal] = useState(false);
  const findTeam = teams?.find((item) => item._id === teamId);

  const getName = (value, idx) => {
    const valueArr = value.split(" ");
    const char =
      valueArr.length > 1
        ? valueArr[0].charAt(0) + valueArr[1].charAt(0)
        : valueArr[0].charAt(0);
    const classes = {
      0: "bg-orange-500 text-orange-100",
      1: "bg-blue-500 text-blue-100",
      2: "bg-red-500 text-red-100",
      3: "bg-gray-600 text-gray-100",
    };

    return (
      <span
        className={`${classes[idx]}  p-2 w-10 h-10 rounded-full flex items-center justify-center`}
      >
        {char}
      </span>
    );
  };
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);
  return (
    <>
      <div className="md:ml-64 max-w-5xl mx-auto md:p-8 p-4 md:mt-16 mt-28 bg-white">
        <Link
          to="/dashboard/teams"
          className="text-blue-600 font-medium hover:text-blue-800"
        >
          ← Back To Teams
        </Link>
        <div className="pt-8">
          <h1 className="text-2xl text-gray-800 font-semibold ">
            {findTeam?.name}
          </h1>
          <p>{findTeam?.description}</p>
          <div className="pt-5 ">
            <h2 className="text-xl text-gray-500">Members</h2>
            <div className="flex gap-5 flex-col pt-4">
              {findTeam?.members.map((item, i) => (
                <div className="flex items-center gap-5" key={item._id}>
                  {getName(item.name, i)}

                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setOpenModal(!openModal)}
              className="text-white bg-blue-600 px-4 py-2 rounded-md mt-5 cursor-pointer hover:bg-blue-800 transition-colors duration-300"
            >
              + Add Member
            </button>
          </div>
        </div>
        {openModal && (
          <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-xs bg-black/50">
            <Add_Member_Form
              setOpenModal={setOpenModal}
              teamId={findTeam?._id}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Team_Details_Page;
