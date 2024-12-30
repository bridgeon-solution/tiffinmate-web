import React from 'react';
import { Box, Typography, TextField, Button, Stepper, Step, StepLabel } from '@mui/material';
import InputField from '../../Atoms/Input';

const OrderComponent: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mt:10,
        ml:"25%",
        padding: '20px',
        textAlign: 'center',
        
        borderRadius: '8px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      

     
      <Typography variant="h5" fontWeight="bold" gutterBottom mt={5} mb={3}>
        Payment details
      </Typography>

      {/* Form  */}
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <InputField
          label="Full Name"
          variant="outlined"
          fullWidth
        />
        <InputField
          label="Address"
          variant="outlined"
          fullWidth
        />
        <InputField
          label="Current Location"
          variant="outlined"
          fullWidth
        />
        <InputField
          label="Phone Number"
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: '#f97f29',
            color: '#fff',
            '&:hover': { backgroundColor: '#f96c0a' },
          }}
        >
          Submit Details
        </Button>
      </Box>
    </Box>
  );
};

export default OrderComponent;
