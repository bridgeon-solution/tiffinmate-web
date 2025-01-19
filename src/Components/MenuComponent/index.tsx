import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { MenuCard } from "./type";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../Atoms/Button";

interface MenuTypeComponentProps {
  categories: MenuCard[];
}
const MenuComponent: React.FC<MenuTypeComponentProps> = ({ categories }) => {
  const navigate = useNavigate();
  return (
    <>
    <BackButton/>
    <Box mt={6}>
      <Box sx={{ background: "black" }}>
        <Box
          sx={{
            backgroundImage: `url(${categories[1]?categories[1].image:categories[0].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "80px 20px",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            We Offer the Best for You
          </Typography>
          <Typography variant="h6">
            Explore a variety of Veg, Non-Veg, and Premium dining options
            tailored for your taste.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ padding: 4, mt: 6 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {categories?.map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ borderRadius: 4, textAlign: "center" , height: "400px", display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <CardContent sx={{display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "0.2rem", height: "100%"}}>

                <Box sx={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", gap: "0.5rem"}}>
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.name}
                  sx={{
                    borderRadius: "50%",
                    width: 150,
                    height: 150,
                    mt: 2,
                  }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </Box>

                 
                  <Box
                    onClick={() => navigate(`${category.id}`)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="#e6852c"
                      fontWeight="bold"
                      sx={{
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Explore {category.name.split(" ")[0]}
                    </Typography>
                  </Box>
                </CardContent>
               
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default MenuComponent;
