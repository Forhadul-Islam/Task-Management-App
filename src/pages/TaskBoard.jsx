import { useSelector } from "react-redux";
import Navbar from "../components/nav/Navbar";
import TaskboardHeader from "../components/task-board/TaskboardHeader";
import AllTasks from "../components/task-board/all-tasks/AllTasks";
import TeamPlay from "../components/task-board/team-play/TeamPlay";

const TaskBoard = () => {
  const { currentTab } = useSelector((state) => state.settings.tabs);
  return (
    <div className=" min-h-screen bg-zinc-200/40  px-14 py-8">
      <Navbar />
      <TaskboardHeader />
      <div className="w-full">
        {currentTab == "All Tasks" ? <AllTasks /> : <TeamPlay />}
      </div>
    </div>
  );
};

export default TaskBoard;
