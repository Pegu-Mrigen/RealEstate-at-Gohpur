import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import API_URL from "./../config";

const API_URL="https://real-estate-at-gohpur-server.vercel.app/api"

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token") || null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.message.includes("blocked")
        ) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`https://real-estate-at-gohpur-server.vercel.app/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;
      setToken(token);
      setUser(user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login Failed!",
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration Failed!",
      };
    }
  };
  const logout = async () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await axios.post(`${API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const updateUser = res.data.user;

        setUser(updateUser);

        const storage = localStorage.getItem("token")
          ? localStorage
          : sessionStorage;

        storage.setItem("user", JSON.stringify(updateUser));
      }
    } catch (error) {
      console.error("Failed to refresh user: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
