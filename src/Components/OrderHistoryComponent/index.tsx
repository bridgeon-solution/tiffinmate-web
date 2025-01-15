import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import OrderDetailsComponent from "./Details";
import StyledButton from "../../Atoms/Button";
import { Order } from "./type";

interface OrderHistoryProps {
  orders: Order[];
  setSelectedOrder: (Order: Order | null) => void;
  selectedOrder: Order | null;
  otherItems: Order[];
  setFilter: (filter: string) => void;
  filter: string;
}

const OrderHistoryComponent: React.FC<OrderHistoryProps> = ({
  orders,
  setSelectedOrder,
  selectedOrder,
  otherItems,
  setFilter,
  filter,
}) => {
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
        <OrderDetailsComponent order={selectedOrder} otherItems={otherItems} />
      </Box>
    );
  }
  if (orders?.length === 0) {
    return (
      <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No orders found.
        </Typography>
      </Box>
    );
  }

  const handleChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <Box sx={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Orders
      </Typography>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          color="primary"
          value={filter}
          exclusive
          onChange={(event, newFilter) => handleChange(newFilter)}
          aria-label="Filter orders"
          sx={{
            "& .MuiToggleButton-root": {
              border: "1px solid rgba(230, 133, 44, 0.2)",
              color: "#666",
              textTransform: "capitalize",
              px: 3,
              py: 1,
              fontSize: "0.875rem",
              fontWeight: 500,
              "&.Mui-selected": {
                backgroundColor: "rgba(230, 133, 44, 0.08)",
                color: "#e6852c",
                fontWeight: 600,
              },
            },
          }}
        >
          <ToggleButton value="newest">newest</ToggleButton>
          <ToggleButton value="oldest">oldest</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {orders.map((order) => (
        <Box onClick={() => setSelectedOrder(order)} sx={{ cursor: "pointer" }}>
          <Card key={order.order_id} sx={{ marginBottom: "16px" }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <img
                    width="100px"
                    height="100px"
                    src={order.foodItemImage}
                    alt={`Image of ${order.foodItemName}`}
                  />
                </Grid>

                <Grid item sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {order.foodItemName}
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
                    ₹{order.foodItemPrice}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          order.order_status === "Pending"
                            ? "gray"
                            : order.order_status === "Confirmed"
                            ? "#e6852c"
                            : order.order_status === "Delivered"
                            ? "green"
                            : "red",
                        fontWeight: 500,
                      }}
                    >
                      {order.order_status}
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
