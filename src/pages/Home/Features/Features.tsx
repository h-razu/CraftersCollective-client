import { Box, Grid, Stack, Typography } from "@mui/material";
import features1 from "../../../assets/images/features-1.jpg";
import features2 from "../../../assets/images/features-2.jpg";
import features3 from "../../../assets/images/features-3.jpg";

const Features = () => {
  return (
    <Stack alignItems="center" spacing={3}>
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
          Why Choose CraftersCollective
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
          CraftersCollective offers a unique online marketplace for artisan and
          handcrafted products.
        </Typography>
      </Stack>
      <Box>
        <Grid
          container
          spacing={{ xs: 1, md: 4 }}
          sx={{
            alignItems: "center",
          }}
        >
          {/* === 01 === */}
          <Grid item xs={12} md={6} order={1}>
            <img
              src={features1}
              alt="features-images"
              style={{
                objectFit: "contain",
                width: "100%",
                borderRadius: "8px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} order={2}>
            <Stack>
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "25px", xl: "40px" },
                  fontWeight: 600,
                  textAlign: { xs: "center", md: "justify" },
                }}
              >
                Wide Selection of Artisan Products
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "16px", sm: "20px", xl: "22px" },
                  color: "text.secondary",
                  textAlign: "justify",
                }}
              >
                CraftersCollective provides a diverse range of artisan products,
                including home decor, fashion accessories, arts, and more.
                You'll find unique and one-of-a-kind items that can't be found
                elsewhere.
              </Typography>
            </Stack>
          </Grid>
          {/* === 02 === */}
          <Grid item xs={12} md={6} order={{ xs: 4, md: 3 }}>
            <Stack>
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "25px", xl: "40px" },
                  fontWeight: 600,
                  textAlign: { xs: "center", md: "right" },
                }}
              >
                Support Local Artisans
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "16px", sm: "20px", xl: "22px" },
                  color: "text.secondary",
                  textAlign: "justify",
                }}
              >
                By buying from CraftersCollective, you're supporting local
                artisans and their craft. Each purchase directly contributes to
                the livelihood of talented individuals who pour their passion
                and skill into their creations.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 3, md: 4 }}>
            <img
              src={features2}
              alt="features-images"
              style={{
                objectFit: "contain",
                width: "100%",
                borderRadius: "8px",
              }}
            />
          </Grid>
          {/* === 03 === */}
          <Grid item xs={12} md={6} order={5}>
            <img
              src={features3}
              alt="features-images"
              style={{
                objectFit: "contain",
                width: "100%",
                borderRadius: "8px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} order={6}>
            <Stack>
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "25px", xl: "40px" },
                  fontWeight: 600,
                  textAlign: { xs: "center", md: "justify" },
                }}
              >
                Showcase Your Creations
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "16px", sm: "20px", xl: "22px" },
                  color: "text.secondary",
                  textAlign: "justify",
                }}
              >
                As a seller on CraftersCollective, you can showcase your own
                handcrafted products to a wide audience of art lovers and
                enthusiasts. Our platform provides a convenient and
                user-friendly interface for managing your listings and
                connecting with potential buyers.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Features;
