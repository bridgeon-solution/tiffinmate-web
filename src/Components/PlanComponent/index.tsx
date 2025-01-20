import React, { useState } from "react";
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
  Grid,
} from "@mui/material";
import { UserSubscription } from "./type";
import feedback from "../../Assets/feedback.webp";

interface PlanComponentProps {
  sortedMenuDays: {
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
  }[];
  userSubscription: UserSubscription[];
}

const PlanComponent: React.FC<PlanComponentProps> = ({
  sortedMenuDays,
  userSubscription,
}) => {
  const [flippedStates, setFlippedStates] = useState<boolean[]>([]);

  const handleFlip = (index: number) => {
    setFlippedStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Subscriptions
      </Typography>

      <Grid container spacing={2}>
        {userSubscription.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "400px",
                transition: "transform 0.7s",
                transformStyle: "preserve-3d",
                cursor: "pointer",
                transform: flippedStates[index] ? "rotateY(180deg)" : "none",
              }}
              onClick={() => handleFlip(index)}
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
                  image={feedback}
                  alt="Food plate"
                />
                <CardContent>
                  <Typography variant="h5" fontWeight={800} textAlign="center">
                    Foodie Plan
                  </Typography>
                  {[
                    { label: "Vendor", value: item.providerName },
                    { label: "Menu", value: "veg" },
                    { label: "Categories", value: item.categories },
                    {
                      label: "Amount Per Month",
                      value: "$" + item.monthly_amount,
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

                              padding: "10px",
                            }}
                          >
                            Days
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",

                              padding: "10px",
                            }}
                          >
                            Breakfast
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",

                              padding: "10px",
                            }}
                          >
                            Lunch
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold",

                              padding: "10px",
                            }}
                          >
                            Dinner
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedMenuDays.map((row) => (
                          <TableRow key={row.day}>
                            <TableCell
                              sx={{
                                color: "#e6852c",
                                fontWeight: "bold",

                                padding: "10px",
                              }}
                            >
                              {row.day}
                            </TableCell>
                            <TableCell sx={{ padding: "10px" }}>
                              {row.breakfast}
                            </TableCell>
                            <TableCell sx={{ padding: "10px" }}>
                              {row.lunch}
                            </TableCell>
                            <TableCell sx={{ padding: "10px" }}>
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlanComponent;
