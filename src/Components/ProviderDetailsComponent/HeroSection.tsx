import { Box, Typography } from "@mui/material";
import { StyledMenuButton } from "../../Atoms/Button";
import {  ProviderHomeProps } from "../../Containers/ProviderDetailsContainer/type";
import { useNavigate } from "react-router-dom";

export const HeroSection = ({ provider }: ProviderHomeProps) => {
  const navigate=useNavigate()
  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 3, sm: 10, md: 22 },
        py: { xs: 4, sm: 6 },
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box
        sx={{
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          {provider?.resturent_name}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", width: "400px" }}>
          {provider?.about}
        </Typography>
        <StyledMenuButton onClick={()=>navigate('menu')}>Menu</StyledMenuButton>
      </Box>
      <Box
        component="img"
        height="600px"
        width="500px"
        sx={{
          borderRadius: "90px 20px 90px 20px",
          objectFit: "cover",
          transform: { xs: "scale(0.7)", sm: "none" },
        }}
        alt="The house from the offer."
        src={provider?.image}
      />
    </Box>
  );
};
