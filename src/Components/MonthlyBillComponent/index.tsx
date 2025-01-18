import { Box, Modal, Typography } from '@mui/material'
import StyledButton from '../../Atoms/Button'
interface MonthlyBillModalProps {
    openModal: boolean;
    handleClose: () => void;
    handleRenew: () => void;
    handleCancel: () => void;
    payment_id: string | null;
    totalAmount:number
  }
function MonthlyBillModal({
    openModal,
    handleClose,
    handleRenew,
    handleCancel,
    payment_id,
    totalAmount
  }: MonthlyBillModalProps) {
  return (
    <Modal
        open={openModal}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#e6852c",
              mb: 2,
            }}
          >
            Subscription Management
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            Would you like to renew or cancel your subscription?
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            Payment ID: <strong>{payment_id}</strong>
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, fontStyle: "italic" }}
          >
            Total Amount: <strong>{totalAmount}</strong>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <StyledButton
              variant="text"
              onClick={handleClose}
              sx={{
                color: "grey.700",
                textTransform: "none",
              }}
            >
              Close
            </StyledButton>
            <StyledButton
              variant="outlined"
              color="error"
              onClick={handleCancel}
              sx={{
                textTransform: "none",
               
              }}
            >
              Cancel Subscription
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={handleRenew}
              sx={{
                textTransform: "none",
                
              }}
            >
              Renew Subscription
            </StyledButton>
          </Box>
        </Box>
      </Modal>
  )
}

export default MonthlyBillModal