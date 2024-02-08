import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#526D82",
    },
    background: {
      default: "#DDE6ED",
    },
    text: {
      primary: "#27374d",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
