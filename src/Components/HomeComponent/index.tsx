import { Box, Button, Typography } from "@mui/material";
import heroImg from "../../Assets/homeHero.webp";

export const HomeHero:React.FC = () => {
  return (
    <Box sx={{ px: 6, py: 15, position: "relative" }}>
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
          mt: 4,
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
            textAlign: "center",
            mb: 1,
          }}
        >
          Best food for
          <br /> your taste
        </Typography>
        <Typography>
          Discover delectable cuisine and unforgettable moments
          <br /> in our welcoming, culinary haven.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, p: 3 }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 6, bgcolor: "#FF9431", textTransform: "none" }}
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
            }}
          >
            Explore Menu
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
