import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface NavItem {
  label: string;
  path: string;
}

interface MainNavBarProps {
  role: "user" | "admin";
  menuItems: NavItem[];
  onLogout?: () => void;
  brand?: string;
}

export default function MainNavBar({
  role,
  menuItems,
  onLogout,
  brand = "nVestGuru",
}: MainNavBarProps) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => setDrawerOpen(open);

  return (
    <div className="bg-white shadow-sm text-[#06402B]">
      {/* Mobile Header */}
      <div className="flex justify-between items-center px-4 py-3 sm:hidden">
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, cursor: "pointer", fontFamily: "cursive" }}
          onClick={() => navigate("/")}
        >
          {brand}
        </Typography>
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon sx={{ color: "#06402B" }} />
        </IconButton>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:flex justify-between items-center border-b border-gray-200 px-8 py-4">
        <div className="flex gap-8">
          {menuItems.map((item) => (
            <Typography
              key={item.label}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { color: "#0cba7a" },
                transition: "color 0.2s ease",
              }}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Typography>
          ))}
        </div>

        {onLogout && (
          <Typography
            onClick={onLogout}
            sx={{
              cursor: "pointer",
              fontWeight: 500,
              "&:hover": { color: "red" },
              transition: "color 0.2s ease",
            }}
          >
            Logout
          </Typography>
        )}
      </div>

      {/* Drawer for Mobile */}
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
              {role === "admin" ? "Admin Menu" : "Menu"}
            </Typography>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => {
                  navigate(item.path);
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
            {onLogout && (
              <ListItem onClick={onLogout}>
                <ListItemText
                  primary={
                    <Typography sx={{ color: "red", fontWeight: 500 }}>
                      Logout
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
