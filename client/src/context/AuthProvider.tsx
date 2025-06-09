import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as reqTypes from "../../../src/types/Requests";
import * as resTypes from "../../../src/types/Responses";

interface AuthContextType {
  token: string | null;
  userId: number | null;
  setToken: (token: string | null) => void;
  setUserId: (id: number | null) => void;
  loginFunction: (data: reqTypes.LoginRequest) => Promise<void>;
  logoutFunction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const loginFunction = async (data: reqTypes.LoginRequest) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.error || "Login failed");
      }

      const res: resTypes.LoginResponse = await response.json();

      setUserId(res.userId);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logoutFunction = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        setToken,
        setUserId,
        loginFunction,
        logoutFunction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
