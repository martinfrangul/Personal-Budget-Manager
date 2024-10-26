import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorMessage = ({ message }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Typography variant="h6" color="error">
      {message}
    </Typography>
  </Box>
);

export default ErrorMessage;
