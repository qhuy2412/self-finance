import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/api/auth/me");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  const login = async (email,password) => {
    try {
      const res = await api.post("/api/auth/login",{email,password});
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
        throw error;
    }
  };
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      throw error;
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};