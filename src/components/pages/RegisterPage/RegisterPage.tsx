import RegisterForm from "../../RegisterForm/RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/authService";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      setIsLoading(true);
      setIsError(false);
      await register(username, email, password);
      navigate("/login");
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.leftPanelWrapper}>
          <div className={css.leftPanel}>
            <button
              className={css.loginButton}
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
            <div className={css.leftCenter}>
              <h2 className={css.leftPanelTitle}>
                Take your productivity to the next level.
              </h2>
            </div>
          </div>
        </div>

        <div className={css.rightPanel}>
          <RegisterForm onSubmit={handleRegister} />
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>fails to meet the requirements</p>}
    </>
  );
}
