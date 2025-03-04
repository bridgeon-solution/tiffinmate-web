import { Box,  Typography } from "@mui/material";
import { ProviderCard } from "./ProviderCard";
import { providerDetailsProp } from "../../Containers/ProviderDetailsContainer/type";
import { BackButton } from "../../Atoms/Button";

export const ProviderComponent = ({ providers }: providerDetailsProp) => {
   
  return (
    <>
    <BackButton/>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          px: { xs: 2, md: 8 },
          position: "relative",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "48px",
            height: "65px",
            bgcolor: "#FF9431",
            borderRadius: 2,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            color: "black",
            fontFamily: "Poppins",
            position: "absolute",
            left: { xs: 80, md: 130 },
            fontSize: {xs: 25, md: 40}
          }}
        >
          Providers
        </Typography>
      </Box>
      <ProviderCard providers={providers} />
    </>
  );
};
