import React from "react";
import image from "../../Assets/feedback.webp";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import StyledButton, { BackButton } from "../../Atoms/Button";
import { categories, MenuDay, UserSubscription } from "./type";

interface PlanComponentProps {
  handleFlip: () => void;
  isFlipped: boolean;
  sortedMenuDays: MenuDay[];
  categoryNames: string;
  userSubscription: UserSubscription;
  categories: categories[];
}
const PlanComponent: React.FC<PlanComponentProps> = ({
  handleFlip,
  isFlipped,
  sortedMenuDays,
  categoryNames,
  userSubscription,
  categories,
}) => {
  return (
    <>
    <BackButton/>
    <Box
      sx={{
        perspective: "1000px",
        width: "100%",
        maxWidth: "400px",
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Subscriptions
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "400px",
          transition: "transform 0.7s",
          transformStyle: "preserve-3d",
          cursor: "pointer",
          transform: isFlipped ? "rotateY(180deg)" : "none",
        }}
        onClick={handleFlip}
      >
        <Card
          sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            width: "100%",
            height: "400px",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="Food plate"
          />
          <CardContent>
            <Typography variant="h5" fontWeight={800} textAlign="center">
              Foodie Plan
            </Typography>
            {[
              { label: "Vendor", value: userSubscription.providerName },
              { label: "Categories", value: categoryNames },
              {
                label: "Total Amount Paid",
                value: "$" + userSubscription.paid_amount,
              },
              {
                label: "Amount Per Month",
                value: "$" + userSubscription.monthly_amount,
              },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography color="#e6852c" fontWeight="bold">
                  {item.label}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <StyledButton
                variant="contained"
                sx={{ width: "90px", height: "30px" }}
              >
                cancel
              </StyledButton>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            width: "100%",
            height: "400px",
            transform: "rotateY(180deg)",
          }}
        >
          <CardContent>
            <Typography variant="h6" align="center" fontWeight={800}>
              MENU
            </Typography>
            <TableContainer component={Paper} sx={{ height: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        border: "none",
                        padding: "10px",
                      }}
                    >
                      Days
                    </TableCell>
                    {categories.map((category) => (
                      <TableCell
                        key={category.id}
                        sx={{
                          fontWeight: "bold",
                          border: "none",
                          padding: "10px",
                        }}
                      >
                        {category.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedMenuDays.map((row) => (
                    <TableRow key={row.day}>
                      <TableCell
                        sx={{
                          color: "#e6852c",
                          fontWeight: "bold",
                          border: "none",
                          padding: "10px",
                        }}
                      >
                        {row.day}
                      </TableCell>
                      <TableCell sx={{ border: "none", padding: "10px" }}>
                        {row.breakfast}
                      </TableCell>
                      <TableCell sx={{ border: "none", padding: "10px" }}>
                        {row.lunch}
                      </TableCell>
                      <TableCell sx={{ border: "none", padding: "10px" }}>
                        {row.dinner}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
    </>
  );
};

export default PlanComponent;
