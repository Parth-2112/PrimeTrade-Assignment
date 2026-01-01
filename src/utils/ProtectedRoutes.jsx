import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {

    return (
      <>
        {toast.error("LogIn to access it")}
        <Navigate to="/login" replace />;
      </>
    )
  }
  return children;
};

export default ProtectedRoutes;
