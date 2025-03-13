import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  clearError,
  fetchProjects,
} from "../../features/projectSlice";
import Dropdown from "../Form_Components/Dropdown";
import Input_Box from "../Form_Components/Input_Box";
import Textarea from "../Form_Components/Textarea";
import { statusOptions } from "../../data/dashboard";

const Add_Project_Form = ({ setOpenModal }) => {
  console.log(statusOptions);
  const [name, setName] = useState("");
  const [projectStatus, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const { submitStatus, error } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !projectStatus || !description) {
      setErr("Please fill all the required fields");
      return;
    }
    setErr("");
    const data = {
      name,
      status: projectStatus,
      description,
    };

    try {
      await dispatch(addProject(data)).unwrap(); // Ensure addProject completes before fetching
      dispatch(fetchProjects()); // Now fetch updated projects
      setOpenModal(false);
      dispatch(clearError());
    } catch (error) {
      console.log(error);
      setErr(error || "Something went wrong!");
    }
    // const formData = new FormData(e.target);
    // console.log(formData);
    // const obj = Object.fromEntries(formData.entries());
    // console.log(obj);
  };

  return (
    <>
      <div className="md:w-2/6 w-5/6  bg-white p-6">
        <div className="flex items-center justify-between pb-5">
          <h1 className="text-xl font-medium">Create New Project</h1>
          <button
            onClick={() => setOpenModal(false)}
            className="text-2xl cursor-pointer"
          >
            <RxCross2 />
          </button>
        </div>

        <form onSubmit={() => e.preventDefault()}>
          {/* Show error */}
          {err && (
            <p className="text-white inline-block bg-red-600 py-1 px-3 ">
              <span className="pr-1">⨂</span> {err}
            </p>
          )}{" "}
          <Input_Box
            label=" Project Name"
            value={name}
            setValue={setName}
            name="name"
            type="text"
            placeholder="Enter Project Name"
          />
          <Textarea
            label=" Project Description:"
            name="description"
            value={description}
            setValue={setDescription}
            placeholder="Enter Project Description"
          />
          <Dropdown
            label="Project Status"
            value={projectStatus}
            setValue={setStatus}
            placeholder=""
            options={statusOptions}
          />
          <div className="flex gap-4 mt-3">
            <button
              className="bg-blue-500 text-white rounded-md px-5 py-2 cursor-pointer"
              onClick={submitHandler}
            >
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

export default Add_Project_Form;
