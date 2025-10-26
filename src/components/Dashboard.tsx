import { Button } from "@mui/material";
import LoginDialog from "./Login";
import { useState } from "react";
import "../css/BackgroundEffect.css";

export default function Dashboard() {
  const buttonStyle = {
    backgroundColor: "#06402B",
    color: "white",
    width:"200px",
    height:"50px",
    textTransform:"none",
    ":focus": { outline: "none" },
    ":hover": { transform: "scale(1.1)", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
    cursor:"pointer",
    fontSize:"1.2rem",
    fontWeight:"550"
  };

  const [open, setOpen] = useState(false);
  const handleOpen=()=>setOpen(true);
  const handleClose=()=>setOpen(false);

  return (
    <div className="">
      <LoginDialog open={open} handleClose={handleClose} />
      <div className="flex flex-col justify-center items-center p-10 whitespace-nowrap backgroundEffect">
        <div className="text-2xl font-bold text-gray-500 sm:text-7xl p-2 bg-white shadow-md">
          Make Informed Market Decisions
        </div>
        <div className="font-bold sm:text-5xl p-5">Built for Growing India</div>
        <Button sx={buttonStyle} onClick={handleOpen}>Get Started</Button>
      </div>
    </div>
  );
}
