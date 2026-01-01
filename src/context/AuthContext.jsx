import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { server } from "../main";


export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
  axios.get(`${server}/users/me`, { withCredentials: true })
    .then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
    })
    .catch(() => {
      setUser(null);
      setIsAuthenticated(false);
    })
    .finally(() => {
      setAuthLoading(false);
    });
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/users/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logout,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
