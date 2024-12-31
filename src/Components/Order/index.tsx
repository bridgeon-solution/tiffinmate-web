import React from 'react';
import { Box, Typography, Button, } from '@mui/material';
import InputField from '../../Atoms/Input';
import { Form } from 'react-router-dom';


interface OrderFormData{
  formData:{
    name:string;
    address:string;
    phnno:string;
    city:string;
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrderComponent: React.FC<OrderFormData> = ({handleSubmit,handleChange}) => {
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
        <Form onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          name="name"
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <InputField
          label="Address"
          name="address"
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <InputField
          label="Current Location"
          name="city"
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <InputField
          label="Phone Number"
          name="phnno"
          onChange={handleChange}
          required
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
        </Form>
      </Box>
    </Box>
  );
};

export default OrderComponent;
