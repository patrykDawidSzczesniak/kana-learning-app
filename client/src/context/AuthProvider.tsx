import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as resTypes from "../../../src/types/Responses";
import toast from "react-hot-toast";

interface AuthContextType {
  token: string | null;
  userId: number | null;
  setToken: (token: string | null) => void;
  setUserId: (id: number | null) => void;
  loginFunction: (data: { email: string; password: string }) => Promise<void>;
  logoutFunction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const loginFunction = async (data: { email: string; password: string }) => {
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
      toast.success("Logged in successfully!")
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const logoutFunction = () => {
    setUserId(null);
    setToken(null);
    navigate("/login");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!")
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
