import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import TasksPage from "../pages/TasksPage/TasksPage";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
