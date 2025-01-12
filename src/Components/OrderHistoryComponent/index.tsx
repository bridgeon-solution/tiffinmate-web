import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import OrderDetailsComponent from "./Details";
import StyledButton from "../../Atoms/Button";

interface Address {
  name: string;
  address: string;
  city: string;
  phone: string;
}
interface Order {
  id: string;
  food: string;
  category: string;
  provider: string;
  image: string;
  price: number;
  isDelivered: boolean;
  deliveryDate: string;
  address: Address;
}
interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistoryComponent: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  if (selectedOrder) {
    return (
      <Box sx={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
        <StyledButton
          variant="contained"
          onClick={() => setSelectedOrder(null)}
          sx={{ mb: 2 }}
        >
          Back
        </StyledButton>
        <OrderDetailsComponent order={selectedOrder} />
      </Box>
    );
  }
  if (!orders.length) {
    return (
      <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No orders found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Orders
      </Typography>
      {orders.map((order) => (
        <Box onClick={() => setSelectedOrder(order)} sx={{ cursor: "pointer" }}>
          <Card key={order.id} sx={{ marginBottom: "16px" }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <img
                    width="100px"
                    height="100px"
                    src={order.image}
                    alt={`Image of ${order.food}`}
                  />
                </Grid>

                <Grid item sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {order.food}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.category}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#e6852c"
                    sx={{ mt: 1 }}
                  >
                    ₹{order.price}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: order.isDelivered ? "green" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm="auto">
                  <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                    <Typography variant="body2" color="text.secondary">
                      {order.provider}
                    </Typography>
                    <Box
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
                        {<span style={{ fontSize: "1.2em" }}>★</span>}
                        Rate Provider
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default OrderHistoryComponent;
