import { useDispatch, useSelector } from "react-redux";
import { getTasks, getTeams } from "../../../API/api";
import CreateTeamModal from "./CreateTeamModal";
import TeamCard from "./TeamCard";
import { useEffect, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { loadTeamTasks, loadTeams } from "../../../features/teams/teamsSlice";

const TeamPlay = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { teams } = useSelector((state) => state.teams);
  const [searchedTeam, setSearchedTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const filterBySearchedText = (teams, text) => {
    return teams?.filter((t) =>
      t.name.toLowerCase().includes(text.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchedText(text);
  };

  useEffect(() => {
    const result = filterBySearchedText(teams, searchedText);
    setSearchedTeam(result);
  }, [setSearchedText, searchedText, teams]);

  useEffect(() => {
    setIsLoading(true);
    //load all users team (either user is a creator or a team member)
    getTeams().then((teams) => {
      const usersTeams = teams.filter((team) => {
        const { members, creator } = team;
        const teamsId = members.map((m) => m.id);
        if (user.id == creator.id || teamsId.includes(user.id)) return true;
      });
      dispatch(loadTeams(usersTeams));

      //load tasks related to the teams
      const teamsIdArr = usersTeams.map((t) => t.id);
      getTasks().then((tasks) => {
        const relatedTasks = tasks.filter((task) => {
          if (task?.teamId && teamsIdArr.includes(task.teamId)) {
            return true;
          }
        });
        dispatch(loadTeamTasks(relatedTasks));
      });

      setIsLoading(false);
    });
  }, [dispatch, user]);

  if (isLoading) return <div className="my-10 text-center">Loading...</div>;
  if (!isLoading && teams.length == 0)
    return (
      <div className="flex flex-col h-80 items-center justify-center">
        <div className=" text-center">
          No Team exists. Create Your Team now!
        </div>
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-pink-500 flex pt-1 justify-center  h-8 w-40 text-white hover:bg-pink-600   mt-6 px-8 rounded-md"
          >
            <BsPlusSquare className="mt-1 mr-1" /> <span>New Team</span>
          </button>
          {showModal && (
            <CreateTeamModal handleClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
    );
  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-pink-500 flex pt-1 justify-center  h-8 w-40 text-white hover:bg-pink-600   mt-6 px-8 rounded-md"
        >
          <BsPlusSquare className="mt-1 mr-1" /> <span>New Team</span>
        </button>
        {showModal && (
          <CreateTeamModal handleClose={() => setShowModal(false)} />
        )}
      </div>
      <div className=" flex justify-end">
        <input
          type="search"
          name="search"
          id="search"
          onChange={(e) => handleSearch(e)}
          placeholder="Search by team name"
          className="border-2 border-gray-700 outline-none focus:outline-none focus:border-rose-600 mb-6 px-2 rounded-md"
        />
      </div>
      <div className="flex ">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-evenly  flex-wrap ">
          {teams.length > 0 &&
            teams.map((team) => <TeamCard key={team?.id} team={team} />)}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-evenly  flex-wrap ">
          {searchedTeam.length > 0 &&
            searchedTeam.map((team) => <TeamCard key={team?.id} team={team} />)}
        </div>
      </div>
    </>
  );
};

export default TeamPlay;
