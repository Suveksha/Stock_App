import { Button } from "@mui/material";
import LoginDialog from "./Login";
import { useState } from "react";

export default function Dashboard() {
  const buttonStyle = {
    backgroundColor: "#06402B",
    color: "white",
    textTransform:"none",
    ":focus": { outline: "none" },
    "@media (max-width: 425px)": {
      padding: "3px 4px 3px 4px",
      fontSize:"0.7rem;"
    },
  };

  const [open, setOpen] = useState(false);
  const handleOpen=()=>setOpen(true);
  const handleClose=()=>setOpen(false);

  return (
    <>
      <LoginDialog open={open} handleClose={handleClose} />
      <div className="flex flex-col justify-center items-center p-10 whitespace-nowrap">
        <div className="text-2xl font-bold text-gray-500 sm:text-7xl p-2">
          Make Informed Market Decisions
        </div>
        <div className="font-bold sm:text-5xl p-5">Built for Growing India</div>
        <Button sx={buttonStyle} onClick={handleOpen}>Get Started</Button>
        <div className="mt-8 w-[80%]">
        <img src="dashboard.jpeg" className="w-full h-[400px] opacity-90 rounded-2xl" alt="dashboard" />
        </div>
      </div>
    </>
  );
}
