import { refresh } from "../../services/authService";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProp {
  children: React.ReactNode;
}
export const PrivateRoute = ({ children }: PrivateRouteProp) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    async function checkAuth() {
      try {
        await refresh();
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
