import { Routes as ReactRoutes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Authenticate } from "../pages/Authenticate/Authenticate";
import { Events } from "../pages/Event/Events";

function AppRoutes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Events />} />
    </ReactRoutes>
  );
}

function AuthRoutes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Authenticate />} />
    </ReactRoutes>
  );
}

export function Routes() {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) return <AuthRoutes />;

  return <AppRoutes />;
}
