import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    console.log("Protected Route", user);
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
