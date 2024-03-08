import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import profile from "../../assets/images/profile.png";
import { useAppSelector } from "../../app/hooks";
import auth from "../../firebase/firebase.config";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const pages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/product",
  },
  {
    name: "About",
    path: "/about",
  },
];

const beforeHoverStyle = {
  content: '""',
  position: "absolute",
  width: "70%",
  transform: "scaleX(0)",
  height: "2px",
  bottom: 5,
  left: "15%",
  backgroundColor: "#979BA1",
  // transformOrigin: "bottom right",
  transition: "transform 0.35s ease-out",
};
const afterHoverStyle = {
  transform: "scaleX(1)",
  // transformOrigin: "bottom left",
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorUserEl, setAnchorUserEl] = useState<null | HTMLElement>(null);

  const pathname = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Log Out Success");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const menuItems = (
    <React.Fragment>
      {pages.map((page, index) => (
        <NavLink
          key={index}
          to={page.path}
          style={{
            textDecoration: "none",
            color: String(pathname.pathname) === page.path ? "#000" : "#979BA1",
          }}
        >
          <MenuItem
            disableRipple
            onClick={() => setAnchorEl(null)}
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              fontWeight: 600,
              position: {
                xs: "static",
                md: "relative",
              },
              "&:hover": {
                backgroundColor: { md: "transparent" },
              },
              "&::after": { md: beforeHoverStyle },
              "&:hover::after": { md: afterHoverStyle },
            }}
          >
            {page.name}
          </MenuItem>
        </NavLink>
      ))}
    </React.Fragment>
  );

  const authItems = (
    <React.Fragment>
      {user.email ? (
        <>
          {user.accountType ? (
            <>
              <IconButton
                disableRipple
                onClick={(event) => setAnchorUserEl(event.currentTarget)}
              >
                <Avatar
                  alt="user_image"
                  src={user.profileImage ? user.profileImage : profile}
                  sx={{ width: { xs: 36, md: 56 }, height: { xs: 36, md: 56 } }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorUserEl}
                open={Boolean(anchorUserEl)}
                onClose={() => setAnchorUserEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem sx={{ fontWeight: 700 }}>{user.name}</MenuItem>
                <Divider />
                <MenuItem>
                  <Link to="/about">
                    <Button onClick={() => setAnchorUserEl(null)}>
                      Dashboard
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Button onClick={() => handleLogout()}>Log Out</Button>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#000",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  fontSize: { xs: "12px", md: "20px" },
                  fontWeight: 600,
                  borderRadius: 8,
                  backgroundColor: "#f0fff0",
                }}
              >
                Get Started
              </Button>
            </Link>
          )}
        </>
      ) : (
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "#000",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              fontSize: { xs: "16px", md: "20px" },
              fontWeight: 600,
              borderRadius: 8,
              paddingX: 3,
            }}
          >
            Login
          </Button>
        </Link>
      )}
    </React.Fragment>
  );

  return (
    <AppBar
      sx={{
        padding: 1,
        backgroundColor: "#FFF",
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
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <MenuIcon
                sx={{ fontSize: { xs: "25px", md: "35px" }, color: "primary" }}
              />
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
              {menuItems}
              <Divider sx={{ display: { xs: "block", sm: "none" } }} />
              <MenuItem>
                <Button
                  sx={{
                    display: {
                      xs: "flex",
                      sm: "none",
                    },
                    fontSize: "18px",
                  }}
                >
                  Go To Cart
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <IconButton disableRipple>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                color="text.primary"
                sx={{
                  fontWeight: 600,
                  fontFamily: "Redressed",
                  fontSize: {
                    xs: 25,
                    md: 35,
                  },
                }}
              >
                CraftersCollective
              </Typography>
            </NavLink>
          </IconButton>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              width: "auto",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {menuItems}
          </Box>
          {authItems}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
