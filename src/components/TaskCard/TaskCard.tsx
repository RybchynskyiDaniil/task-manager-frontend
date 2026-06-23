interface TaskCardProp {
  _id: string;
  title: string;
  status: "pending" | "inProgress" | "completed";
  dueDate?: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, status: string) => void;
}

export default function TaskCard({
  _id,
  title,
  status,
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
  return (
    <div>
      <div>
        <p>{title}</p>
        <span>{status}</span>
        {formattedDate && <p>Due: {formattedDate}</p>}
        {status !== "completed" && (
          <button onClick={() => onUpdate(_id, getNextStatus(status))}>
            Next status
          </button>
        )}
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
}
