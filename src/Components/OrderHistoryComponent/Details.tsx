// types.ts

  
  // OrderDetailsComponent.tsx
  import React from 'react';
  import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Grid,
    Divider,
    useTheme,
    styled,
  } from '@mui/material';
  import {
    Restaurant,
    Person,
    LocationOn,
    Payment,
    ShoppingBasket,
  } from '@mui/icons-material';
import { OrderDetails } from './type';

  
  const InfoSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  }));
  
  const SectionTitle = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  }));
  
  interface OrderDetailsComponentProps {
    orderDetails: OrderDetails;
  }
  
  const getStatusColor = (status: OrderDetails['status']): string => {
    const statusColors = {
      pending: '#ffa726',
      confirmed: '#42a5f5',
      preparing: '#7e57c2',
      out_for_delivery: '#26a69a',
      delivered: '#66bb6a',
      cancelled: '#ef5350',
    };
    return statusColors[status];
  };
  
  const OrderDetailsComponent: React.FC<OrderDetailsComponentProps> = ({ orderDetails }) => {
    const theme = useTheme();
  
    return (
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: theme.spacing(3) ,mt:10 }}>
        {/* Header Section */}
        <Paper sx={{ padding: theme.spacing(3), marginBottom: theme.spacing(3) }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Order Details
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Order ID: {orderDetails.id}
              </Typography>
              <Typography color="textSecondary">
                Placed on: {new Date(orderDetails.orderDate).toLocaleString()}
              </Typography>
            </Box>
            <Chip
              label={orderDetails.status.replace('_', ' ').toUpperCase()}
              sx={{
                backgroundColor: getStatusColor(orderDetails.status),
                color: 'white',
                textTransform: 'capitalize',
              }}
            />
          </Box>
        </Paper>
  
        <Grid container spacing={3}>
          {/* Restaurant Info */}
          <Grid item xs={12} md={6}>
            <InfoSection>
              <SectionTitle variant="h6">
                <Restaurant /> Restaurant Information
              </SectionTitle>
              <Typography variant="body1" fontWeight={500}>
                {orderDetails.restaurant}
              </Typography>
            </InfoSection>
          </Grid>
  
          {/* Customer Info */}
          <Grid item xs={12} md={6}>
            <InfoSection>
              <SectionTitle variant="h6">
                <Person /> Customer Information
              </SectionTitle>
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" fontWeight={500}>
                  {orderDetails.customer.name}
                </Typography>
                <Typography color="textSecondary">
                  {orderDetails.customer.email}
                </Typography>
                <Typography color="textSecondary">
                  {orderDetails.customer.phone}
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start" gap={1}>
                <LocationOn color="action" />
                <Typography variant="body2" color="textSecondary">
                  {orderDetails.customer.address}
                </Typography>
              </Box>
            </InfoSection>
          </Grid>
  
          {/* Order Items */}
          <Grid item xs={12}>
            <InfoSection>
              <SectionTitle variant="h6">
                <ShoppingBasket /> Order Summary
              </SectionTitle>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetails.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                        <TableCell align="right">${item.totalPrice.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
  
              <Box sx={{ marginTop: 3, padding: theme.spacing(2) }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={8} />
                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Subtotal:</Typography>
                      <Typography>${orderDetails.payment.subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Delivery Fee:</Typography>
                      <Typography>${orderDetails.payment.deliveryFee.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Tax:</Typography>
                      <Typography>${orderDetails.payment.tax.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography fontWeight={600}>Total:</Typography>
                      <Typography fontWeight={600}>
                        ${orderDetails.payment.total.toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </InfoSection>
          </Grid>
  
          {/* Payment Info */}
          <Grid item xs={12}>
            <InfoSection>
              <SectionTitle variant="h6">
                <Payment /> Payment Information
              </SectionTitle>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {orderDetails.payment.method}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Payment Status
                  </Typography>
                  <Chip
                    label={orderDetails.payment.status}
                    color={
                      orderDetails.payment.status === 'completed'
                        ? 'success'
                        : orderDetails.payment.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </InfoSection>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default OrderDetailsComponent;