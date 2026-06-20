import css from "./TaskForm.module.css";

export interface TaskFormProp {
  onSubmit: (title: string) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProp) {
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    onSubmit(title);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="title"
        placeholder="Task Name"
      />
      <button className={css.button} type="submit">
        Create Task
      </button>
    </form>
  );
}
