import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { addTeam, fetchTeams } from "../../features/teamSlice";
import Input_Box from "../Form_Components/Input_Box";
import Textarea from "../Form_Components/Textarea";
import Multiselect_Dropdown_ID from "../Form_Components/Multiselect_Dropdown_ID";

const Add_Team_Form = ({ setOpenModal }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [err, setErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);

  function validateForm() {
    if (!name || !members.length || !description) {
      console.log("errr");
      setErr("Please fill all the required fields.");
      return false;
    }
    setErr("");
    return true;
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = {
      name,
      description,
      members,
    };
    try {
      setIsSubmitting(true);
      await dispatch(addTeam(data)).unwrap();
      dispatch(fetchTeams());
      setOpenModal(false); // Close modal after success
    } catch (error) {
      setErr(error || "Failed to create team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
    // dispatch(addTeam(data));
  };
  return (
    <>
      <div className="md:w-2/6 w-5/6  bg-white p-6">
        <div className="flex items-center justify-between pb-5">
          <h1 className="text-xl font-medium">Create New Team</h1>
          <button
            onClick={() => setOpenModal(false)}
            className="text-2xl cursor-pointer"
          >
            <RxCross2 />
          </button>
        </div>

        <form onSubmit={submitHandler}>
          {err && <p className="text-red-600 font-medium">{err}</p>}

          <Input_Box
            label="Team Name"
            value={name}
            setValue={setName}
            name="name"
            type="text"
            placeholder="Enter Team Name"
          />
          <Textarea
            label="Team Description"
            name="description"
            value={description}
            setValue={setDescription}
            placeholder="Enter Team Description"
          />
          <Multiselect_Dropdown_ID
            label="Add Member"
            value={members}
            setValue={setMembers}
            name="member"
            options={users}
          />

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

export default Add_Team_Form;
