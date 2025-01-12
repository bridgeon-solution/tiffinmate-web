import Dinner from "../../Assets/Dinner.webp";
import DownloadIcon from "@mui/icons-material/Download";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Button,
  Card,
  Grid,
  Grid2,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import StyledButton from "../../Atoms/Button";
import { OrderItem } from "./type";

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

const OrderDetailsComponent: React.FC<{ order: Order }> = ({ order }) => {
  const steps = ["Order Confirmed", "order processed", "order Delivered"];
  const activeStep = order.isDelivered ? steps.length - 1 : steps.length - 2;
  const otherItems = [
    {
      id: "1",
      food: "Chicken Tikka",
      provider: "Spicy Delights",
      image: Dinner,
      price: 450,
      isDelivered: false,
      deliveryDate: "Fri, 2nd Aug",
    },
    {
      id: "2",
      food: "Paneer Butter Masala",
      provider: "Veggie Hub",
      image: Dinner,
      price: 350,
      isDelivered: true,
      deliveryDate: "Thu, 1st Aug",
    },
    {
      id: "3",
      food: "Garlic Naan",
      provider: "North Indian Eats",
      image: Dinner,
      price: 150,
      isDelivered: true,
      deliveryDate: "Thu, 1st Aug",
    },
    {
      id: "4",
      food: "Chocolate Brownie",
      provider: "Sweet Tooth",
      image: Dinner,
      price: 200,
      isDelivered: true,
      deliveryDate: "Thu, 1st Aug",
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, padding: 2, margin: "auto" }}>
      <Card sx={{ width: "100%", padding: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Delivery Address
              </Typography>
              <Typography variant="body1" mt={2} fontWeight="bold">
                {order.address.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.address.address}
                <br />
                {order.address.city}
              </Typography>
              <Typography variant="body2" fontWeight="bold" mt={2}>
                {order.address.phone}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                More actions
              </Typography>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mt={2}
              >
                <Typography>Download Invoice</Typography>
                <StyledButton variant="outlined" sx={{ ml: 2 }}>
                  Download
                </StyledButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ width: "100%", padding: 2, mt: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <img
                src={order.image}
                alt="Order"
                style={{ width: 80, height: 80, marginRight: 16 }}
              />
              <Box>
                <Typography variant="body1">{order.food}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  provider: {order.provider}
                </Typography>
                <Typography variant="body1" fontWeight="bold" mt={1}>
                  ₹{order.price}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
              {steps.map((label, index) => (
                <Step key={label} completed={index <= activeStep}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </Card>
      <Typography fontWeight="bold" mt={4}>
        Other items in this order
      </Typography>
      {otherItems.map((item, id) => (
        <Card key={id} sx={{ width: "100%", padding: 2, mt: 3 }}>
          <Grid container spacing={3} alignItems="center" key={item.id}>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <img
                  src={item.image}
                  alt={item.food}
                  style={{ width: 80, height: 80, marginRight: 16 }}
                />
                <Box>
                  <Typography variant="body1">{item.food}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Provider: {item.provider}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" mt={1}>
                    ₹{item.price}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              <Typography>
                {item.isDelivered ? "Delivered" : "Pending"}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
};

export default OrderDetailsComponent;
