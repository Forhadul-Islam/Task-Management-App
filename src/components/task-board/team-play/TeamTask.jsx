/* eslint-disable react/prop-types */
import { TiEdit } from "react-icons/ti";
import HorizontalLine from "../../ui/HorizontalLine";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import EditTaskModal from "../EditTaskModal";
import { editTask } from "../../../API/api";
import { updateTeamTask } from "../../../features/teams/teamsSlice";

const TeamTask = ({ task }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { creator, title, assignedTo, priority, description, status } =
    task || {};

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
      dispatch(updateTeamTask({ taskId, updatedTask: task.data }));
    });
  };

  return (
    <div className=" w-full  mx-auto my-4 bg-zinc-200/70 rounded-md px-3 py-3 hover:shadow-md">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img
            className="h-6 w-6 rounded-full"
            src={creator?.image}
            alt={creator?.username}
          />

          <span>{creator?.username}</span>
        </div>
        <div>
          <select
            className="bg-orange-200 text-gray-800 w-20 mb-1  border border-orange-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  "
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
        </div>
      </div>
      <div className="flex justify-end">
        <span
          className={`${priorityClass} self-end text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}
        >
          {priority}
        </span>
      </div>
      <HorizontalLine />
      <div className="flex justify-between">
        <div>
          <div className="text-lg font-medium">{title}</div>
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
        </div>
        {user?.id == task.creator?.id && (
          <span className="text-2xl">
            <TiEdit
              onClick={() => setEditMode(true)}
              className="text-slate-800 cursor-pointer hover:text-blue-700 transition-all"
            />
          </span>
        )}
        {editMode && (
          <EditTaskModal
            teamPlay
            task={task}
            handleClose={() => setEditMode(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TeamTask;
