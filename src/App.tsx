import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeLight } from "./theme";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Router/Routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
