import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children, rolesPermitidos }) => {
  
  const { user, loading } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default RutasProtegidas;