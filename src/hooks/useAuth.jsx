import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("authToken");
    const u = localStorage.getItem("authUser");
    if (t && u) {
      setUser(JSON.parse(u));
    }
    setLoading(false);
  }, []);

  const login = async (cred) => {
    try {
      const { data: resp } = await authService.login(cred);
      const { token, user: u } = resp.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(u));
      setUser(u);
      return { success: true };
    } catch (e) {
      return {
        success: false,
        error: e.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isStudent: user?.role === "student",
  };

  // ✅ NO ROUTER HERE – just the context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
};
