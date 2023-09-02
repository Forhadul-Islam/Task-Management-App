import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../../features/settings/settingsSlice";
import CreateTaskModal from "./all-tasks/CreateTaskModal";
import HorizontalLine from "../ui/HorizontalLine";
import { useState } from "react";

const TaskboardHeader = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    tabs: { allTabs, currentTab },
  } = useSelector((state) => state.settings);

  console.log({ allTabs, currentTab });
  return (
    <>
      <div className="flex justify-between mt-10">
        <ul className="flex gap-2">
          {allTabs.map((tab) => (
            <li
              key={tab}
              onClick={() => dispatch(changeTab(tab))}
              className={`${
                tab == currentTab
                  ? "bg-indigo-700/95 text-white"
                  : "bg-zinc-300 text-gray-800"
              } cursor-pointer font-semibold rounded-md px-2`}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <div>filters and search</div>
          <button
            onClick={() => setShowModal(true)}
            className="text-white font-semibold flex items-center ring-2 ring-indigo-600 bg-indigo-700 px-3  rounded-full text-center"
          >
            <span className="text-2xl pr-2 mb-1">+</span> Create Task
          </button>
          {/* show modal to create new task */}
          {showModal && (
            <CreateTaskModal handleClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
      <HorizontalLine />
    </>
  );
};

export default TaskboardHeader;
