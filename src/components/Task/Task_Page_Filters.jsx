import React, { useEffect, useState } from "react";
import { statusOptions } from "../../data/dashboard";
import Add_Task_Btn from "./Add_Task_Btn";
import { useDispatch, useSelector } from "react-redux";
import Dropdown_Select from "../Filter_Component/Dropdown_Select";
import { fetchUsers } from "../../features/userSlice";
import { fetchTeams } from "../../features/teamSlice";
import { fetchProjects } from "../../features/projectSlice";
import {
  setDateFilter,
  setOwnerName,
  setPriorityFilter,
  setProjectFilter,
  setTeamFilter,
} from "../../features/taskSlice";
import { useSearchParams } from "react-router";

const Task_Page_Filters = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { teams } = useSelector((state) => state.teams);
  const { projects } = useSelector((state) => state.projects);

  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  // Get filter values from the URL
  const owner = searchParams.get("owner") || "";
  const team = searchParams.get("team") || "";
  const project = searchParams.get("project") || "";

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTeams());
    dispatch(fetchProjects());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setPriorityFilter(selectedPriority));
    dispatch(setDateFilter(selectedDate));
    dispatch(setOwnerName(owner));
    dispatch(setProjectFilter(project));
    dispatch(setTeamFilter(team));
  }, [selectedPriority, selectedDate, owner, team, project]);

  // Update URL when filters change
  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };
  return (
    <>
      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h2 className="w-20">Filters: </h2>
            <label htmlFor="userFilter" className="">
              <select
                name="userFilter"
                id="userFilter"
                value={owner}
                onChange={(e) => updateFilters("owner", e.target.value)}
                className="border-gray-300 border rounded-md text-gray-600 text-sm px-3 py-1 w-32 focus:outline-blue-300"
              >
                <option value="" className="text-sm text-gray-600 ">
                  Users
                </option>
                {users.map(({ _id, name }) => (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="teamFilter" className="">
              <select
                name="teamFilter"
                id="teamFilter"
                value={team}
                onChange={(e) => updateFilters("team", e.target.value)}
                className="border-gray-300 border rounded-md text-gray-600 text-sm px-3 py-1 w-32 focus:outline-blue-300"
              >
                <option value="" className="text-sm text-gray-600 ">
                  Teams
                </option>
                {teams.map(({ _id, name }) => (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="projectFilter" className="">
              <select
                name="projectFilter"
                id="projectFilter"
                value={project}
                onChange={(e) => updateFilters("project", e.target.value)}
                className="border-gray-300 border rounded-md text-gray-600 text-sm px-3 py-1 w-32 focus:outline-blue-300"
              >
                <option value="" className="text-sm text-gray-600 ">
                  Projects
                </option>
                {projects.map(({ _id, name }) => (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            {/* <Dropdown_Select
              options={teams}
              placeholder="Teams"
              name="teamFilter"
              value={selectTeam}
              setValue={setSelectTeam}
            />
            <Dropdown_Select
              options={projects}
              placeholder="Projects"
              name="projectFilter"
              value={selectProject}
              setValue={setSelectProject}
            /> */}
          </div>
          <div className="flex items-center gap-3">
            <h2 className="w-20">Sort By: </h2>
            <select
              name="priority"
              id="priority"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-1 w-32 rounded-md border  border-gray-300 text-gray-700 text-sm cursor-pointer  focus:outline-blue-300"
            >
              <option value="">Priority</option>
              <option value="High">High - Low</option>
              <option value="Low">Low - High</option>
            </select>
            <select
              name="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1 w-32 rounded-md border border-gray-300 text-gray-700 focus:outline-blue-300 text-sm cursor-pointer "
            >
              <option value="">Date</option>
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>
        <Add_Task_Btn />
      </div>
    </>
  );
};

export default Task_Page_Filters;
