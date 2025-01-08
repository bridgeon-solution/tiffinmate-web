import Lunch from "../../Assets/Lunch.webp";
import Dinner from "../../Assets/Dinner.webp";
import BreakFast from "../../Assets/BreakFast.webp";

// types.ts
export interface FoodItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
    image: string;
    description?: string;
  }
  
  export interface MealCategory {
    category: 'breakfast' | 'lunch' | 'dinner';
    time: string;
    items: FoodItem[];
    subtotal: number;
  }
  
  export interface OrderDetails {
    id: string;
    orderDate: string;
    status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
    restaurant: {
      name: string;
      image: string;
      rating: number;
      cuisine: string;
    };
    mealCategories: MealCategory[];
    totalAmount: number;
  }
  
  // OrderDetailsContainer.tsx
  import React from 'react';
  import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Chip,

    Rating,
  } from '@mui/material';
  import {
 
    AccessTime,
    LocalDining,
  } from '@mui/icons-material';
  
  const dummyOrderDetails: OrderDetails = {
    id: "ORD-2024-001",
    orderDate: "2024-01-07",
    status: "delivered",
    restaurant: {
      name: "Grand Food Court",
      image: BreakFast,
      rating: 4.5,
      cuisine: "Multi-Cuisine Restaurant"
    },
    mealCategories: [
      {
        category: "breakfast",
        time: "8:00 AM - 10:00 AM",
        items: [
          {
            id: "b1",
            name: "English Breakfast",
            quantity: 2,
            price: 12.99,
            totalPrice: 25.98,
            image:Lunch,
            description: "Eggs, bacon, sausages, beans, toast"
          }
        ],
        subtotal: 34.97
      },
      {
        category: "lunch",
        time: "12:00 PM - 2:00 PM",
        items: [
          {
            id: "l1",
            name: "Grilled Chicken Salad",
            quantity: 1,
            price: 14.99,
            totalPrice: 14.99,
            image: BreakFast,
            description: "Fresh greens with grilled chicken breast"
          }
        ],
        subtotal: 48.97
      },
      {
        category: "dinner",
        time: "7:00 PM - 10:00 PM",
        items: [
          {
            id: "d1",
            name: "Grilled Salmon",
            quantity: 1,
            price: 24.99,
            totalPrice: 24.99,
            image:Lunch,
            description: "Fresh salmon with vegetables"
          },
        ],
        subtotal: 42.97
      }
    ],
    totalAmount: 126.91
  };
  
  const OrderDetailsContainer: React.FC = () => {
  
    return (
      <Box sx={{ maxWidth: 1200, margin: '0 auto',mt:10 }}>
        {/* Restaurant Info */}
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                height="200"
                image={dummyOrderDetails.restaurant.image}
                alt={dummyOrderDetails.restaurant.name}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {dummyOrderDetails.restaurant.name}
                </Typography>
                <Typography color="textSecondary">
                  {dummyOrderDetails.restaurant.cuisine}
                </Typography>
                <Rating 
                  value={dummyOrderDetails.restaurant.rating} 
                  precision={0.5} 
                  readOnly 
                />
                <Box sx={{ mt: 2 }}>
                  <Chip
                    icon={<AccessTime />}
                    label={`Order Date: ${new Date(dummyOrderDetails.orderDate).toLocaleDateString()}`}
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    icon={<LocalDining />}
                    label={`Order ID: ${dummyOrderDetails.id}`}
                    sx={{ mb: 1 }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ padding: 4, mt: 6 }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                  {dummyOrderDetails.mealCategories?.map((category, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                      <Card sx={{ borderRadius: 4, textAlign: "center" , height: "300px", display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <CardContent sx={{display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "0.2rem", height: "100%"}}>
        
                        <Box sx={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", gap: "0.5rem"}}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={BreakFast}
                          alt={category.category}
                          sx={{
                            borderRadius: "50%",
                            width: 150,
                            height: 150,
                            mt: 2,
                          }}
                        />
                        <Typography variant="h6" fontWeight="bold">
                            Masala dosa
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                           {category.category}
                          </Typography>
                        </Box>
        
                         
                          <Box
                            // onClick={() => navigate(`${category.id}`)}
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              color="#e6852c"
                              fontWeight="bold"
                            >
                              {category.subtotal}
                            </Typography>
                          </Box>
                        </CardContent>
                       
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
  
       
        {/* Total Amount */}
        <Box>
          <Box sx={{ textAlign:'center' }}>
            <Typography variant="h6">Total Order Amount:{dummyOrderDetails.totalAmount.toFixed(2)} </Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default OrderDetailsContainer;