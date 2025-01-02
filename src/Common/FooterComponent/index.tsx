import { Box, Typography, Link, Divider, Grid } from "@mui/material";

const Footer = () => {
  const quickLinks = {
    About: ["Top Rated", "Vendors", "Subscription", "Contact"],
    Services: ["Meal Plans", "Special Diets", "Bulk Orders", "Catering"],
    Help: ["FAQs", "Support", "Terms", "Privacy"],
    Connect: ["Partners", "Careers", "Blog", "News"],
  };
  return (
    <Box
      sx={{
        backgroundColor: "#F5F8FD",
        mt: { xs: 6, sm: 8, md: 12 },
      }}
    >
      <Grid
        container
        sx={{
          px: { xs: 2, sm: 4, md: 8, lg: 18 },
          py: { xs: 2, sm: 4, md: 5 },
        }}
        spacing={{ xs: 3, sm: 5, md: 6, lg: 8 }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            minWidth: { xs: "100%", sm: "auto" },
            maxWidth: { sm: "300px" },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FC8A06",
              color: "#fff",
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              height: "100%",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Playfair",
                letterSpacing: "0.5px",
              }}
            >
              TiffinMate
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Trusted by Hostel Communities
            </Typography>
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>
              Serving fresh, healthy, and homely meals for students and workers.
            </Typography>
          </Box>
        </Grid>
        {Object.entries(quickLinks).map(([title, links], sectionIndex) => (
          <Grid item xs={12} sm={6} md={2} key={sectionIndex}>
            <Typography
              variant="h6"
              sx={{
                borderBottom: "2px solid orange",
                mb: 2,
                pb: 1,
                fontWeight: "600",
                position: "relative",
              }}
            >
              {title}
            </Typography>
            {links.map((text, index) => (
              <Typography key={index} sx={{ mb: 1.5 }}>
                <Link
                  href="#"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    position: "relative",
                    "&:hover": {
                      color: "#FC8A06",
                    },
                  }}
                >
                  {text}
                </Link>
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>

      <Divider
        sx={{
          my: 4,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          px: { xs: 2, sm: 4, md: 8, lg: 18 },
          py: 3,
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "grey" }}>
          © 2024 TiffinMate | All rights reserved
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social) => (
            <Link
              href="#"
              key={social}
              sx={{
                color: "grey",
                textDecoration: "none",
                "&:hover": {
                  color: "#FC8A06",
                },
              }}
            >
              {social}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;
