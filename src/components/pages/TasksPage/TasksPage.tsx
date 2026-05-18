import { deleteTask, fetchTasks } from "../../../services/taskService";
import TaskForm from "../../TaskForm/TaskForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../../services/taskService";

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

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <>
      <TaskForm onSubmit={handleCreateTask} />
      <ul>
        {tasks?.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
