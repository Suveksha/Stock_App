import { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Typography } from "@mui/material";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    api.post("/user/logout");
    dispatch(logout());
    navigate("/");
  };

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    console.log("USER", user);
  });
  return (
    <div className="bg-white cursor-default text-[#06402B]">
      <div className="flex w-full justify-between p-3 sm:hidden">
        <div>Logo</div>
        <div>Menu</div>
      </div>

      <div className="hidden sm:flex justify-between border-b border-b-gray-100 w-full p-5 font-semibold">
        <div className="flex justify-between w-[35%]">
          <Typography
            onClick={() => user && navigate("/feed")}
            sx={{
              "&:hover": { color: "#0cba7a" },
              fontWeight: 500,
            }}
          >
            Dashboard
          </Typography>

          <Typography
            onClick={() => user && navigate("/stock/all")}
            sx={{
              "&:hover": { color: "#0cba7a" },
              fontWeight: 500,
            }}
          >
            Stocks
          </Typography>

          <Typography
            onClick={() => user && navigate("/user/wallet")}
            sx={{
              "&:hover": { color: "#0cba7a" },
              fontWeight: 500,
            }}
          >
            Wallet
          </Typography>

          <Typography
            onClick={() => user && navigate("/user/orders")}
            sx={{
              "&:hover": { color: "#0cba7a" },
              fontWeight: 500,
            }}
          >
            Orders
          </Typography>
        </div>
        <Typography
          onClick={handleLogout}
          sx={{
            "&:hover": { color: "red" },
            fontWeight: 500,
          }}
        >
          Logout
        </Typography>
        {/* <div>
          
          {!user ? (
            <div onClick={handleOpen}>
              Login/Sign up
            </div>
          ) : (
            
          )}
        </div> */}
      </div>
      <Login open={open} handleClose={handleClose} />
    </div>
  );
}
