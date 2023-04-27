import "./styles/global.css";
import { Routes } from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}
