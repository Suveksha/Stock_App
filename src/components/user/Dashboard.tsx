import { Button } from "@mui/material";
import LoginDialog from "./Login";
import { useState } from "react";
import { motion } from "framer-motion";
import "../../css/BackgroundEffect.css";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonStyle = {
    background: "linear-gradient(135deg, #06402B 0%, #0a6b45 100%)",
    color: "white",
    width: { xs: "170px", sm: "210px" },
    height: { xs: "48px", sm: "54px" },
    borderRadius: "14px",
    textTransform: "none",
    fontSize: { xs: "1rem", sm: "1.1rem" },
    fontWeight: 600,
    letterSpacing: "0.5px",
    ":hover": {
      transform: "scale(1.07)",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.25)",
      background: "linear-gradient(135deg, #0a6b45 0%, #0d8b56 100%)",
    },
    transition: "all 0.25s ease",
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center backgroundEffect px-6">
      <LoginDialog open={open} handleClose={handleClose} />

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-200/40 blur-3xl rounded-full opacity-70 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-emerald-200/30 blur-3xl rounded-full opacity-70 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col justify-center items-center text-center gap-6 p-6 max-w-5xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-gray-900"
        >
          <span
            style={{
              background: "linear-gradient(90deg, #065f46, #10b981, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Make Informed Market Decisions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-700 text-lg sm:text-2xl font-medium max-w-2xl"
        >
          Empowering investors with real-time insights, analytics, and
          data-driven tools to grow confidently in India’s dynamic markets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button sx={buttonStyle} onClick={handleOpen}>
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
