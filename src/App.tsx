import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeLight } from "./theme";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Router/Routes/Routes";
import { Toaster } from "react-hot-toast";
import CartDrawer from "./Components/Cart/CartDrawer";

function App() {
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
