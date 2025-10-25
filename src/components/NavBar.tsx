import { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    api.post("/user/logout");
    dispatch(logout());
    navigate("/");
  };

  const user = useSelector((state: any) => state.auth.user);

  useEffect(()=>{
    console.log("USER",user)
  })
  return (
    <div className="bg-gray-50 border-b-[2px] border-b-[#06402B]">
      <div className="flex w-full justify-between p-3 sm:hidden">
        <div>Logo</div>
        <div>Menu</div>
      </div>

      <div className="hidden sm:flex justify-between border-b border-b-gray-100 w-full p-5 font-semibold">
        <div className="flex justify-between w-[35%]">
          <div onClick={()=>user && navigate("/feed")}>Dashboard</div>
          <div onClick={()=>user && navigate("/stock/all")}>Stocks</div>
          <div onClick={()=>user && navigate("/user/wallet")}>Wallet</div>
          <div onClick={()=>user && navigate("/user/orders")}>Orders</div>
        </div>
        <div className="">
          
          {!user ? (
            <div className="cursor-pointer" onClick={handleOpen}>
              Login/Sign up
            </div>
          ) : (
            <div className="cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      </div>
      <Login open={open} handleClose={handleClose} />
    </div>
  );
}
