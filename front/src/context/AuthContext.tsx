import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { useNavigate } from "react-router-dom";
import * as UserService from "../api/user/user.service";
interface Auth {
  isAuthenticated: boolean;
}

interface AuthContextProps {
  auth: Auth;
  login: (token: string, personId: string) => Promise<UserService.User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const { token, user } = await UserService.login({
      email,
      password,
    });

    localStorage.setItem(`email`, user.email);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/");

    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(`email`);
    setIsAuthenticated(false);
    navigate("/");
  };

  const auth = useMemo(() => ({ isAuthenticated }), [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("You must use useAuth within a AuthProvider");
  }

  return context;
}
