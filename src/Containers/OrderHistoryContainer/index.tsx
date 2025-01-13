import React, { useEffect, useState } from "react";
import OrderHistoryComponent from "../../Components/OrderHistoryComponent";
import { Order } from "../../Components/OrderHistoryComponent/type";
import { Box } from "@mui/material";
import { FetchOrdersByUser } from "../../Services/UserService";

const OrderHistoryContainer: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [otherItems, setOtherItems] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const user = localStorage.getItem("id");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = user ?? "";
        const response = await FetchOrdersByUser(userId);
        const fetchedOrders = response.data.result.allDetails.flatMap(
          (order: any) =>
            order.details.map((item: any) => ({
              order_id: order.order_id,
              menu_id: order.menu_id,
              provider: order.provider,
              user_id: order.user_id,
              user: order.user,
              total_price: order.total_price,
              payment_status: order.payment_status,
              cancelled_at: order.cancelled_at,
              date: new Date(order.date).toLocaleDateString(),
              foodItemName: item.foodItemName,
              foodItemImage: item.foodItemImage,
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
        console.log(response.data.result.allDetails);
      } catch (error) {
        setError("Error fetching orders. Please try again later.");
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);
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

  return (
    <>
      {error && <Box className="errormessage">{error}</Box>}
      <OrderHistoryComponent
        orders={orders}
        setSelectedOrder={setSelectedOrder}
        selectedOrder={selectedOrder}
        otherItems={otherItems}
      />
    </>
  );
};

export default OrderHistoryContainer;
