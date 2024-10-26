import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Button,
  Badge,
  Avatar,
  Typography,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { authStore, logout } from "../stores/authStore";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const { isAuthenticated, user } = useStore(authStore);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          {/* Enlaces de navegación principales */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button component={Link} to="/" color="inherit">
                  Dashboard
                </Button>
                <Button component={Link} to="/settings" color="inherit">
                  Settings
                </Button>
                <Button component={Link} to="/analysisGraph" color="inherit">
                  Analysis Graphs
                </Button>

                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </>
            )}
          </Box>

          {/* Icono de notificaciones y avatar del usuario */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit">
              <Badge color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {isAuthenticated && user ? (
              <Tooltip title={user.email}>
                <Avatar alt={user.email} src={user.avatarUrl} />
              </Tooltip>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para navegación móvil */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Navigation
          </Typography>
          {isAuthenticated ? (
            <>
              <Button component={Link} to="/" color="inherit" fullWidth>
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/transactions"
                color="inherit"
                fullWidth
              >
                Transactions
              </Button>
              <Button component={Link} to="/settings" color="inherit" fullWidth>
                Settings
              </Button>
              <Button color="inherit" fullWidth onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit" fullWidth>
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit" fullWidth>
                Register
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
