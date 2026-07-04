import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import css from "./Header.module.css";

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate("/login");
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className={css.header}>
      <div className={css.logo}>My Space</div>
      <div className={css.rightSide}>
        <button onClick={() => navigate("/tasks")} className={css.navBtn}>
          Tasks
        </button>
        <button onClick={handleLogout} className={css.logoutBtn}>
          Logout
        </button>
      </div>

      {isLoading && <p className={css.statusMessage}>Loading...</p>}
      {isError && <p className={css.statusError}>something went wrong</p>}
    </header>
  );
}
