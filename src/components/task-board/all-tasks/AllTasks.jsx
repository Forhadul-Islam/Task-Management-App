import { useDispatch, useSelector } from "react-redux";
import Task from "../Task";
import { useEffect, useState } from "react";
import { getTasks } from "../../../API/api";
import { loadTasks } from "../../../features/tasks/tasksSlice";

const AllTasks = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTask, setFilteredTask] = useState([]);
  const { user } = useSelector((state) => state.auth);
  // const {allUsers} = useSelector((state) => state.users);
  const { allTasks } = useSelector((state) => state.tasks);
  const { filterBy } = useSelector((state) => state.settings);

  useEffect(() => {
    setIsLoading(true);
    getTasks().then((tasks) => {
      const userTasks = tasks.filter((t) => {
        //condition: user must be a creator or be in assignedTo array
        const filteringCondition =
          t?.creator?.id == user?.id ||
          t?.assignedTo.map((i) => i.id).includes(user?.id);
        //Check the condition
        if (filteringCondition) return true;
      });
      dispatch(loadTasks(userTasks));
      setIsLoading(false);
    });
  }, [user, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    const filterd = allTasks?.filter((task) => {
      console.log(filterBy);
      if (filterBy == "All") {
        return true;
      }
      return task.status == filterBy;
    });
    setFilteredTask(filterd);
    setIsLoading(false);
  }, [filterBy, dispatch, allTasks]);

  if (isLoading) return <div>Loading...</div>;
  if (filteredTask?.length == 0) return <div>No Task available!</div>;

  return (
    <div className="flex flex-col bg-gray-200/50 m-3 rounded-md">
      {filteredTask?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default AllTasks;
