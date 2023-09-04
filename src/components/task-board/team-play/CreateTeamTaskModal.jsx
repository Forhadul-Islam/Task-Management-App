/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Select from "react-select";
import Modal from "../../modal/Modal";
import HorizontalLine from "../../ui/HorizontalLine";
import { createTask } from "../../../API/api";
import { addTeamTask } from "../../../features/teams/teamsSlice";

const CreateTeamTaskModal = ({ handleClose, teamId, teamMembers }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [assignedTo, setAssignedTo] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const allUsersSelectOptions = teamMembers
    .filter((u) => u?.id !== user?.id)
    .map((u) => {
      return {
        value: u.id,
        label: u.username,
      };
    });

  //get assigned profiles
  const getAssignedProfiles = () => {
    return teamMembers.filter((u) => {
      const team = assignedTo.map((i) => i.value);
      if (team.includes(u.id)) return true;
    });
  };

  //handle create new task
  const handleCreateTask = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      creator: user,
      teamId,
      createdAt: Date.now(),
      title: taskName,
      description,
      priority,
      status: "Pending",
      deadline,
      assignedTo: getAssignedProfiles(),
    };

    createTask(data).then((task) => {
      dispatch(addTeamTask(task.data.data));
      setIsLoading(false);
      handleClose();
    });
  };

  return (
    <Modal handleClose={handleClose}>
      <form onSubmit={(e) => handleCreateTask(e)}>
        <h3 className="text-xl font-medium">Create Task</h3>
        <HorizontalLine />
        <div className="flex flex-col">
          <label htmlFor="title" className=" text-gray-800 mb-1">
            Task Name
          </label>
          <input
            id="title"
            type="text"
            placeholder="Your task name"
            value={taskName}
            required
            onChange={(e) => setTaskName(e.target.value)}
            className="focus:outline-none h-8 pl-2 border border-gray-300 rounded-md caret-pink-500 mb-3"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className=" text-gray-800 mb-1">
            Description
          </label>
          <textarea
            id="description"
            type="text"
            placeholder="Write a description..."
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="focus:outline-none pl-2 h-8 border border-gray-300 rounded-md caret-pink-500 mb-3"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="priority " className=" text-gray-800 mb-1">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            required
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 pl-2 py-2 mb-3 rounded-md focus:outline-none text-sm  bg-zinc-100"
          >
            <option value="High" selected>
              High
            </option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="assignedTo " className=" text-gray-800 mb-1">
            Assign to
          </label>
          <Select
            onChange={(list) => setAssignedTo(list)}
            isMulti
            name="colors"
            options={allUsersSelectOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div className="flex flex-col  my-2">
          <label htmlFor="due-date" className=" text-gray-800 mb-1">
            Deadline
          </label>
          <input
            type="date"
            name="due-date"
            id="due-date"
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            required
            className="focus:outline-none h-8 pl-2 border border-gray-300 rounded-md caret-pink-500 mb-3"
          />
        </div>
        <div className="flex justify-end mt-5">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex self-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeamTaskModal;
