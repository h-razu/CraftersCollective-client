import {
  Box,
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import registerImage from "../../assets/images/register.jpg";
import { useForm } from "react-hook-form";

type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "buyer" | "seller";
  storeName?: string;
  storeImage?: File;
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string>("");
  const [storeImageFile, setStoreImageFile] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const storeImage = event.target.files[0];
    console.log(storeImage);
    setStoreImageFile(storeImage);
  };

  const handleRegisterSubmit = (data: RegisterInputs) => {
    console.log({ ...data, role: accountType });
  };

  const fieldRequiredErrorMessage = (
    <span style={{ color: "red" }}>This field is required</span>
  );

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: { sm: "500px", md: "1000px" },
        margin: "auto",
        padding: { xs: 1, md: 2 },
        display: "flex",
        flexDirection: { sm: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "50%" },
          display: { xs: "none", sm: "flex" },
        }}
      >
        <img
          src={registerImage}
          alt="registerImage"
          width="100%"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Paper
        variant="outlined"
        sx={{ padding: { xs: 1, md: 3 }, width: { xs: "100%", md: "60%" } }}
      >
        <Stack spacing={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "20px", md: "30px" },
              }}
            >
              Create an Account
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Already have an account?
              <span
                style={{ color: "blue", marginLeft: 4, cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(handleRegisterSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <OutlinedInput
                  id="first name"
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && fieldRequiredErrorMessage}
              </FormControl>
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <OutlinedInput
                  id="last name"
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && fieldRequiredErrorMessage}
              </FormControl>
            </Box>
            <FormGroup row={true}>
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel htmlFor="login-email">Email</InputLabel>
                <OutlinedInput
                  id="login-email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && fieldRequiredErrorMessage}
              </FormControl>
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                  id="login-password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...register("password", { required: true })}
                />
                {errors.password && fieldRequiredErrorMessage}
              </FormControl>
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel id="account-type-label">Account Type</InputLabel>
                <Select
                  labelId="account-type-label"
                  id="account-type"
                  value={accountType}
                  label="Account Type"
                  onChange={(e: SelectChangeEvent) =>
                    setAccountType(e.target.value as string)
                  }
                >
                  <MenuItem value={"buyer"}>Buyer</MenuItem>
                  <MenuItem value={"seller"}>Seller</MenuItem>
                </Select>
              </FormControl>
              {accountType === "seller" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FormControl fullWidth sx={{ marginY: 1 }}>
                    <InputLabel htmlFor="store-name">Store Name</InputLabel>
                    <OutlinedInput
                      id="store-name"
                      label="Store Name"
                      type="text"
                      placeholder="Store Name"
                      {...register("storeName", { required: true })}
                    />
                    {errors.storeName && fieldRequiredErrorMessage}
                  </FormControl>
                  <FormControl fullWidth sx={{ marginY: 1 }}>
                    <InputLabel htmlFor="store-image">Store Image</InputLabel>
                    <OutlinedInput
                      type="file"
                      inputProps={{
                        accept: "image/png, image/jpeg",
                      }}
                      label="Store Image"
                      // required
                      startAdornment={
                        <InputAdornment position="start">
                          <UploadFileIcon />
                        </InputAdornment>
                      }
                      // onChange={handleFileUpload}
                      {...register("storeImage", { required: true })}
                    />
                    {errors.storeImage && fieldRequiredErrorMessage}
                  </FormControl>
                </Box>
              )}
              <Button
                variant="outlined"
                size="large"
                type="submit"
                sx={{ width: "50%", margin: "auto", marginTop: 2 }}
              >
                Register
              </Button>
            </FormGroup>
          </form>
        </Stack>
      </Paper>
    </Paper>
  );
};

export default Register;
