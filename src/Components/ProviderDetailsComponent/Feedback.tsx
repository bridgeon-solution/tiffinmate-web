import { Box, Input, Typography, Button } from "@mui/material";
import { useState } from "react";
import feedbackImage from '../../Assets/feedback.webp'
import { useParams } from "react-router-dom";
import { provideReview } from "../../Services/ProviderService";
import { toast } from "react-toast";

export const Feedback = () => {
  const userId = localStorage.getItem("id");
  const { id } = useParams();
  const [review, setReview] = useState("");
  const handleInputChange = (event: any) => {
    setReview(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      await provideReview({
        providerId: id,
        userId: userId,
        review: review,
      });
      setReview("");
    } catch (error) {
      toast.error("Error submitting review")
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "300px", sm: "350px", md: "400px" },
        px: { xs: 4, sm: 6, md: 20 },
        py: 2,
        mt: 4,
      }}
    >
      <Box
        component="img"
        src={feedbackImage}
        alt="feedback background"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "30px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            transform: "scaleY(1.1)",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Share Your Feedback and Help Us <br /> Improve!
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: "10px",
          width: { xs: "80%", sm: "38%" },
          padding: "10px 20px",
        }}
      >
        <Input
          placeholder="enter your feedback"
          disableUnderline
          fullWidth
          value={review}
          onChange={handleInputChange}
          name="review"
          sx={{
            paddingLeft: "10px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF9431F9",
            color: "white",
            borderRadius: "10px",
            padding: { xs: "8px 20px", sm: "8px 35px" },
            textTransform: "none",
            marginLeft: "10px",
            "&:hover": { backgroundColor: "#ff8a1c" },
          }}
          onClick={() => handleSubmit()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
