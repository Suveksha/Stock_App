import { useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Typography,
  IconButton,
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = useSelector((state: any) => state.auth.user);

  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    api.post("/user/logout");
    dispatch(logout());
    navigate("/");
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    console.log("USER", user);
  }, [user]);

  const navItems = [
    { label: "Dashboard", path: "/feed" },
    { label: "Stocks", path: "/stock/all" },
    { label: "Wallet", path: "/user/wallet" },
    { label: "Orders", path: "/user/orders" },
  ];

  return (
    <div className="bg-white shadow-sm text-[#06402B]">
      <div className="flex justify-between items-center px-4 py-3 sm:hidden">
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, cursor: "pointer", fontFamily: "cursive" }}
          onClick={() => navigate("/")}
        >
          nVestGuru
        </Typography>

        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon sx={{ color: "#06402B" }} />
        </IconButton>
      </div>

      <div className="hidden sm:flex justify-between items-center border-b border-gray-200 px-8 py-4">
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Typography
              key={item.label}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { color: "#0cba7a" },
                transition: "color 0.2s ease",
              }}
              onClick={() => user && navigate(item.path)}
            >
              {item.label}
            </Typography>
          ))}
        </div>

        {/* Right section */}
        <Typography
          onClick={handleLogout}
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": { color: "red" },
            transition: "color 0.2s ease",
          }}
        >
          Logout
        </Typography>
      </div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 240,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Menu
            </Typography>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => {
                  if (user) navigate(item.path);
                  toggleDrawer(false);
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 500, color: "#06402B" }}>
                      {item.label}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem onClick={handleLogout}>
              <ListItemText
                primary={
                  <Typography sx={{ color: "red", fontWeight: 500 }}>
                    Logout
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Login open={open} handleClose={handleClose} />
    </div>
  );
}
