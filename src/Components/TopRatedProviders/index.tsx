import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material";
import { provider } from "../../Containers/ProviderDetailsContainer/type";
import { Link } from "react-router-dom";

export const StyledLogo = styled(Box)(({ theme }) => ({
  textAlign: "center",
  ".mainText": {
    fontFamily: "serif",
    fontSize: "1.5rem",
    marginBottom: theme.spacing(1),
  },
  ".subText": {
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
}));

const TopProvidersComponent = ({ providers }: { providers: provider[] }) => {
  return (
    <Box sx={{ py: 8, px:{md:0 ,xs:3} }}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontFamily: "serif", mb: 6 }}
      >
        Top Rated Providers
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {providers?.map((provider) => (
          <Grid item xs={12} sm={6} md={3} key={provider.provider_id}>
             <Link
              to={`/provider/${provider.provider_id}`}
              style={{ textDecoration: "none" }}
            >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={provider.image}
                alt={provider.resturent_name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <StyledLogo>
                  <Box className="mainText">{provider.resturent_name}</Box>
                  <Box className="subText">restaurant & lounge</Box>
                </StyledLogo>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopProvidersComponent;
