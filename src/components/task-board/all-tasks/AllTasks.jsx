import Task from "../Task";

const AllTasks = () => {
  return (
    <div className="flex flex-col bg-gray-200/50 m-3 rounded-md">
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );
};

export default AllTasks;
