import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

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
    <>
      <button onClick={handleLogout}>Logout</button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>something went wrong</p>}
    </>
  );
}
