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
import { FormEvent, useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import buyerImage from "../../assets/images/buyer.png";
import sellerImage from "../../assets/images/seller.png";
import useTitle from "../../Hooks/useTitle/useTitle";
import toast from "react-hot-toast";
import Loading from "../Shared/Loading/Loading";
import { useUpdateUserMutation } from "../../features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserData } from "../../features/auth/authSlice";

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
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isSellerModalOpen, setIsSellerModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [updateUser, { isLoading, isError, error, isSuccess }] =
    useUpdateUserMutation();

  //manage loading, error state for data uploading
  useEffect(() => {
    return () => {
      if (!isLoading && isError) {
        toast.error(`Can't Register User: ${error}`, {
          id: "registerUser",
        });
        setLoading(false);
      }

      if (!isLoading && !isError && isSuccess) {
        toast.success("Account Registration Successful", {
          id: "registerUser",
        });

        setLoading(false);
        setIsSellerModalOpen(false);
        navigate("/");
      }

      if (user.accountType) {
        setLoading(false);
        navigate("/");
      }
    };
  }, [isLoading, isError, isSuccess, navigate, error, user]);

  const handleSellerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imgInput = document.getElementById("store-image") as HTMLInputElement;
    const storeName = document.getElementById("store-name") as HTMLInputElement;

    if (!imgInput.files) return;
    setLoading(true);
    //upload store image of seller account into imgBB
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

      //update seller account
      await updateUser({ data: sellerData, email: user.email });
      dispatch(getUserData(user.email));
      setLoading(false);
    } else {
      toast.error("Error Occurred. Try again later.");
      setLoading(false);
    }
  };

  const handleBuyerSubmit = async () => {
    setLoading(true);
    const buyerData = {
      accountType: "buyer",
    };
    //update the buyer account
    await updateUser({ data: buyerData, email: user.email });
    dispatch(getUserData(user.email));
  };

  if (loading) {
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
