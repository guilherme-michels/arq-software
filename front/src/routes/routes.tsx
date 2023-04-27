import { Routes as ReactRoutes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Authenticate } from "../pages/Authenticate/Authenticate";
import { Events } from "../pages/Event/Events";
import { UserEvents } from "../pages/Event/UserEvents";

export function AppRoutes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Authenticate />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id/my-events" element={<UserEvents />} />
    </ReactRoutes>
  );
}

function AuthRoutes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Authenticate />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id/my-events" element={<UserEvents />} />
    </ReactRoutes>
  );
}

export function Routes() {
  const { auth } = useAuth();

  if (auth.isLoading) return <span>Carregando...</span>;
  if (!auth.isAuthenticated) return <AuthRoutes />;

  return <AppRoutes />;
}
