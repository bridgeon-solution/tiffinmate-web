import { useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { OrderHistory } from "./type";
import OrderTrackingTimeline from "../TrackOrderComponent";
import StyledButton from "../../Atoms/Button";

const OrderHistoryComponent = ({ orders }: { orders: OrderHistory[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);

  const handleTrackOrder = (order: OrderHistory) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {!selectedOrder ? (
        <>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Your Orders
          </Typography>
          {orders.map((order) => (
            <Card
              key={order.id}
              sx={{
                display: "flex",
                mb: 2,
                p: 2,
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                image={order.imageUrl}
                alt={order.name}
              />
              <CardContent sx={{ flex: 1, pl: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#4CAF50",
                        fontSize: "14px",
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {order.category}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#000",
                        mb: 0.5,
                      }}
                    >
                      {order.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {order.restaurant}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color:
                          order.status === "delivered" ? "#4CAF50" : "#FF5722",
                      }}
                    >
                      {order.status}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      minWidth: 120,
                    }}
                  >
                    <StyledButton
                      variant="contained"
                      onClick={() => handleTrackOrder(order)}
                    >
                      Track Order
                    </StyledButton>
                    <StyledButton variant="contained">
                      Order Details
                    </StyledButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <>
          <StyledButton
            variant="outlined"
            onClick={handleBackToOrders}
            sx={{ mb: 2 }}
          >
            Back to Orders
          </StyledButton>
          <OrderTrackingTimeline events={selectedOrder.trackingEvents} />
        </>
      )}
    </Box>
  );
};

export default OrderHistoryComponent;
