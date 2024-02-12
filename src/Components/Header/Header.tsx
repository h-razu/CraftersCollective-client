import {
  AppBar,
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
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
    path: "/product",
  },
  {
    name: "Join | Login",
    path: "/login",
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

  const pathname = useLocation();

  const menuItems = (
    <React.Fragment>
      {pages.map((page, index) => (
        <NavLink
          to={page.path}
          style={{
            textDecoration: "none",
            color: String(pathname.pathname) === page.path ? "#000" : "#979BA1",
          }}
        >
          <MenuItem
            disableRipple
            key={index}
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
            flexDirection: { xs: "row-reverse", sm: "row" },
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
              width: "40%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {menuItems}
          </Box>
          <IconButton
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <ShoppingCartOutlinedIcon
              color="primary"
              sx={{ fontSize: { xs: "25px", md: "35px" } }}
            />
          </IconButton>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
