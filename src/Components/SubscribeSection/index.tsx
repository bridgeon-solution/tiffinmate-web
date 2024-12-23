import React from "react";
import { Box, Typography, Button } from "@mui/material";

const SubscribeSection: React.FC = () => {
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 20 }, py: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          backgroundColor: "#FF8C34",
          borderRadius: "16px",
          padding: { xs: "20px", sm: "30px 40px" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "start", sm: "center" },
          gap: { xs: 2, sm: 0 },
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 0 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
            }}
          >
            Subscribe For Get Offers
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              marginTop: "8px",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            soluta quibusdam ex.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#FF8C34",
              fontWeight: "bold",
              textTransform: "none",
              px: { xs: 3, sm: 4 },
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
