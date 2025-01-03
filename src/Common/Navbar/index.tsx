import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AccountCircle } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: "Home", path: "/" },
  { name: "Restaurants", path: "/provider" },
  { name: "Register vendor", path: "/register" },
];

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TiffinMate
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <NavLink
              to={item.path}
              end={item.path === "/"}
              style={{
                textDecoration: "none",
                color: location.pathname === item.path ? "#FF9431" : "black",
              }}
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const isLoggined = localStorage.getItem("id");

  return (
    <Box>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          bgcolor: "white",
          px: { xs: 1, sm: 2, md: 4 },
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: { xs: "56px", sm: "64px" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 1,
                display: { sm: "none" },
                color: "black",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "#FF9431",
                fontFamily: "Playfair Display, serif",
                fontSize: {
                  xs: "1.25rem",
                  sm: "1.5rem",
                  md: "2rem",
                },
              }}
            >
              TiffinMate
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" }, px: 4 }}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/"}
                    style={{
                      textDecoration: "none",
                      color:
                        location.pathname === item.path ? "white" : "black",
                      backgroundColor:
                        location.pathname === item.path
                          ? "#FF9431"
                          : "transparent",
                      fontWeight: "bold",
                      borderRadius: "20px",
                      padding: "8px 16px",
                      marginRight: "10px",
                      display: "inline-block",
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </Box>
            </Box>
            <Box>
              <IconButton
                onClick={() => {
                  if (isLoggined) {
                    navigate("/profile");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <AccountCircle fontSize="large" sx={{ color: "black" }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
