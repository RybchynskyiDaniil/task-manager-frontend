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
    <form action={handleSubmit}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Create Account</button>
    </form>
  );
}
