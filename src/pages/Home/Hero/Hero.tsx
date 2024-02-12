import { Box, Button, Stack, Typography } from "@mui/material";
import heroImage from "../../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <Box>
        <img
          src={heroImage}
          alt="hero-area-img"
          width="100%"
          style={{
            borderRadius: "25px",
            objectFit: "contain",
            opacity: "0.9",
          }}
        />
      </Box>
      <Stack
        spacing={3}
        sx={{
          backgroundImage: "url(/images/quote.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          backgroundSize: {
            xs: 0,
            sm: "25px",
            md: "40px",
            lg: "50px",
            xl: "90px",
          },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: { xs: "30px", md: "30px", xl: "50px" },
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Crafted to Inspire, Made to Last
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "16px", sm: "20px", xl: "22px" },
            color: "text.secondary",
            textAlign: "justify",
          }}
        >
          CraftersCollective curates a collection of artisanal treasures, each
          crafted with dedication and care. Elevate your living space and
          wardrobe with our handpicked selection of home decor, fashion, and
          accessories, knowing that every purchase supports the artisans behind
          these timeless creations
        </Typography>
        <Button variant="outlined" size="large">
          Explore Our Products{" "}
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;