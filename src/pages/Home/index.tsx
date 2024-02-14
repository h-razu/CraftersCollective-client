import { Stack } from "@mui/material";
import useTitle from "../../Hooks/useTitle/useTitle";
import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import ProductCategory from "./ProductCategory/ProductCategory";

const Home = () => {
  useTitle("Home");

  return (
    <Stack spacing={15}>
      <Hero />
      <ProductCategory />
      <Features />
    </Stack>
  );
};

export default Home;
