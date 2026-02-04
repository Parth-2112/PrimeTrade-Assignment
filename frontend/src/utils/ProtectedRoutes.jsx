import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error("Log in to access this page");
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return <Loader/>; 
  }

  if (!isAuthenticated) {
    return (
        <Navigate to="/login" replace />
    )
  }
  return children;
};

export default ProtectedRoutes;
