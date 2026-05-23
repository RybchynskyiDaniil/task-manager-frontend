import {
  deleteTask,
  fetchTasks,
  updateTask,
  createTask,
} from "../../../services/taskService";
import TaskForm from "../../TaskForm/TaskForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../../Header/Header";

export default function TasksPage() {
  const queryClient = useQueryClient();
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const mutation = useMutation({
    mutationFn: (title: string) => createTask({ title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const handleCreateTask = (title: string) => {
    mutation.mutate(title);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDeleteTask = (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateTask(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleUpdateTask = (id: string, status: string) => {
    updateMutation.mutate({ id, status });
  };

  const getNextStatus = (current: string) => {
    if (current === "pending") return "inProgress";
    if (current === "inProgress") return "completed";
    return "completed";
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <>
      <Header />
      <TaskForm onSubmit={handleCreateTask} />
      <ul>
        {tasks?.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
            {task.status !== "completed" && (
              <button
                onClick={() =>
                  handleUpdateTask(task._id, getNextStatus(task.status))
                }
              >
                Next status
              </button>
            )}
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
