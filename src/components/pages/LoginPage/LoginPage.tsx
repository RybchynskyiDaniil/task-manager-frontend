import LoginForm from "../../LoginForm/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      await login(email, password);
      navigate("/tasks");
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <LoginForm onSubmit={handleLogin} />
      <button
        className={css.secondaryButton}
        onClick={() => navigate("/register")}
      >
        Create Account
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Invalid email or password</p>}
    </>
  );
}
