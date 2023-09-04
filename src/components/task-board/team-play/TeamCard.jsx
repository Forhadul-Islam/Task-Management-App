/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import HorizontalLine from "../../ui/HorizontalLine";
import TeamTask from "./TeamTask";
import CreateTeamTaskModal from "./CreateTeamTaskModal";
import { useEffect, useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import { FaSort } from "react-icons/fa";

//sorting function
const sortTasks = (sortBy, tasks) => {
  switch (sortBy) {
    case "Newest":
      return tasks;
    case "Oldest": {
      return tasks.sort((n, o) => o.createdAt - n.createdAt);
    }
    case "Priority": {
      return [
        ...tasks.filter((t) => t.priority == "High"),
        ...tasks.filter((t) => t.priority == "Medium"),
        ...tasks.filter((t) => t.priority == "Low"),
      ];
    }
    case "Due-Date": {
      return tasks.sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );
    }
    default:
      return;
  }
};

const TeamCard = ({ team }) => {
  const { teamTasks } = useSelector((state) => state.teams);
  const [filterBy, setFilterBy] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { id: teamId, name, creator, members } = team;
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const teamMembersStr = members.map((m) => m.username).join(", ");

  useEffect(() => {
    const filteredTeamTasks = teamTasks
      .filter((task) => {
        return task.teamId == teamId;
      })
      .filter((task) => {
        console.log(filterBy);
        if (filterBy == "All") {
          return true;
        }
        return task.status == filterBy;
      });

    setFilteredTasks(sortTasks(sortBy, filteredTeamTasks));
  }, [sortBy, filterBy, teamId, teamTasks]);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setFilterBy(filter);
  };
  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
  };
  return (
    <div className="w-72  h-fit shadow-sm bg-white px-4 py-3 rounded-md">
      <div>
        <h3 className="text-xl font-medium text-slate-900">🚂 {name} </h3>
        <small>
          <span className="font-medium ">🤠 Created By-</span>{" "}
          {creator?.username}
        </small>
        <br />
        <small>
          <span className="font-medium">🧠 Other Members-</span>
          {teamMembersStr}
        </small>
      </div>
      <HorizontalLine />
      <div className="flex gap-1 justify-evenly">
        <div className="bg-gray-300 p-[1px] rounded-lg">
          <label htmlFor="filterby" className="flex items-center">
            <AiFillFilter />
            <select
              name="priority"
              id="priority"
              onChange={(e) => handleFilterChange(e)}
              className="border ml-2 border-gray-300  rounded-md focus:outline-none text-sm  bg-zinc-100"
            >
              {["All", "Pending", "In Progress", "Completed"].map((op) => {
                return (
                  <option key={op} selected={op == "Pending"} value={op}>
                    {op}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className="bg-gray-300 p-[1px] rounded-lg">
          <label htmlFor="filterby" className="flex items-center">
            <FaSort />
            <select
              name="priority"
              id="priority"
              onChange={(e) => handleSortChange(e)}
              className="border ml-2 border-gray-300  rounded-md focus:outline-none text-sm  bg-zinc-100"
            >
              {["Newest", "Oldest", "Priority", "Due-Date"].map((op) => {
                return (
                  <option key={op} selected={op == "Newest"} value={op}>
                    {op}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
      <HorizontalLine />
      {filteredTasks.length > 0 &&
        filteredTasks.map((task) => <TeamTask key={task.id} task={task} />)}

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
