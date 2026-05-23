import css from "./LoginForm.module.css";

interface LoginFormProp {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProp) {
  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onSubmit(email, password);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <h2 className={css.title}>Welcome Back.</h2>
      <div>
        <label className={css.label}>Email Address</label>
        <input
          className={css.input}
          type="email"
          name="email"
          placeholder="example@gmail.com"
        />
      </div>
      <div>
        <label className={css.label}>Enter Your Password</label>
        <input className={css.input} type="password" name="password" />
      </div>
      <button className={css.button} type="submit">
        Log in
      </button>
    </form>
  );
}
