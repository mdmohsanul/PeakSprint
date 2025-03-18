import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {
  addTeamMember,
  clearError,
  fetchTeams,
} from "../../features/teamSlice";
import { useNavigate } from "react-router";

const Add_Member_Form = ({ setOpenModal, teamId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const [err, setErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!teamId || !selectedMember.length) {
      setErr("Required missing fields");
      return;
    }
    const data = {
      id: teamId,
      members: [selectedMember],
    };

    try {
      setIsSubmitting(true);
      await dispatch(addTeamMember(data)).unwrap();
      dispatch(fetchTeams());
      dispatch(clearError());
      setOpenModal(false); // Close modal after success
    } catch (error) {
      setErr(error || "Failed to create team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="md:w-2/6 w-5/6  bg-white p-6">
        <div className="flex items-center justify-between pb-5">
          <h1 className="text-xl font-medium">Add New Member</h1>
          <button
            onClick={() => setOpenModal(false)}
            className="text-2xl cursor-pointer"
          >
            <RxCross2 />
          </button>
        </div>
        <form onSubmit={submitHandler}>
          {err && <p className="text-red-600 py-2">{err}</p>}
          <div className="pb-4">
            <label htmlFor="member" className="block pb-2">
              Add Member:
            </label>
            <select
              name="status"
              id="status"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
            >
              <option value="">Select Member</option>
              {users?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 mt-3">
            <button className="bg-blue-500 text-white rounded-md px-5 py-2 cursor-pointer">
              Create
            </button>
            <button
              className="bg-gray-500 text-white rounded-md px-5 py-2 cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add_Member_Form;
