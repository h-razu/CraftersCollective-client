import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: "url(/images/404.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: { xs: "60%", md: "30%" },
          backgroundPosition: { xs: "center", md: "center top" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontSize: { xs: "40px", md: "50px" },
              fontWeight: 700,
              fontFamily: "Redressed",
              color: "#d32f2f",
              marginTop: { xs: 0, sm: 1, md: 4 },
              textAlign: "center",
            }}
          >
            nothing to see here!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              fontWeight: 500,
              color: "text.primary",
              textAlign: "center",
            }}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL.
          </Typography>
          <Button variant="outlined" size="large" onClick={() => navigate("/")}>
            Take me back to home page
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Error;
