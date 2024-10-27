import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "default@example.com") {
      setMessage(
        "Success! A password recovery link has been sent to your email."
      );
    } else {
      setMessage("Error: The email address was not found.");
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send Reset Link
        </Button>
      </form>
      {message && (
        <Typography color="secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default ForgotPasswordPage;
