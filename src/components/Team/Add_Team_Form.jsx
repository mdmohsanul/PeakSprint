import React from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const Add_Team_Form = ({ setOpenModal }) => {
  const { users } = useSelector((state) => state.users);
  console.log(users);

  const submitHandler = (e) => {
    e.preventDefault();
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
          <div className="pb-4">
            <label htmlFor="name" className="block pb-2">
              Team Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Team Name"
              className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
            />
          </div>

          <div className="pb-4">
            <label htmlFor="description" className="block pb-2">
              Team Description:
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="2"
              placeholder="Enter Project Description"
              className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
            ></textarea>
          </div>
          <div className="pb-4">
            <label htmlFor="status" className="block pb-2">
              Add Member:
            </label>
            <select
              name="status"
              id="status"
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
