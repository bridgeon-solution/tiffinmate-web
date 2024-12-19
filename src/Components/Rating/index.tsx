import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";

export default function BasicRating() {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        display: "flex",
        alignItems: "center",
        gap: 1,
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <Rating name="read-only" value={3} readOnly />
      <Typography sx={{ display: "inline-block", color: "gray" }}>
        ({3}/5)
      </Typography>
    </Box>
  );
}
