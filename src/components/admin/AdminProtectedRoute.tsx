import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, type JSX } from "react";

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    console.log("ADMIN USER", user);
  });
  const user = useSelector((state: any) => state.auth.user);

  if (!user) return <Navigate to="/" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default AdminProtectedRoute;
