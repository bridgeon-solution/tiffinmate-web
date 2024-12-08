import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const SubscribeSection: React.FC = () => {
  return (
    <Box sx={{ px: 10, py: 4 }}>
      <Box
        sx={{
          backgroundColor: "#FF8C34",
          borderRadius: "16px",
          padding: "30px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
            Subscribe For Get Offers
          </Typography>
          <Typography variant="body1" sx={{ color: "#fff", marginTop: "8px" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            soluta quibusdam ex.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            placeholder="Enter your email"
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#FF8C34",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#FFB066",
                color: "white",
              },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscribeSection;
