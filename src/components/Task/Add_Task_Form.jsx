import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  statusOptions,
  tagOptions,
  priorityOptions,
} from "../../data/dashboard";
import Dropdown from "../Form_Components/Dropdown";
import Input_Box from "../Form_Components/Input_Box";
import Multiselect_Dropdown_ID from "../Form_Components/Multiselect_Dropdown_ID";
import Multiselect_Dropdown from "../Form_Components/Multiselect_Dropdown";
import {
  addTask,
  clearError,
  fetchTask,
  fetchTaskByProject,
} from "../../features/taskSlice";
import PropTypes from "prop-types";

const Add_Task_Form = ({ setOpenModal, projectId = null }) => {
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(projectId);
  const [taskName, setTaskName] = useState("");
  const [team, setTeam] = useState("");
  const [project, setProject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [teamMember, setTeamMember] = useState([]);
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState("");

  const { projects } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.teams);
  const { users } = useSelector((state) => state.users);

  const validateForm = () => {
    if (!taskName || !project || !team || !taskStatus) {
      setErr("Please fill in all required fields.");
      return false;
    }
    setErr("");
    return true;
  };
  const submitHandler = async () => {
    if (!validateForm()) return;
    const getOwnerIds = teamMember.map((item) => item._id);
    const data = {
      name: taskName,
      project: project,
      team: team, // Team ID
      owners: getOwnerIds,
      tags: tags,
      timeToComplete: estimatedTime,
      status: taskStatus,
      priority: priority,
      dueDate: dueDate,
    };

    try {
      setIsSubmitting(true);
      await dispatch(addTask(data)).unwrap();
      dispatch(fetchTask());
      projectId && dispatch(fetchTaskByProject(projectId));
      dispatch(clearError());
      setOpenModal(false); // Close modal after success
    } catch (error) {
      setErr(error || "Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="md:w-4/6 w-5/6  bg-white p-6 ">
        <div className="flex items-center justify-between pb-5">
          <h1 className="text-xl font-medium">Create New Task</h1>
          <button
            onClick={() => setOpenModal(false)}
            className="text-2xl cursor-pointer"
          >
            <RxCross2 />
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          {err && <p style={{ color: "red" }}>{err}</p>} {/* Show error */}
          <div className="grid grid-cols-2 gap-x-5">
            <Input_Box
              name={taskName}
              type="text"
              label="Task Name"
              placeholder="Enter Task Name"
              value={taskName}
              setValue={setTaskName}
            />
            <Dropdown
              options={projects}
              label="Project"
              value={project}
              setValue={setProject}
              name="projects"
            />
            <Dropdown
              options={priorityOptions}
              label="Priority"
              value={priority}
              setValue={setPriority}
              name="priority"
            />
            <div className="flex gap-7">
              <div>
                <label htmlFor="dueDate" className="block pb-2">
                  Due Date:{" "}
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full text-gray-500 border border-gray-300 focus:outline-gray-300 rounded-md py-2.5 px-2 placeholder:text-sm"
                />
              </div>
              <div>
                <Input_Box
                  name="estimatedTime"
                  type="number"
                  label="Estimated Time"
                  placeholder="Enter Time in Days"
                  value={estimatedTime}
                  setValue={setEstimatedTime}
                  className="w-1/2"
                />
              </div>
            </div>
            <Dropdown
              options={teams}
              label="Team"
              value={team}
              setValue={setTeam}
              name="teams"
            />
            <Multiselect_Dropdown_ID
              options={users}
              label="Team Member"
              name="teamMember"
              placeholder="Select Team Member"
              value={teamMember}
              setValue={setTeamMember}
            />
            <Multiselect_Dropdown
              options={tagOptions}
              label="Tags"
              name="tags"
              placeholder="Select Tags"
              value={tags}
              setValue={setTags}
            />{" "}
            <Dropdown
              name="taskStatus"
              options={statusOptions}
              label="Status"
              value={taskStatus}
              setValue={setTaskStatus}
            />
          </div>
          <div className="flex gap-4 mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={submitHandler}
              className={`bg-blue-500 text-white rounded-md px-5 py-2 cursor-pointer ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating..." : "Create"}
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
Add_Task_Form.propTypes = {
  setOpenModal: PropTypes.Boolean,
  projectId: PropTypes.string,
};

export default Add_Task_Form;
