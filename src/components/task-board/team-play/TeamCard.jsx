/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import HorizontalLine from "../../ui/HorizontalLine";
import Task from "../Task";
import TeamTask from "./TeamTask";
import CreateTeamTaskModal from "./CreateTeamTaskModal";
import { useState } from "react";

const TeamCard = ({ team }) => {
  const { allTasks } = useSelector((state) => state.tasks);
  const { id: teamId, name, creator, members } = team;
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const teamMembersStr = members.map((m) => m.username).join(", ");
  return (
    <div className="w-96  shadow-sm bg-white px-4 py-3 rounded-md">
      <div>
        <h3 className="text-xl font-medium">🚂 {name} </h3>
        <small>
          <span className="font-medium">🤠 Created By-</span>{" "}
          {creator?.username}
        </small>
        <br />
        <small>
          <span className="font-medium">🧠 Other Members-</span>{" "}
          {teamMembersStr}
        </small>
      </div>
      <HorizontalLine />
      <TeamTask task={allTasks[0]} />
      <div className="flex justify-center">
        <button
          onClick={() => setShowCreateTaskModal(true)}
          className="bg-indigo-500  h-8 w-80 text-white hover:bg-indigo-600   mt-6 px-8 rounded-md"
        >
          {" "}
          Add task
        </button>
      </div>
      {showCreateTaskModal && (
        <CreateTeamTaskModal
          handleClose={() => setShowCreateTaskModal(false)}
          teamId={teamId}
          teamMembers={members}
        />
      )}
    </div>
  );
};

export default TeamCard;
