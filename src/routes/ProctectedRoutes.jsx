import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProctectedRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
export default ProctectedRoutes;
