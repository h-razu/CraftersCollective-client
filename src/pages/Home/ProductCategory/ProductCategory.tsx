import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import homeDecor from "../../../assets/images/home_decor.jpg";
import fashionAccessories from "../../../assets/images/fashion_accessories.jpg";
import art from "../../../assets/images/art.jpg";
import papersGood from "../../../assets/images/papers_good.jpg";
import pottery from "../../../assets/images/pottery.jpg";
import bag from "../../../assets/images/bags.png";
import toast from "react-hot-toast";

type ProductCategoryType = {
  name: string;
  imageUrl: string;
};

const productsCategory: ProductCategoryType[] = [
  {
    name: "Home Decor",
    imageUrl: homeDecor,
  },
  {
    name: "Fashion and Accessories",
    imageUrl: fashionAccessories,
  },
  {
    name: "Art Prints",
    imageUrl: art,
  },
  {
    name: "Paper Goods",
    imageUrl: papersGood,
  },
  {
    name: "Pottery",
    imageUrl: pottery,
  },
  {
    name: "Bags",
    imageUrl: bag,
  },
];

const ProductCategory = () => {
  return (
    <Stack alignItems="center" spacing={1}>
      <Stack alignItems="center">
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontSize: { xs: "25px", xl: "40px" },
            fontWeight: 600,
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Shop for Exquisite Handmade Creations
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: { xs: "16px", md: "20x", xl: "25px" },
            width: { xs: "100%", md: "70%" },
            fontWeight: 500,
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Find a treasure trove of unique artisanal and handcrafted items, from
          home decor and fashion accessories to artwork, at CraftersCollective.
        </Typography>
      </Stack>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {productsCategory.map((product, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper
              elevation={3}
              sx={{
                padding: 1,
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => toast.success(product.name)}
            >
              <Box
                sx={{
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.01)",
                  },
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width="100%"
                  height="300px"
                  style={{
                    objectFit: "cover",
                    filter: "brightness(75%)",
                  }}
                />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: "18px", sm: "25px", md: "30px", xl: "35px" },
                  fontWeight: 600,
                  position: "absolute",
                  bottom: 10,
                  left: 15,
                  color: "#fff",
                }}
              >
                {product.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ProductCategory;
