import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import InputField from "../../Atoms/Input";
import { useLocation } from "react-router-dom";

interface OrderFormData {
  formData: {
    user_name: string;
    address: string;
    ph_no: string;
    city: string;
  };
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setOrderId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    user_name: string;
    address: string;
    ph_no: string;
    city: string;
  };
  loading: boolean;
}

const OrderComponent: React.FC<OrderFormData> = ({
  formData,
  handleSubmit,
  handleChange,
  errors,
  setSelectedCategories,
  setOrderId,
  setDate,
  loading,
}) => {
  const { state } = useLocation();
  const { categories, orderId, date } = state || {};
  setSelectedCategories(categories);
  setOrderId(orderId);
  setDate(date);
  const user=localStorage.getItem("user");

  return (
    <Box
      sx={{
        maxWidth: 600,
        mt: 10,
        ml: { md: "25%", xs: 0 },
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom mt={5} mb={3}>
        Payment details
      </Typography>

      {/* Form  */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <InputField
          label="Full Name"
          name="user_name"
          value={user}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
       
        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <Typography variant="body2" color="error">
          {errors.address}
        </Typography>
        <InputField
          label="Current Location"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <Typography variant="body2" color="error">
          {errors.city}
        </Typography>
        <InputField
          label="Phone Number"
          name="ph_no"
          value={formData.ph_no}
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <Typography variant="body2" color="error">
          {errors.ph_no}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: "#f97f29",
            color: "#fff",
            "&:hover": { backgroundColor: "#f96c0a" },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Submit Details"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default OrderComponent;
