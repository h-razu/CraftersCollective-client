import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#646669",
    },

    text: {
      // primary: "#646669",
      primary: "#000",
      secondary: "#979BA1",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: "url(/images/bg.svg)",
        },
      },
    },
  },
});
