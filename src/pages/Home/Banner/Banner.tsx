import { Box, Button, Stack, Typography } from "@mui/material";
import bannerImage from "../../../assets/images/banner.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ position: "relative" }}>
      <img
        src={bannerImage}
        alt="bannerImage"
        width="100%"
        height="400px"
        style={{
          objectFit: "cover",
          filter: "brightness(50%)",
          borderRadius: "5px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "absolute",
          top: { xs: "30%", md: "20%" },
          left: "5%",
          rowGap: { xs: 2, xl: 3 },
          overflowY: "hidden",
        }}
      >
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: { xs: "20px", md: "25px", xl: "40px" },
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Every purchase pays an artist.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "12px", sm: "16px", xl: "22px" },
            color: "#eaf4fc",
            width: { xs: "90%", md: "70%" },
            textAlign: "justify",
          }}
        >
          Empower creativity around the world. We are an open marketplace for
          independent artists and crafter to upload and enable their work on a
          wide array of art, home decor and more.
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
              border: "1px solid #888BA8",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/about")}
        >
          Learn More
        </Button>
      </Box>
    </Stack>
  );
};

export default Banner;
