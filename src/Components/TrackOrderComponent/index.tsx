
import { Box, Typography } from "@mui/material";
import { OrderTrack } from "../OrderHistoryComponent/type";

const TrackOrderComponent = ({ events }: { events: OrderTrack[] }) => (
  <Box sx={{ p: 3, mt: 15 }}>
    <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
      Your Order Was Successful !!
    </Typography>
    <Box sx={{ position: "relative" }}>
      {events.map((event, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "flex-start", mb: 4, position: "relative" }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#FF9F43",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box component="span" sx={{ color: "white", fontSize: 20 }}>
              ✓
            </Box>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontWeight: 500, mb: 0.5 }}>{event.status}</Typography>
            <Typography sx={{ color: "#666", fontSize: "14px" }}>{event.time}</Typography>
            {event.location && (
              <Typography sx={{ color: "#666", fontSize: "14px" }}>{event.location}</Typography>
            )}
          </Box>
          {index < events.length - 1 && (
            <Box
              sx={{
                position: "absolute",
                left: 15,
                top: 32,
                width: 2,
                height: "100%",
                bgcolor: "#FF9F43",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

export default TrackOrderComponent;
