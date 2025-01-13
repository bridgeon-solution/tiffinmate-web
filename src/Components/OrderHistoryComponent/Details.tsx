import {
  Box,
  Card,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Order } from "./type";
interface OrderDetailsComponentProps {
  order: Order;
  otherItems: Order[];
}
const OrderDetailsComponent: React.FC<OrderDetailsComponentProps> = ({
  order,
  otherItems,
}) => {
  const steps = ["Order Confirmed", "order processed", "order Delivered"];
  const activeStep = order.payment_status ? steps.length - 1 : steps.length - 2;
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
                {order.address.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.address.address}
                <br />
                {order.address.city}
              </Typography>
              <Typography variant="body2" fontWeight="bold" mt={2}>
                {order.address.ph_no}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ width: "100%", padding: 2, mt: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <img
                src={order.foodItemImage}
                alt="Order"
                style={{ width: 80, height: 80, marginRight: 16 }}
              />
              <Box>
                <Typography variant="body1">{order.foodItemName}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  provider: {order.provider}
                </Typography>
                <Typography variant="body1" fontWeight="bold" mt={1}>
                  ₹{order.total_price}
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
      {otherItems && otherItems.length > 0 && (
        <>
          <Typography fontWeight="bold" mt={4}>
            Other items in this order
          </Typography>
          {otherItems?.map((item, id) => (
            <Card key={id} sx={{ width: "100%", padding: 2, mt: 3 }}>
              <Grid
                container
                spacing={3}
                alignItems="center"
                key={item.order_id}
              >
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.foodItemImage}
                      alt={item.foodItemName}
                      style={{ width: 80, height: 80, marginRight: 16 }}
                    />
                    <Box>
                      <Typography variant="body1">
                        {item.foodItemName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Provider: {item.provider}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" mt={1}>
                        ₹{item.total_price}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
                  <Typography>
                    {item.payment_status ? "Delivered" : "Pending"}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default OrderDetailsComponent;
