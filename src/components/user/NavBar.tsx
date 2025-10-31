import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import MainNavBar from "../reusable/MainNavBar";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    api.post("/user/logout");
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    console.log("USER", user);
  }, [user]);

  const userNavItems = [
    { label: "Dashboard", path: "/feed" },
    { label: "Stocks", path: "/stock/all" },
    { label: "Wallet", path: "/user/wallet" },
    { label: "Orders", path: "/user/orders" },
  ];

  const adminNavItems = [{ label: "Orders", path: "/admin/orders" }];

  return (
    <MainNavBar
      role={user.role}
      menuItems={user.role === "user" ? userNavItems : adminNavItems}
      onLogout={handleLogout}
    />
  );
}
