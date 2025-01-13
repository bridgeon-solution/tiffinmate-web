// App.tsx
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import image from "../../Assets/registerVendor.webp";
import StyledButton from "../../Atoms/Button";

const RegisterVendor: React.FC = () => {
  return (
    <Box mt={6}>
      <Box sx={{ background: "black" }}>
        <Box
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "80px 20px",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant={"h3"} sx={{ fontWeight: "bold",fontSize:{md:50,xs:35}, color: "black" }}>
            Partner with TiffinMate
            <br />
            Deliver happiness, one meal at a time
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "black", marginTop: 2, marginBottom: 4 }}
          >
            Join the revolution in home-style food delivery and grow your
            business! Get 0% commission for the first month in selected cities.
          </Typography>
          <a href="https://betaprovider.tiffinmate.online/">
            <StyledButton variant="contained">Join TiffinMate Now</StyledButton>
          </a>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#fff",
          padding: 5,
          borderRadius: 2,
          marginTop: -4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: 760,
          textAlign: "center",
          ml: {md:"25%",xs:0},
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Getting Started is Easy
        </Typography>
        <Typography variant="body1" sx={{ color: "gray" }}>
          Build your presence with TiffinMate in just 3 simple steps.
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 2 }}
        >
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              1
            </Typography>
            <Typography variant="body1">
              Tell us about your tiffin service
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              2
            </Typography>
            <Typography variant="body1">
              Upload your menu and pricing
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              3
            </Typography>
            <Typography variant="body1">
              Start receiving orders instantly
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterVendor;
