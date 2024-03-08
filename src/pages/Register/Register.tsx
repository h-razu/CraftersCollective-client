import {
  Box,
  Button,
  FormControl,
  FormGroup,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import buyerImage from "../../assets/images/buyer.png";
import sellerImage from "../../assets/images/seller.png";
import useTitle from "../../Hooks/useTitle/useTitle";
import toast from "react-hot-toast";
import Loading from "../Shared/Loading/Loading";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const Register = () => {
  useTitle("Register");
  const navigate = useNavigate();
  const [isSellerModalOpen, setIsSellerModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSellerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imgInput = document.getElementById("store-image") as HTMLInputElement;

    const storeName = document.getElementById("store-name") as HTMLInputElement;
    console.log(storeName);

    if (!imgInput.files) return;
    setIsLoading(true);
    const imageData = new FormData();
    imageData.append("image", imgInput.files[0]);
    imageData.append(
      "name",
      "crafters_collective/store_image/" + imgInput.files[0].name
    );

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_HOSTING_API_KEY}`,
      {
        method: "POST",
        body: imageData,
      }
    );

    if (response.ok) {
      const result = await response.json();

      const sellerData = {
        accountType: "seller",
        storeName: storeName.value,
        storeImage: result.data.display_url,
        accountVerified: false,
      };
      console.log(sellerData);
      setIsLoading(false);
      toast.success("Account Registration Successful");
      navigate("/");
    } else {
      toast.error("Error Occurred. Try again later.");
      setIsLoading(false);
    }
  };

  const handleBuyerSubmit = () => {
    const buyerData = {
      accountType: "buyer",
    };
    console.log(buyerData);
    toast.success("Account Registration Successful");
    navigate("/");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack sx={{ alignItems: "center" }}>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{
          fontWeight: 500,
          fontSize: {
            xs: 25,
            md: 35,
          },
        }}
      >
        Continue As...
      </Typography>
      <Box
        sx={{
          width: "100%",
          marginTop: 3,
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            justifyContent: "space-evenly",
          },
          gap: 4,
        }}
      >
        <Paper
          elevation={4}
          sx={{ cursor: "pointer" }}
          onClick={() => handleBuyerSubmit()}
        >
          <Stack padding={2}>
            <img
              src={buyerImage}
              alt="buyer_image"
              width="100%"
              height="300px"
              style={{
                objectFit: "contain",
                borderRadius: "2px",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "18px", sm: "25px", md: "30px", xl: "35px" },
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Buyer
            </Typography>
          </Stack>
        </Paper>
        <Paper
          elevation={4}
          sx={{ cursor: "pointer" }}
          onClick={() => setIsSellerModalOpen(true)}
        >
          <Stack padding={2}>
            <img
              src={sellerImage}
              alt="seller_image"
              width="100%"
              height="300px"
              style={{
                objectFit: "contain",
                borderRadius: "2px",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "18px", sm: "25px", md: "30px", xl: "35px" },
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Seller
            </Typography>
          </Stack>
        </Paper>
      </Box>

      {/* Modal for seller  */}
      <Modal
        open={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Stack>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Store Information
            </Typography>
            <form onSubmit={handleSellerSubmit}>
              <FormGroup>
                <FormControl fullWidth sx={{ marginY: 2 }}>
                  <InputLabel htmlFor="store-name">Store Name</InputLabel>
                  <OutlinedInput
                    id="store-name"
                    label="Store Name"
                    type="text"
                    placeholder="Store Name"
                    required
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginY: 2 }}>
                  <InputLabel htmlFor="store-image">Store Image</InputLabel>
                  <OutlinedInput
                    type="file"
                    id="store-image"
                    inputProps={{
                      accept: "image/png, image/jpeg",
                    }}
                    label="Store Image"
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <UploadFileIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  sx={{ width: "50%", margin: "auto" }}
                >
                  Submit
                </Button>
              </FormGroup>
            </form>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default Register;
