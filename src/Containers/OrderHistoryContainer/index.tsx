import React, { useEffect, useState } from "react";
import OrderHistoryComponent from "../../Components/OrderHistoryComponent";
import BreakFast from "../../Assets/BreakFast.webp";
import axios from "axios";

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

const OrderHistoryContainer: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7009/api/v1/Order?pageSize=120&userId=${userId}`
        );
        const fetchedOrders = response.data.result.allDetails.map(
          (order: any) => ({
            id: order.order_id,
            food: order.details[0]?.foodItemName || "Unknown",
            category: order.details[0]?.category || "Unknown",
            provider: order.provider,
            image: order.details[0]?.foodItemImage || BreakFast,
            price: order.total_price,
            isDelivered: order.payment_status,
            deliveryDate: new Date(order.date).toLocaleDateString(),
            address: {
              name: order.details[0]?.userName || "Unknown",
              address: order.details[0]?.address || "Unknown",
              city: order.details[0]?.city || "Unknown",
              phone: "Not Provided",
            },
          })
        );
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return <OrderHistoryComponent orders={orders} />;
};

export default OrderHistoryContainer;
