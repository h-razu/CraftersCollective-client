import { Stack } from "@mui/material";
import useTitle from "../../Hooks/useTitle/useTitle";
import Hero from "./Hero/Hero";
import Features from "./Features/Features";

const Home = () => {
  useTitle("Home");

  return (
    <Stack spacing={12}>
      <Hero />
      <Features />
    </Stack>
  );
};

export default Home;
