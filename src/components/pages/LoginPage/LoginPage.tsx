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
      <div className={css.container}>
        <div className={css.leftPanel}>
          <LoginForm onSubmit={handleLogin} />
        </div>

        <div className={css.rightWrapper}>
          <div className={css.rightPanel}>
            <button
              className={css.secondaryButton}
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
            <div className={css.rightCenter}>
              <h2 className={css.leftPanelTitle}>
                Take your productivity to the next level.
              </h2>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <p className={css.statusMessage}>Loading...</p>}
      {isError && <p className={css.statusError}>Invalid email or password</p>}
    </>
  );
}
