import css from "./TaskForm.module.css";

export interface TaskFormValues {
  title: string;
  priority: string;
  description: string;
  dueDate: string;
}

export interface TaskFormProp {
  onSubmit: (values: TaskFormValues) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProp) {
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const priority = formData.get("priority") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    onSubmit({ title, priority, description, dueDate });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.label}>Task Name</label>
      <input className={css.input} type="text" name="title" />

      <div className={css.row}>
        <div className={css.field}>
          <label className={css.label}>Task Priority</label>
          <select className={css.select} name="priority" defaultValue="low">
            <option value="low">Less important</option>
            <option value="medium">Medium</option>
            <option value="high">Important</option>
          </select>
        </div>
      </div>

      <div className={css.field}>
        <label className={css.label}>Due Date</label>
        <input className={css.input} type="date" name="dueDate" />
      </div>

      <label className={css.label}>Task Description</label>
      <textarea
        className={css.textarea}
        name="description"
        placeholder="Type your content here...."
        rows={4}
      />

      <button className={css.button} type="submit">
        Create Task
      </button>
    </form>
  );
}
