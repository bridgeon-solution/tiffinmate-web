import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsOfProvider } from "../../Services/ProviderService";
import { Review } from "../../Containers/ProviderDetailsContainer/type";

export const ReviewCard = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async (id: string) => {
      const res = await fetchReviewsOfProvider(id);
      if (res && res.result) {
        const data = await res.result;
        setReviews(data.slice(0, 3));
      }
    };
    if (id) fetchReviews(id);
  }, [id]);

  return (
    <Box sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Why People Choose Us?
      </Typography>
      <Grid container spacing={3} justifyContent="center" px={8}>
        {reviews.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.username}>
            <Card
              sx={{
                p: 4,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                height: "300px",
              }}
            >
              <Box
                component="img"
                src={r.image}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, fontStyle: "italic", color: "text.secondary" }}
                >
                  “{r.review}”
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  {r.username}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
