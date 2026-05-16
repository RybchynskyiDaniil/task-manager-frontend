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
    <form action={handleSubmit}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
