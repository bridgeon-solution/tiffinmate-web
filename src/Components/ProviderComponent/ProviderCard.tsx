import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { providerDetailsProp } from "../../Containers/ProviderDetailsContainer/type";

export const ProviderCard = ({ providers }: providerDetailsProp) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ px: { xs: 2, md: 8 }, py: { xs: 2, md: 6 } }}
      >
        {providers.map((p) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={p.provider_id}>
            <Link
              to={`/provider/${p.provider_id}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ borderRadius: 4,maxWidth: "100%"}}>
                <CardMedia
                  component="img"
                  sx={{height: { xs: "180px", sm: "210px" },
                  objectFit: "cover",
                 }}
                  alt={p.resturent_name}
                  image={p.image}
                />
                <CardContent sx={{  padding: { xs: 2, md: 3 },
  textAlign: "center", }}>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: {sm: "1.2rem", lg: "1.5rem"}
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
