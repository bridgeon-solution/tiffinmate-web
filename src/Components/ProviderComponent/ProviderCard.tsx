import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchApprovedProviderDetails } from "../../Services/ProviderService";
import { Link } from "react-router-dom";

interface provider {
  providerId: string;
  image: string;
  resturent_name: string;
}

export const ProviderCard = () => {
  const [providers, setProviders] = useState<provider[]>([]);
  useEffect(() => {
    async function fetchProviders() {
      const res = await fetchApprovedProviderDetails();
      setProviders(res.result);
    }
    fetchProviders();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ px: { xs: 2, md: 8 }, py: { xs: 2, md: 6 } }}
      >
        {providers.map((p) => (
          <Grid item xs={6} sm={6} md={3} key={p.providerId}>
            <Link to={`/provider/${p.providerId}`} style={{ textDecoration: "none" }}>
              <Card sx={{ borderRadius: 4 }}>
                <CardMedia
                  component="img"
                  sx={{ height: "210px" }}
                  alt={p.resturent_name}
                  image={p.image}
                />
                <CardContent sx={{ padding: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {p.resturent_name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 1,
                    }}
                  ></Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
