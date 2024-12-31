import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import StyledButton from "../../Atoms/Button";
import { category } from "../MenuDetailsComponent/type";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Adjusted for responsiveness
  maxWidth: "600px",
  bgcolor: "#fff",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

interface DailyPlanComponentProps {
  open: boolean;
  handleClose: (modalType: "daily" | "subscription") => void;
  categories: category[];
  selectedCategories: string[];
  handleCategorySelect: (id: string) => void;
  totalAmount: number;
  selectedDate: string;
  handlePay: (modalType: "daily" | "subscription") => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const getDisabledCategories = (selectedDate: string) => {
  const today = new Date();
  const selectedDateTime = new Date(selectedDate);

  if (selectedDateTime.toDateString() === today.toDateString()) {
    const currentHour = today.getHours();
    return {
      breakfast: currentHour >= 9,
      lunch: currentHour >= 12,
      dinner: currentHour >= 18,
    };
  }

  return { breakfast: false, lunch: false, dinner: false };
};

const DailyPlanComponent: React.FC<DailyPlanComponentProps> = ({
  open,
  handleClose,
  categories,
  selectedCategories,
  handleCategorySelect,
  totalAmount,
  selectedDate,
  handlePay,
  handleDateChange,
}) => {
  const disabledCategories = getDisabledCategories(selectedDate);

  return (
    <Modal
      open={open}
      onClose={() => handleClose("daily")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{
            textAlign: { xs: "center", md: "left" },
            fontWeight: "bold",
            color: "#f68b1e",
            mb: 3,
            fontSize: { xs: "20px", md: "24px" },
          }}
        >
          Select Your Plan
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Select Date
          </Typography>
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            sx={{ "& .MuiInputBase-root": { fontSize: "16px" } }}
            InputProps={{
              inputProps: {
                min: new Date().toISOString().split("T")[0],
              },
            }}
          />
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Select Category
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 2,
            mb: 4,
          }}
        >
          {categories.map((category) => {
            const isDisabled =
              (category.name === "Breakfast" && disabledCategories.breakfast) ||
              (category.name === "Lunch" && disabledCategories.lunch) ||
              (category.name === "Dinner" && disabledCategories.dinner);

            return (
              <Box
                key={category.id}
                onClick={() => {
                  if (!isDisabled) handleCategorySelect(category.id);
                }}
                sx={{
                  cursor: isDisabled ? "not-allowed" : "pointer",
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
                  "&:hover": { boxShadow: isDisabled ? "none" : 5 },
                  opacity: isDisabled ? 0.5 : 1,
                  filter: isDisabled ? "blur(1px)" : "none",
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
                    width: "100%",
                    maxWidth: "150px",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                    mx: "auto",
                  }}
                />
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <StyledButton
            variant="outlined"
            onClick={() => handleClose("daily")}
            sx={{
              width: { xs: "45%", sm: "auto" },
            }}
          >
            CANCEL
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => handlePay("daily")}
            sx={{
              width: { xs: "45%", sm: "auto" },
            }}
          >
            PAY ${totalAmount}.00
          </StyledButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DailyPlanComponent;
