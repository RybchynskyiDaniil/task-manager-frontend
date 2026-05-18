import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../../services/taskService";

export default function TasksPage() {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Something went wrong</p>;
  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task._id}>{task.title}</li>
      ))}
    </ul>
  );
}
