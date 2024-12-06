import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export const BrowseMenu: React.FC = () => {
  const Dummy = [
    {
      Category: "Breakfast",
      description:
        "In the new era of technology we look in the future with certainty and pride for our life.",
    },
    {
      Category: "Lunch",
      description:
        "In the new era of technology we look in the future with certainty and pride for our life.",
    },
    {
      Category: "Dinner",
      description:
        "In the new era of technology we look in the future with certainty and pride for our life.",
    },
  ];
  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Browse Our Menu
      </Typography>
      <Grid container  sx={{ p: 4 ,justifyContent:"center",alignItems:"center"}}>
        {Dummy.map((item, index) => (
          <Grid item sm={6} md={2} key={index}>
            <Box
              sx={{
                p: 6,
                border: "1px solid silver",
                display: "flex",
                height: "100%",
                borderRadius: "12px",
                flexDirection: "column",
                alignItems: "center",
                maxWidth:"250px",
                mx: "auto", 
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", fontSize: "1.2rem", mb: 1 }}
              >
                {item.Category}
              </Typography>
              <Typography sx={{ color: "grey" }}>{item.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
