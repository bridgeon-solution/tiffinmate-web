import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import StyledButton, { BackButton } from "../../Atoms/Button";
import { category, MenuItem } from "./type";
interface MenuComponentProps {
  categories: category[];
  handleCategory: (category: string) => void;
  menu: MenuItem[];
  setDailyModal: (value: boolean) => void;
  setSubscriptionModal: (value: boolean) => void;
}
const MenuDetailsComponent: React.FC<MenuComponentProps> = ({
  handleCategory,
  menu,
  categories,
  setDailyModal,
  setSubscriptionModal,
}) => {
  return (
    <>
    <BackButton/>
    <Box p={4} mt={5}>
      <Typography
        variant="subtitle1"
        align="center"
        color="#e6852c"
        fontWeight="bold"
      >
        Menu
      </Typography>
      <Typography variant="h3" align="center" fontWeight="bold">
        Explore Our Menu
      </Typography>
      <Grid container spacing={6} justifyContent="center" mb={4} mt={2}>
        {categories.map((category, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box
                sx={{ width: "100%", cursor: "pointer" }}
                onClick={() => handleCategory(category.id)}
              >
              <Box
                component="img"
                src={category.image}
                sx={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
                <Typography
                  variant="subtitle2"
                  color="#e6852c"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {category.name}
                </Typography>
                <Box sx={{ borderBottom: "2px solid #ddd", mb: 2, mt: 2 }} />
                <Typography variant="body1" fontWeight="bold">
                  {category.description}
                </Typography>
              </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={4} mt={6} p={1}>
        {menu.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              margin: "16px auto",
            }}
          >
            <Typography variant="h6" color="#888" fontWeight="bold">
              No Items Found
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sorry, there are currently no items available in this category.
            </Typography>
          </Box>
        ) : (
          <>
            {menu.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom="1px solid #ddd"
                  pb={2}
                  mb={2}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="#e6852c"
                    >
                      {item.day}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {item.food_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="#e6852c">
                    ${item.price}.00
                  </Typography>
                </Box>
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <Box mt={6} textAlign="end">
        <StyledButton
          onClick={() => setDailyModal(true)}
          variant="contained"
          sx={{ mr: 2, width: { xs: "100%", sm: 230 }, mt: 2 }}
        >
          GET DAILY PLAN
        </StyledButton>
        <StyledButton
          onClick={() => setSubscriptionModal(true)}
          variant="contained"
          sx={{ width: { xs: "100%", sm: 230 }, mt: 2 }}
        >
          GET SUBSCRIPTION PLAN
        </StyledButton>
      </Box>
    </Box>
    </>
  );
};

export default MenuDetailsComponent;
