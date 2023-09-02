/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Select from "react-select";
import Modal from "../../modal/Modal";
import HorizontalLine from "../../ui/HorizontalLine";
import { createTask } from "../../../API/api";
import { addTask } from "../../../features/tasks/tasksSlice";

const CreateTaskModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const { allUsers } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const allUsersSelectOptions = allUsers
    .filter((u) => u?.id !== user?.id)
    .map((u) => {
      return {
        value: u.id,
        label: u.username,
      };
    });

  //handle create new task
  const handleCreateTask = (e) => {
    e.preventDefault();
    const data = {
      title: taskName,
      description,
      priority,
      assignedTo: assignedTo.map((i) => i.value),
    };
    createTask(data).then((task) => dispatch(addTask(task.data.data)));
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
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 pl-2 py-2 mb-3 rounded-md focus:outline-none text-sm  bg-zinc-100"
          >
            <option value="High" className="">
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
        <div className="flex justify-end mt-5">
          <button
            // disabled={true}
            type="submit"
            className="inline-flex self-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
