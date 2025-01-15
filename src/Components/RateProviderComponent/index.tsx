import React, { useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledButton from "../../Atoms/Button";
import { AddRating } from "../../Services/ProviderService";
import { RatingValues } from "../OrderHistoryComponent/type";
import { toast } from "react-toastify";

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  provider: { provider: string; provider_id: string };
}

const RatingModal: React.FC<RatingModalProps> = ({
  open,
  onClose,
  provider,
}) => {
  const [rating, setRating] = useState(0);
  const userId = localStorage.getItem("id");
  const values: RatingValues = {
    providerId: provider.provider_id as string,
    userId: userId as string,
    rating,
  };
  const handleSubmit = async () => {
    const res = await AddRating(values);
    if (res.status === "success") {
      toast.success("Hurrah!! you have added rating");
      onClose();
    } else {
      toast.error(
        "Whoops! Something went wrong. Don’t worry, we’re sending our best bugs to fix it! 🐛✨"
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h5"
          sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
        >
          Rate Us!
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          How would you rate {provider.provider}?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Box
              key={star}
              component="span"
              sx={{
                cursor: "pointer",
                fontSize: "4rem",
                color: star <= rating ? "#FFD700" : "#e0e0e0",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => setRating(star)}
            >
              ★
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <StyledButton
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform: "none",
              px: 3,
            }}
          >
            No Thanks!
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleSubmit}
            disabled={!rating}
            sx={{
              textTransform: "none",
              px: 3,
            }}
          >
            Submit
          </StyledButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default RatingModal;
