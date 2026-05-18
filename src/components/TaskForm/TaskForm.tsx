export interface TaskFormProp {
  onSubmit: (title: string) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProp) {
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    onSubmit(title);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="title" />
      <button type="submit">create task</button>
    </form>
  );
}
