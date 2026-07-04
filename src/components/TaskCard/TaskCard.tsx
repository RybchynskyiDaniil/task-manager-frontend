import css from "./TaskCard.module.css";

interface TaskCardProp {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "inProgress" | "completed";
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, status: string) => void;
}

const priorityColors: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  low: { bg: "#eef1f8", text: "#5c6270", label: "Less important" },
  medium: { bg: "#fdeecb", text: "#8a6d00", label: "Medium" },
  high: { bg: "#fde2e2", text: "#c62828", label: "Important" },
};

const statusColors: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  pending: { bg: "#fff3cd", text: "#8a6d00", label: "Pending" },
  inProgress: { bg: "#dbe4ff", text: "#3754db", label: "In Progress" },
  completed: { bg: "#d9f7e8", text: "#00944f", label: "Completed" },
};

export default function TaskCard({
  _id,
  title,
  description,
  status,
  priority,
  dueDate,
  onDelete,
  onUpdate,
}: TaskCardProp) {
  const getNextStatus = (current: string) => {
    if (current === "pending") return "inProgress";
    if (current === "inProgress") return "completed";
    return "completed";
  };

  const formattedDate = dueDate
    ? new Date(dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const { bg, text, label } = statusColors[status];

  return (
    <div className={css.card}>
      <div className={css.topRow}>
        <span
          className={css.badge}
          style={{ backgroundColor: bg, color: text }}
        >
          {label}
        </span>
        {priority && priorityColors[priority] && (
          <span
            className={css.priorityBadge}
            style={{
              backgroundColor: priorityColors[priority].bg,
              color: priorityColors[priority].text,
            }}
          >
            {priorityColors[priority].label}
          </span>
        )}
      </div>

      <p className={css.title}>{title}</p>
      {description && <p className={css.description}>{description}</p>}
      {formattedDate && <p className={css.dueDate}>Due: {formattedDate}</p>}

      <div className={css.actions}>
        {status !== "completed" && (
          <button
            className={css.actionBtn}
            onClick={() => onUpdate(_id, getNextStatus(status))}
          >
            Next status
          </button>
        )}
        <button className={css.deleteBtn} onClick={() => onDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
