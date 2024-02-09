import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Product",
    link: "/product",
  },
  {
    name: "About",
    link: "/product",
  },
];

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const pathname = useLocation();
  return (
    <AppBar
      sx={{
        padding: 1,
        backgroundColor: "#FFFFFF",
        marginBottom: 2,
      }}
      position="sticky"
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "row-reverse", sm: "row" },
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <MenuIcon sx={{ fontSize: "35px", color: "black" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              // keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => setAnchorEl(null)}>
                  <NavLink
                    to={page.link}
                    style={{
                      textDecoration: "none",
                      fontSize: "25px",
                      fontWeight: 600,
                      color:
                        String(pathname.pathname) === page.link
                          ? "#27374d"
                          : "#808080",
                    }}
                  >
                    {page.name}
                  </NavLink>
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => setAnchorEl(null)}
                sx={{
                  display: {
                    xs: "flex",
                    sm: "none",
                  },
                }}
              >
                <NavLink
                  to="/login"
                  style={{
                    textDecoration: "none",
                    fontSize: "25px",
                    fontWeight: 600,
                    color:
                      String(pathname.pathname) === "/login"
                        ? "#27374d"
                        : "#808080",
                  }}
                >
                  Join | Login
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
          <IconButton disableRipple>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  fontWeight: 600,
                  fontFamily: "Redressed",
                  fontSize: 40,
                }}
              >
                CraftersCollective
              </Typography>
            </Link>
          </IconButton>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
            }}
          >
            {pages.map((page, idx) => (
              <NavLink
                key={idx}
                to={page.link}
                style={{
                  textDecoration: "none",
                  fontSize: "25px",
                  fontWeight: 600,
                  marginRight: 15,
                  color:
                    String(pathname.pathname) === page.link
                      ? "#27374d"
                      : "#808080",
                }}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <NavLink
              to="/login"
              style={{
                textDecoration: "none",
                fontSize: "25px",
                fontWeight: 600,
                marginRight: 15,
                color:
                  String(pathname.pathname) === "/login"
                    ? "#27374d"
                    : "#808080",
              }}
            >
              Join | Login
            </NavLink>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
