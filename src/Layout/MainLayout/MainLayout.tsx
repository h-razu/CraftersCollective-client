import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <Stack>
      <Header />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
};

export default MainLayout;
