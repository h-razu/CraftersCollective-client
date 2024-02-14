import { Box, Button, Stack, Typography } from "@mui/material";
import heroImage from "../../../assets/images/hero.png";

const Hero = () => {
  return (
    <Stack
      sx={{
        position: "relative",
      }}
    >
      <img
        src={heroImage}
        alt="hero-"
        width="100%"
        height="400px"
        style={{
          objectFit: "cover",
          filter: "brightness(50%)",
          borderRadius: "8px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "20%",
          rowGap: { xs: 1, sm: 2, xl: 3 },
          overflowY: "hidden",
        }}
      >
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: { xs: "25px", md: "30px", xl: "50px" },
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Crafted to Inspire, Made to Last
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "14px", sm: "18px", xl: "25px" },
            color: "#eaf4fc",
            textAlign: "center",
            width: { xs: "100%", sm: "90%", md: "75%" },
          }}
        >
          CraftersCollective curates a collection of artisanal treasures, each
          crafted with dedication and care. Elevate your living space and
          wardrobe with our handpicked selection of home decor, fashion, and
          accessories, knowing that every purchase supports the artisans behind
          these timeless creations.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          sx={{
            color: "#f8f8ff",
            borderColor: "#ecf3f9",
            transition: "all 0.5s ease-in",
            transformOrigin: "bottom left",
            "&:hover": {
              backgroundColor: "#ecf3f9",
              color: "#888BA8",
            },
          }}
        >
          Explore Our Products
        </Button>
      </Box>
    </Stack>
  );
};

export default Hero;
