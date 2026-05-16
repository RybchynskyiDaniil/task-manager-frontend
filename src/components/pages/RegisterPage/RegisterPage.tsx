import RegisterForm from "../../RegisterForm/RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/authService";

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
      <RegisterForm onSubmit={handleRegister} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>fails to meet the requirements</p>}
    </>
  );
}
