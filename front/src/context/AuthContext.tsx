import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { useNavigate } from "react-router-dom";

interface Auth {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextProps {
  auth: Auth;
  login: (token: string, personId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  auth: { isAuthenticated: false, isLoading: true },
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/");
    }
  }, []);

  const login = (token: string, personId: string) => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/authenticate");
  };

  const auth = { isAuthenticated, isLoading };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
