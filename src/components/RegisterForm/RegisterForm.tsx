import css from "./RegisterForm.module.css";

interface RegisterFormProp {
  onSubmit: (name: string, email: string, password: string) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProp) {
  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onSubmit(name, email, password);
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <button className={css.LoginButton} type="submit">
        Log in
      </button>
      <h2 className={css.title}>Create an Account</h2>
      <p className={css.underTitle}>It’s Simpe and Easy!!</p>
      <div className={css.container}>
        <label className={css.label}>Fullname</label>
        <input className={css.input} type="text" name="name" />
      </div>
      <div className={css.container}>
        <label className={css.label}>Email Address</label>
        <input className={css.input} type="email" name="email" />
      </div>
      <div className={css.container}>
        <label className={css.label}>Enter A Password</label>
        <input className={css.input} type="password" name="password" />
      </div>

      <button className={css.button} type="submit">
        Create Account
      </button>
    </form>
  );
}
