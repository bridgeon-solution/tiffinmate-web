import { Box, Button, Typography } from "@mui/material";
import heroImg from "../../Assets/homeHero.webp";

export const HomeHero: React.FC = () => {
  return (
    <Box sx={{ 
      px: { xs: 1, sm: 2 }, 
      py: { xs: 6, sm: 8, md: 12 }, 
      position: "relative",
      width: "100%"
    }}>
      <Box
        component="img"
        src={heroImg}
        alt="Hero Image"
        sx={{
          width: "100%",
          height: { xs: "60vh", sm: "70vh", md: "85vh" }, 
          maxHeight: "85vh",
          objectFit: "cover",
          borderRadius: { xs: "8px", sm: "12px" }, 
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "auto" }, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          p: { xs: 1, sm: 2 }, 
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Playfair Display, serif",
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "4rem" },
            mb: { xs: 1, sm: 1.5, md: 2 }, 
            wordBreak: "break-word", 
          }}
        >
          Best food for
          <br /> your taste
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.85rem", sm: "1rem", md: "1.2rem" },
            mb: { xs: 1.5, sm: 2, md: 2.5 }, 
            px: { xs: 1, sm: 2 }, 
            maxWidth: { xs: "100%", sm: "90%", md: "800px" }, 
          }}
        >
          Discover delectable cuisine and unforgettable moments
          <br /> in our welcoming, culinary haven.
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center", gap: 1, padding: 2 }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: 6,
              bgcolor: "#FF9431",
              textTransform: "none",
              mb: { xs: 2, sm: 0 },
            }}
          >
            Order Now
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 6,
              textTransform: "none",
              color: "black",
              borderColor: "black",
              display: { xs: "none", sm: "inline-block" },
            }}
          >
            Explore Menu
          </Button>
        </Box>
      </Box>
    </Box>
  );
};