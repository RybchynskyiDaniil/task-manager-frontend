interface TaskCardProp {
  _id: string;
  title: string;
  status: "pending" | "inProgress" | "completed";
  onDelete: (id: string) => void;
  onUpdate: (id: string, status: string) => void;
}

export default function TaskCard({
  _id,
  title,
  status,
  onDelete,
  onUpdate,
}: TaskCardProp) {
  const getNextStatus = (current: string) => {
    if (current === "pending") return "inProgress";
    if (current === "inProgress") return "completed";
    return "completed";
  };
  return (
    <div>
      <div>
        <p>{title}</p>
        <span>{status}</span>
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
