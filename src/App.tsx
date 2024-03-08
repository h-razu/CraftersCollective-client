import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeLight } from "./theme";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Router/Routes/Routes";
import { Toaster } from "react-hot-toast";
import CartDrawer from "./Components/Cart/CartDrawer";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { getUserData } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        dispatch(getUserData(user.email));
      }
    });
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <CartDrawer />
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
