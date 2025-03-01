import React from "react";

const Add_Project_Form = ({ setOpenModal }) => {
  return (
    <>
      <div className="md:w-2/6 w-5/6 h-96 bg-white p-6">
        <div className="flex items-center justify-between pb-5">
          <h1 className="text-xl font-medium">Create New Project</h1>
          <button onClick={() => setOpenModal(false)}>Close</button>
        </div>
        <form>
          <div className="pb-4">
            <label htmlFor="name" className="block pb-2">
              Project Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Project Name"
              className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
            />
          </div>

          <div className="pb-4">
            <label htmlFor="description" className="block pb-2">
              Project Description:
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
              Project Status:
            </label>
            <select
              name="status"
              id="status"
              className="w-full border border-gray-300 focus:outline-gray-300 rounded-md py-1.5 px-2 placeholder:text-sm"
            >
              <option value="">Select Project Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add_Project_Form;
