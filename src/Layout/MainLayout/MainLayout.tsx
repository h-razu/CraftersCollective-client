import { Container, Fab, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { green } from "@mui/material/colors";

const MainLayout = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="xl" sx={{ marginBottom: 5 }}>
        <Fab
          aria-label="add"
          sx={{
            position: "fixed",
            margin: "0px",
            top: "auto",
            right: 30,
            bottom: 30,
            left: "auto",
            color: "common.white",
            bgcolor: green[500],
            "&:hover": {
              bgcolor: green[600],
            },
          }}
          onClick={() => alert("Click Cart Icon")}
        >
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: { xs: "25px", md: "35px" } }}
          />
        </Fab>
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
};

export default MainLayout;
