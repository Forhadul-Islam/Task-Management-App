import { useSelector } from "react-redux";
import Navbar from "../components/nav/Navbar";
import TaskboardHeader from "../components/task-board/TaskboardHeader";
import AllTasks from "../components/task-board/all-tasks/AllTasks";
import TeamPlay from "../components/task-board/team-play/TeamPlay";

const TaskBoard = () => {
  const { currentTab } = useSelector((state) => state.settings.tabs);
  return (
    <div className="bg-stone-200/40 min-h-screen px-14 py-8">
      <Navbar />
      <TaskboardHeader />
      {currentTab == "All Tasks" ? <AllTasks /> : <TeamPlay />}
    </div>
  );
};

export default TaskBoard;
