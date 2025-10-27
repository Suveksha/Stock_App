import { Button } from "@mui/material";
import LoginDialog from "./Login";
import { useState } from "react";
import "../css/BackgroundEffect.css";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonStyle = {
    backgroundColor: "#06402B",
    color: "white",
    width: { xs: "160px", sm: "200px" },
    height: { xs: "45px", sm: "50px" },
    textTransform: "none",
    fontSize: { xs: "1rem", sm: "1.2rem" },
    fontWeight: "550",
    ":focus": { outline: "none" },
    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center backgroundEffect px-4">
      <LoginDialog open={open} handleClose={handleClose} />

      <div className="flex flex-col justify-center items-center text-center gap-6 p-6 max-w-4xl">
        <div className="text-gray-700 font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-white px-3 py-2 rounded-md shadow-md leading-tight">
          Make Informed Market Decisions
        </div>

        <div className="font-semibold text-2xl sm:text-4xl md:text-5xl text-gray-800">
          Built for Growing India
        </div>

        <Button sx={buttonStyle} onClick={handleOpen}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
