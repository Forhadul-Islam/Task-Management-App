import { TiEdit } from "react-icons/ti";
import { useSelector } from "react-redux";
import HorizontalLine from "../ui/HorizontalLine";

const Task = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-5/6 min-h-[150px] mx-auto  my-4 bg-white rounded-md px-5 py-4 hover:shadow-md">
      {/* header section */}
      <div className="flex gap-2 items-center">
        <img
          className="h-8 w-8 rounded-full"
          src={user?.image}
          alt={user?.username}
        />
        <span>{user?.username}</span>
      </div>
      <HorizontalLine />
      <div className="flex justify-between">
        <div>
          <div className="text-md">title</div>
        </div>
        <div className="flex items-center">
          <select
            className="bg-orange-200 text-gray-800  border border-orange-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  "
            name="status"
            id="status"
          >
            {["Pending", "In Progress", "Completed"].map((option) => (
              <option
                key={option}
                value={option}
                className=" text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
              >
                {option}
              </option>
            ))}
          </select>
          {/* <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
            In Progress
          </span> */}
          <span className="text-2xl">
            <TiEdit className="text-slate-800 cursor-pointer hover:text-blue-700 transition-all" />
          </span>
        </div>
      </div>
      {/* descriptioin section */}
      <div className="text-gray-700 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, eum.
        Soluta ut a obcaecati aliquam laboriosam! Expedita accusamus iusto
        neque. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Nostrum, ea?
      </div>

      {/* task assignedTo section */}
      <div className="mt-5 flex flex-col items-end">
        <span className="italic font-semibold">Assigned Members</span>
        <div className="flex mb-5 -space-x-4">
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://res.cloudinary.com/dp5qtjcqj/image/upload/v1693640404/ohjooyldkudb1dcsnuvb.jpg"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://res.cloudinary.com/dp5qtjcqj/image/upload/v1693640404/ohjooyldkudb1dcsnuvb.jpg"
            alt=""
          />
          <img
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://res.cloudinary.com/dp5qtjcqj/image/upload/v1693640404/ohjooyldkudb1dcsnuvb.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
