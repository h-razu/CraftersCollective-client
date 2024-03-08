import {
  Box,
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import registerImage from "../../assets/images/register.jpg";
import { useForm, useWatch } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUser } from "../../features/auth/authSlice";
import useTitle from "../../Hooks/useTitle/useTitle";

type SignUpInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  displayImage: File;
};

const SignUp = () => {
  useTitle("Sign Up");
  const navigate = useNavigate();
  const { error, isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
      setIsPasswordMatch(true);
    } else if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password !== confirmPassword
    ) {
      setIsPasswordMatch(false);
      setDisabled(true);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(`Can't create User: ${error}`, { id: "createUser" });
    }

    if (!isLoading && !isError && isSuccess) {
      toast.success("Successfully create the user", { id: "createUser" });
      reset();
      navigate("/");
    }
  }, [isLoading, isError, error, isSuccess, reset, navigate]);

  //hosting the profile image to imgBB
  const uploadImage = async () => {
    const imageInput = document.getElementById(
      "profileImage"
    ) as HTMLInputElement;

    if (!imageInput.files) return;
    const imageData = new FormData();
    imageData.append("image", imageInput.files[0]);
    imageData.append(
      "name",
      "crafters_collective/profile_image/" + imageInput.files[0].name
    );

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_HOSTING_API_KEY}`,
      {
        method: "POST",
        body: imageData,
      }
    );

    return response;
  };

  const handleSignUpSubmit = async (data: SignUpInputs) => {
    const response = await uploadImage();
    if (!response) return;

    if (response.ok) {
      const result = await response.json();

      dispatch(createUser({ email: data.email, password: data.password }));

      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accountType: "",
        profileImageUrl: result.data.display_url,
      };

      console.log(userData);
    } else {
      toast.error("Error Occurred. Try again later.");
    }
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

          <form onSubmit={handleSubmit(handleSignUpSubmit)}>
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
                <InputLabel htmlFor="signUp-email">Email</InputLabel>
                <OutlinedInput
                  id="signUp-email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && fieldRequiredErrorMessage}
              </FormControl>
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel htmlFor="signUp-password">Password</InputLabel>
                <OutlinedInput
                  id="signUp-password"
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
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password should be minimum 8 character",
                    },
                    maxLength: {
                      value: 16,
                      message: "Maximum 16 character is allowed",
                    },
                  })}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel htmlFor="signUp-confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="signUp-confirm-password"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  error={!isPasswordMatch}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...register("confirmPassword", {
                    required: true,
                  })}
                />
                {errors.confirmPassword && fieldRequiredErrorMessage}
                {!isPasswordMatch && (
                  <span style={{ color: "red" }}>Password do not Match</span>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ marginY: 1 }}>
                <InputLabel htmlFor="profile-image">Profile Image</InputLabel>
                <OutlinedInput
                  type="file"
                  id="profileImage"
                  inputProps={{
                    accept: "image/png, image/jpeg",
                  }}
                  label="Profile Image"
                  startAdornment={
                    <InputAdornment position="start">
                      <UploadFileIcon />
                    </InputAdornment>
                  }
                  {...register("displayImage", { required: true })}
                />
                {errors.displayImage && fieldRequiredErrorMessage}
              </FormControl>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                sx={{ width: "50%", margin: "auto", marginTop: 2 }}
                disabled={disabled}
              >
                Sign Up
              </Button>
            </FormGroup>
          </form>
        </Stack>
      </Paper>
    </Paper>
  );
};

export default SignUp;
