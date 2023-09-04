/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import HorizontalLine from "../ui/HorizontalLine";
import EditTaskModal from "./EditTaskModal";
import { useState } from "react";
import { editTask } from "../../API/api";
import { updateTask } from "../../features/tasks/tasksSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {
    creator,
    title,
    assignedTo,
    priority,
    description,
    status,
    deadline,
  } = task || {};

  const priorityClass =
    priority !== "High"
      ? priority == "Medium"
        ? "bg-red-200 text-red-800  border border-red-400"
        : "bg-indigo-100 text-indigo-800  border border-indigo-400"
      : "bg-pink-100 text-pink-800  border border-pink-400";

  //updating status
  const handleUpdateStatus = (e) => {
    const status = e.target.value;
    const taskId = task.id;
    const updatedTask = {
      ...task,
      status,
    };
    editTask({ id: taskId, task: updatedTask }).then((task) => {
      dispatch(updateTask({ taskId, updatedTask: task.data }));
    });
  };

  return (
    <div className="w-5/6 min-h-[100px] mx-auto  my-4 bg-white rounded-md px-5 py-4 hover:shadow-md">
      <div className="flex gap-2 items-center">
        <img
          className="h-8 w-8 rounded-full"
          src={creator?.image}
          alt={creator?.username}
        />
        <span>{creator?.username}</span>
      </div>
      <HorizontalLine />
      <div className="flex justify-between">
        <div>
          <div className="text-md">{title}</div>
        </div>
        <div className="flex items-center">
          <select
            className="bg-orange-200 text-gray-800  border border-orange-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  "
            name="status"
            id="status"
            onChange={(e) => handleUpdateStatus(e)}
          >
            {["Pending", "In Progress", "Completed"].map((option) => (
              <option
                selected={option == status}
                key={option}
                value={option}
                className=" text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
              >
                {option}
              </option>
            ))}
          </select>
          <span
            className={`${priorityClass} text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}
          >
            {priority}
          </span>

          {/* only creator can edit */}
          {user?.id == task.creator?.id && (
            <span className="text-2xl">
              <TiEdit
                onClick={() => setEditMode(true)}
                className="text-slate-800 cursor-pointer hover:text-blue-700 transition-all"
              />
            </span>
          )}
        </div>
      </div>
      {/* descriptioin section */}
      <div className="text-gray-700 mt-2">{description}</div>

      {/* task assignedTo section */}
      <div className="mt-5 flex flex-col items-end">
        <span className="italic font-semibold">Assigned Members</span>
        <div className="flex mb-5 -space-x-4">
          {assignedTo?.length > 0 &&
            assignedTo.map((member) => {
              return (
                <img
                  key={member.id}
                  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                  src={member.image}
                  alt={member.username}
                />
              );
            })}
          {editMode && (
            <EditTaskModal task={task} handleClose={() => setEditMode(false)} />
          )}
        </div>
        <h5>
          {" "}
          <span className="font-medium">Deadline:</span> {deadline}
        </h5>
      </div>
    </div>
  );
};

export default Task;
