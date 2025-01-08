import { Box, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { category } from "../MenuDetailsComponent/type";
import StyledButton from "../../Atoms/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "600px",
  bgcolor: "#fff",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
interface SubscriptionPlanComponentProps {
  open: boolean;
  handleClose: (modalType: "daily" | "subscription") => void;
  categories: category[];
  selectedCategories: string[];
  selectedDate: string;
  handlePay: (modalType: "daily" | "subscription") => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalAmount: number;
  handleCategorySelect: (id: string) => void;
  isCalculating: boolean;
}
const SubscriptionPlanComponent: React.FC<SubscriptionPlanComponentProps> = ({
  open,
  handleClose,
  categories,
  selectedCategories,
  selectedDate,
  handlePay,
  handleDateChange,
  totalAmount,
  handleCategorySelect,
  isCalculating,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#f68b1e",
            mb: 3,
          }}
        >
          Select Your Plan
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Select Start Date
          </Typography>
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            sx={{ "& .MuiInputBase-root": { fontSize: "16px" } }}
            InputProps={{
              inputProps: {
                min: new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0],
              },
            }}
          />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Select Category
        </Typography>
        <Box
          sx={{
            display: { md: "flex", xs: "block" },
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          {categories.map((category) => (
            <Box
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "8px",
                border: selectedCategories.includes(category.id)
                  ? "2px solid #f68b1e"
                  : "none",
                p: 1,
                bgcolor: selectedCategories.includes(category.id)
                  ? "#f68b1e"
                  : "#fff",
                color: selectedCategories.includes(category.id)
                  ? "#fff"
                  : "#000",
                boxShadow: 3,
                "&:hover": { boxShadow: 5 },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: selectedCategories.includes(category.id)
                    ? "#fff"
                    : "#f68b1e",
                }}
              >
                {category.name}
              </Typography>
              <Box
                component="img"
                src={category.image}
                alt={category.name}
                sx={{
                  width: "150px",
                  height: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <StyledButton
            variant="outlined"
            onClick={() => handleClose("subscription")}
          >
            CANCEL
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => handlePay("subscription")}
            disabled={isCalculating || totalAmount === 0}
          >
            PAY ${totalAmount}
          </StyledButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubscriptionPlanComponent;
