import { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { OrderHistory } from "./type";
import StyledButton from "../../Atoms/Button";
import TrackOrderComponent from "../TrackOrderComponent";

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
                        fontSize: "14px",
                        fontWeight: 500,
                        color:
                          order.status === "delivered" ? "#4CAF50" : "#FF5722",
                          mb:1
                      }}
                    >
                      {order.status}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#000",
                        mb: 0.5,
                      }}
                    >
                      {order.restaurant}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {order.category}
                    </Typography>
                    <Typography
                    sx={{
                       fontSize: "13px",
                       fontWeight: 500,
                       color: "#4CAF50",
                     }}
                     >
                      12-12-2024
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
          <TrackOrderComponent events={selectedOrder.trackingEvents} />
        </>
      )}
    </Box>
  );
};

export default OrderHistoryComponent;
