import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Paper
      variant="outlined"
      sx={{
        paddingY: { xs: 1, sm: 2, md: 3 },
        marginTop: 5,
        backgroundColor: "#f0fff0",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" justifyContent="center">
          <IconButton disableRipple onClick={() => navigate("/")}>
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
          </IconButton>
          <Box>
            <IconButton
              onClick={() =>
                window.open("//https://www.facebook.com/", "_blank")
              }
            >
              <FacebookIcon
                sx={{ fontSize: { xs: "25px", md: "35px" }, color: "primary" }}
              />
            </IconButton>
            <IconButton
              onClick={() =>
                window.open("//https://www.instagram.com/", "_blank")
              }
            >
              <InstagramIcon
                sx={{ fontSize: { xs: "25px", md: "35px" }, color: "primary" }}
              />
            </IconButton>
            <IconButton
              onClick={() =>
                window.open("//https://www.youtube.com/", "_blank")
              }
            >
              <YouTubeIcon
                sx={{ fontSize: { xs: "25px", md: "35px" }, color: "primary" }}
              />
            </IconButton>
          </Box>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <CopyrightOutlinedIcon fontSize="small" color="primary" />
            <Typography color="text.secondary">All rights reserved.</Typography>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
};

export default Footer;
