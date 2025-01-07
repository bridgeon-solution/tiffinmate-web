import React from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  onOpenInvoice: () => void;
}



const OrderModal: React.FC<OrderModalProps> = ({
  open,
  onClose,
  onOpenInvoice,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={{
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
}}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body2" gutterBottom>
          Thank you for your order. You can view your invoice below.
        </Typography>
        <Button
          variant="contained"
          
          startIcon={<VisibilityIcon />}
          onClick={onOpenInvoice} 
          sx={{ mt: 2,backgroundColor:"#e6852c" }}
        >
          Open Invoice
        </Button>
      </Box>
    </Modal>
  );
};

export default OrderModal;
