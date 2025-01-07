import { OrderHistory } from "../../Components/OrderHistoryComponent/type";
import OrderHistoryComponent from "../../Components/OrderHistoryComponent";
import Dinner from "../../Assets/Dinner.webp";
import BreakFast from "../../Assets/BreakFast.webp";

const OrderHistoryContainer = () => {
  const orders: OrderHistory[] = [
    {
      id: "1",
      status: "delivered",
      category: "Breakfast",
      name: "Fish and Veggie",
      restaurant: "Champaran Restaurant",
      imageUrl: BreakFast,
      trackingEvents: [
        { status: "Order Placed", time: "7:00 AM" },
        { status: "Order Processed", time: "7:30 AM" },
        { status: "Out for Delivery", time: "7:45 AM" },
        { status: "Order Delivered", time: "8:00 AM" },
      ],
    },
    {
      id: "2",
      status: "processing",
      category: "Dinner",
      name: "Chicken Curry",
      restaurant: "Champaran Restaurant",
      imageUrl: Dinner,
      trackingEvents: [
        { status: "Order Placed", time: "6:00 PM" },
        { status: "Order Processed", time: "6:30 PM" },
      ],
    },
  ];

  return <OrderHistoryComponent orders={orders} />;
};

export default OrderHistoryContainer;
