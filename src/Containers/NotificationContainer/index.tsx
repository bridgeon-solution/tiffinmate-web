import NotificationComponent from "../../Components/NotificationComponent";
import { Notification } from "../../Components/NotificationComponent/type";

const NotificationContainer = () => {
  const notifications: Notification[] = [
    {
      id: "1",
      title: "order placed",
      time: "January 2, 2025 2:28 PM",
    },
    {
      id: "2",
      title: "order processed",
      time: "January 2, 2025 2:27 PM",
    },
    {
      id: "3",
      title: "order out for delivey",
      time: "December 23, 2024 9:02 AM",
    },
    {
      id: "4",
      title: "order delivered",
      time: "December 23, 2024 9:01 AM",
    },
  ];

  return <NotificationComponent notifications={notifications} />;
};

export default NotificationContainer;
