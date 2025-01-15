import React, { useEffect, useState } from "react";
import OrderHistoryComponent from "../../Components/OrderHistoryComponent";
import {
  Order,
  OrderStatus,
} from "../../Components/OrderHistoryComponent/type";
import { Box, CircularProgress } from "@mui/material";
import { FetchOrdersByUser } from "../../Services/UserService";

const OrderHistoryContainer: React.FC = () => {
  const [filter, setFilter] = React.useState("newest");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [otherItems, setOtherItems] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const user = localStorage.getItem("id");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const userId = user ?? "";
        const response = await FetchOrdersByUser(userId, filter);
        const fetchedOrders = response.data.result.allDetails.flatMap(
          (order: any) =>
            order.details.map((item: any) => ({
              order_id: order.order_id,
              menu_id: order.menu_id,
              provider: order.provider,
              user_id: order.user_id,
              user: order.user,
              order_status: OrderStatus[order.order_status],
              cancelled_at: order.cancelled_at,
              date: new Date(order.date).toLocaleDateString(),
              foodItemName: item.foodItemName,
              foodItemImage: item.foodItemImage,
              foodItemPrice: item.foodItemPrice,
              category: item.category,
              address: {
                userName: item.userName,
                address: item.address,
                city: item.city,
                ph_no: item.ph_no,
              },
            }))
        );
        setOrders(fetchedOrders);
      } catch (error) {
        setError("Error fetching orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, filter]);
  useEffect(() => {
    if (selectedOrder) {
      const otherItems = orders.filter(
        (order) =>
          order.order_id === selectedOrder.order_id &&
          order.foodItemName !== selectedOrder.foodItemName
      );
      setOtherItems(otherItems);
    }
  }, [selectedOrder, orders]);
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      {error && <Box className="errormessage">{error}</Box>}
      <OrderHistoryComponent
        orders={orders}
        setSelectedOrder={setSelectedOrder}
        selectedOrder={selectedOrder}
        otherItems={otherItems}
        setFilter={setFilter}
        filter={filter}
      />
    </>
  );
};

export default OrderHistoryContainer;
