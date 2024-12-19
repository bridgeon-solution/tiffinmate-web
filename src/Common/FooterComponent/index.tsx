import { Box, Typography, Link, Divider, Grid } from "@mui/material";

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F8FD", mt: 12 }}>
      <Grid
        container
        sx={{ px: { xs: 2, sm: 4, md: 18 }, py: { xs: 2, md: 4 } }}
        spacing={8}
      >
        <Grid item xs={12} sm={6} md={2.5}>
          <Box
            sx={{
              backgroundColor: "#FC8A06",
              color: "#fff",
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontFamily: "Playfair" }}
            >
              TiffinMate
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Trusted by Hostel Communities
            </Typography>
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>
              Serving fresh, healthy, and homely meals for students and
              workers.
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={2}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "2px solid orange", mb: 1 }}
          >
            About
          </Typography>
          {["Top Rated", "Vendors", "subscription", "Contact"].map(
            (text, index) => (
              <Typography key={index} sx={{ mb: 0.5 }}>
                <Link href="#" underline="hover" color="inherit">
                  {text}
                </Link>
              </Typography>
            )
          )}
        </Grid>
        <Grid item sm={2}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "2px solid orange", mb: 1 }}
          >
            About
          </Typography>
          {["Top Rated", "Vendors", "subscription", "Contact"].map(
            (text, index) => (
              <Typography key={index} sx={{ mb: 0.5 }}>
                <Link href="#" underline="hover" color="inherit">
                  {text}
                </Link>
              </Typography>
            )
          )}
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          px: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "grey" }}>
          © 2024 TiffinMate | All rights reserved
        </Typography>
        <Box>
          <Link href="#" sx={{ color: "grey", mx: 1 }}>
            Facebook
          </Link>
          <Link href="#" sx={{ color: "grey", mx: 1 }}>
            Instagram
          </Link>
        </Box>
      </Box>
    </Box>
  );
};