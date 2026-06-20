import css from "./TasksPage.module.css";
import TaskCard from "../../TaskCard/TaskCard";
import {
  deleteTask,
  fetchTasks,
  updateTask,
  createTask,
} from "../../../services/taskService";
import TaskForm from "../../TaskForm/TaskForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../../Header/Header";
import { HiMagnifyingGlass } from "react-icons/hi2";
import EmptyTasksIcon from "../../EmptyTasksIcon/EmptyTasksIcon";

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "pending" | "inProgress" | "completed"
  >("all");
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

  const filterTask = tasks
    ?.filter((task) => {
      if (filter === "all") return true;
      return task.status === filter;
    })
    .filter((task) => {
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <>
      <Header />
      <div className={css.searchBar}>
        <div className={css.searchWrapper}>
          <input
            type="text"
            placeholder="Search your Tasks here ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={css.searchInput}
          />
          <HiMagnifyingGlass className={css.searchIcon} />
        </div>
      </div>
      {isModalOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <div className={css.modalHeader}>
              <h2 className={css.modalTitle}>Create Task</h2>
              <button
                className={css.modalContentButton}
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <TaskForm
              onSubmit={(title) => {
                handleCreateTask(title);
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {tasks?.length === 0 ? (
        <div className={css.emptyState}>
          <div className={css.emptyIcon}>
            <EmptyTasksIcon />
          </div>
          <h2 className={css.emptyTitle}>No Tasks Yet</h2>
          <p className={css.emptySubTitle}>
            You have no tasks yet. Get productive. Create a Task Now.
          </p>
          <button
            className={css.emptyCreateButton}
            onClick={() => setIsModalOpen(true)}
          >
            Create a Task
          </button>
        </div>
      ) : (
        <>
          <div className={css.headerRow}>
            <div>
              <h2>Tasks</h2>
              <p>Your tasks in your space.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)}>Create Task</button>
          </div>

          <div className={css.filtersRow}>
            {(["all", "pending", "inProgress", "completed"] as const).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={filter === f ? css.filterActive : css.filterBtn}
                >
                  {f === "all" && `All Tasks ${tasks?.length}`}
                  {f === "pending" &&
                    `Pending ${tasks?.filter((t) => t.status === "pending").length}`}
                  {f === "inProgress" &&
                    `In Progress ${tasks?.filter((t) => t.status === "inProgress").length}`}
                  {f === "completed" &&
                    `Completed ${tasks?.filter((t) => t.status === "completed").length}`}
                </button>
              ),
            )}
          </div>

          <div className={css.cardsContainer}>
            {filterTask?.map((task) => (
              <TaskCard
                key={task._id}
                _id={task._id}
                title={task.title}
                status={task.status}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
