import { useDispatch, useSelector } from "react-redux";
import {
  changeTab,
  changeTaskFilter,
} from "../../features/settings/settingsSlice";
import CreateTaskModal from "./all-tasks/CreateTaskModal";
import HorizontalLine from "../ui/HorizontalLine";
import { useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { AiFillFilter } from "react-icons/ai";

const TaskboardHeader = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    tabs: { allTabs, currentTab },
  } = useSelector((state) => state.settings);
  const { filterBy } = useSelector((state) => state.settings);

  console.log(filterBy);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    dispatch(changeTaskFilter(filter));
  };

  return (
    <div className="flex mt-8 flex-col">
      <div className="flex justify-between">
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
          {currentTab == "All Tasks" && (
            <div>
              <label htmlFor="filterby" className="flex items-center">
                <AiFillFilter /> <span>Filter</span>
                <select
                  name="priority"
                  id="priority"
                  onChange={(e) => handleFilterChange(e)}
                  className="border ml-2 border-gray-300  rounded-md focus:outline-none text-sm  bg-zinc-100"
                >
                  {["All", "Pending", "In Progress", "Completed"].map((op) => {
                    return (
                      <option key={op} selected={op == filterBy} value={op}>
                        {op}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          )}

          {/* show modal to create new task */}
          {showModal && (
            <CreateTaskModal handleClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
      <HorizontalLine />
      {currentTab == "All Tasks" && (
        <button
          onClick={() => setShowModal(true)}
          className="text-black self-end mt-2 mb-1 font-semibold flex items-center  rounded-full text-center"
        >
          <span>
            <BsPlusSquare className="text-4xl bg-white p-1 rounded-md" />
          </span>{" "}
        </button>
      )}
    </div>
  );
};

export default TaskboardHeader;
