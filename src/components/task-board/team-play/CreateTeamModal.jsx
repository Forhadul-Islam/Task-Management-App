/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../modal/Modal";
import Select from "react-select";
import HorizontalLine from "../../ui/HorizontalLine";
import { useState } from "react";
import { createTeam } from "../../../API/api";
import { addTeam } from "../../../features/teams/teamsSlice";

const CreateTeamModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { allUsers } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  //multi-select options
  const allUsersSelectOptions = allUsers
    .filter((u) => u?.id !== user?.id)
    .map((u) => {
      return {
        value: u.id,
        label: u.username,
      };
    });

  //populate team with user profile
  const populateTeamMembersWithUserProfile = (userArr, members) => {
    const membersId = members.map((i) => i.value);
    return userArr.filter((u) => {
      return membersId.includes(u.id);
    });
  };

  //handle create team
  const handleCreateTeam = () => {
    setIsLoading(true);
    const data = {
      name: teamName,
      creator: user,
      members: populateTeamMembersWithUserProfile(allUsers, members),
    };
    console.log(data);
    createTeam(data).then((team) => {
      dispatch(addTeam(team.data.data));
      setIsLoading(false);
      handleClose();
    });
  };

  return (
    <Modal handleClose={handleClose}>
      <h3 className="text-xl font-medium">Create New Team</h3>
      <HorizontalLine />
      <div className="flex flex-col">
        <label htmlFor="title" className=" text-gray-800 mb-1">
          Team
        </label>
        <input
          id="title"
          type="text"
          placeholder="Your task name"
          value={teamName}
          required
          onChange={(e) => setTeamName(e.target.value)}
          className="focus:outline-none h-8 pl-2 border border-gray-300 rounded-md caret-pink-500 mb-3"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="assignedTo " className=" text-gray-800 mb-1">
          Add Members
        </label>
        <Select
          onChange={(list) => setMembers(list)}
          isMulti
          name="colors"
          options={allUsersSelectOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <div className="flex justify-end mt-5">
        <button
          onClick={handleCreateTeam}
          // disabled={isLoading}
          type="button"
          className="inline-flex self-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
        >
          {isLoading ? "Creating..." : "Create Team"}
        </button>
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
