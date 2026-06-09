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
  return (
    <div>
      <div>
        {_id}
        <p>{title}</p>
        <span>{status}</span>
        {status !== "completed" && (
          <button onClick={() => onUpdate(_id, status)}>Next status</button>
        )}
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
}
