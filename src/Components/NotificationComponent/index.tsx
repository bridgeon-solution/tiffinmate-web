import { Box, Typography, Divider } from "@mui/material";
import { Notification } from "./type";

const NotificationComponent = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Notifications
      </Typography>
      {notifications.map((notification) => (
        <Box>
          <Box sx={{ py: 2 }}>
            <Typography sx={{ color: "#333", fontSize: "16px", mb: 0.5 }}>
              {notification.title}
            </Typography>
            <Typography sx={{ color: "#666", fontSize: "14px" }}>
              At {notification.time}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "#E0E0E0" }} />
        </Box>
      ))}
    </Box>
  );
};
export default NotificationComponent;
