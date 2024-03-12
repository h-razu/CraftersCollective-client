import { Box } from "@mui/material";
import loadingGIF from "../../../assets/images/loadingGIF.gif";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(1px)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <img src={loadingGIF} alt="loading_gif" />
    </Box>
  );
};

export default Loading;
