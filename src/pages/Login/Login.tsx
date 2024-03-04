import {
  Box,
  Button,
  Divider,
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
import GoogleIcon from "@mui/icons-material/Google";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginImg from "../../assets/images/login.jpg";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>();

  const handleLoginSubmit = (data: LoginInputs) => {
    console.log(data);
    reset();
  };

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
          src={loginImg}
          alt="loginImg"
          width="100%"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Paper
        variant="outlined"
        sx={{ padding: { xs: 1, md: 3 }, width: { xs: "100%", md: "50%" } }}
      >
        <Stack spacing={4}>
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
              }}
            >
              Sign In
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Don't have an account yet?
              <span
                style={{ color: "blue", marginLeft: 4, cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Sign up here
              </span>
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>

          <Divider sx={{ width: "100%" }}>
            <Typography>OR</Typography>
          </Divider>

          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <FormGroup row={true}>
              <FormControl fullWidth sx={{ marginY: 2 }}>
                <InputLabel htmlFor="login-email">Email</InputLabel>
                <OutlinedInput
                  id="login-email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  startAdornment={
                    <InputAdornment position="start">
                      {<MailOutlineIcon />}
                    </InputAdornment>
                  }
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ marginY: 2 }}>
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <OutlinedInput
                  id="login-password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  startAdornment={
                    <InputAdornment position="start">
                      {<LockOutlinedIcon />}
                    </InputAdornment>
                  }
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
                {errors.password && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </FormControl>
              <Button
                variant="outlined"
                size="large"
                type="submit"
                sx={{ width: "50%", margin: "auto" }}
              >
                Log In
              </Button>
            </FormGroup>
          </form>
        </Stack>
      </Paper>
    </Paper>
  );
};

export default Login;
