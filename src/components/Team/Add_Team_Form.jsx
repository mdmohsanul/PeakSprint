import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { addTeam } from "../../features/teamSlice";
import Input_Box from "../Form_Components/Input_Box";
import Textarea from "../Form_Components/Textarea";

const Add_Team_Form = ({ setOpenModal }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [err, setErr] = useState("");

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
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = {
      name,
      description,
      members,
    };
    console.log(data);
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

          <div className="pb-4">
            <label htmlFor="status" className="block pb-2">
              Add Member:
            </label>
            <select
              name="status"
              id="status"
              value={members}
              onChange={(e) => setMembers((prev) => [...prev, e.target.value])}
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

export default Add_Team_Form;
