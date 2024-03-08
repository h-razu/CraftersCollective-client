import { Box } from "@mui/material";
import loadingGIF from "../../../assets/images/loadingGIF.gif";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={loadingGIF} alt="loading_gif" />
    </Box>
  );
};

export default Loading;
