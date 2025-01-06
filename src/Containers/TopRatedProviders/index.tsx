import { useEffect, useState } from "react";
import TopProvidersComponent from "../../Components/TopRatedProviders";
import { fetchApprovedProviderDetails } from "../../Services/ProviderService";
import { Provider } from "../../Components/TopRatedProviders/type";
import { Box, CircularProgress, Typography } from "@mui/material";

function TopProvidersContainer() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
        setLoading(true)
      try {
        const response = await fetchApprovedProviderDetails();
        setProviders(response.result);
      } catch (err) {
        setError("Failed to fetch providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">{error}</Typography>;
  return <TopProvidersComponent providers={providers} />;
}

export default TopProvidersContainer;
