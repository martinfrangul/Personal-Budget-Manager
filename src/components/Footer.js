import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import backgroundImage from '../assets/bgmaps.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        bgcolor: "primary.main",
        color: "white",
        mt: 4,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: '200px',
      }}
    >
      {/* Barra de búsqueda */}
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Find your branch..."
          />
          <Button type="submit" sx={{ p: "10px" }}>
            Search
          </Button>
        </Paper>
      </Box>

      {/* Derechos de autor */}
      <Typography variant="body2" sx={{ color: "black" }}>
        © {new Date().getFullYear()} Personal Finance Assistant
      </Typography>

      {/* Iconos de redes sociales */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          aria-label="Facebook"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "black" }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          aria-label="Twitter"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "black" }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          aria-label="Instagram"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "black" }}
        >
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
