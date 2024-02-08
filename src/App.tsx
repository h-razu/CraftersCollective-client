import {
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { themeLight } from "./theme";

function App() {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />

      <Container maxWidth="xl"></Container>
    </ThemeProvider>
  );
}

export default App;
