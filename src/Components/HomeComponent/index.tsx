import { Box, Button, Typography } from "@mui/material";
import heroImg from "../../Assets/homeHero.webp";

export const HomeHero: React.FC = () => {
  return (
    <Box sx={{ px: 2, py: 12, position: "relative" }}>
      <Box
        component="img"
        src={heroImg}
        alt="Hero Imager"
        sx={{
          width: "100%",
          maxHeight: "85vh",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <Box
        sx={{
          mt: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Playfair Display, serif",
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            mb: 1,
          }}
        >
          Best food for
          <br /> your taste
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
            mb: { sm: 2 },
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
