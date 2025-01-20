import { useEffect, useState } from "react";
import { fetchApprovedProviderDetails } from "../../Services/ProviderService";
import { ProviderComponent } from "../../Components/ProviderComponent";
import { provider } from "../ProviderDetailsContainer/type";
import { toast } from "react-toastify";
import { CircularProgress, Box, Typography } from "@mui/material";

const ProviderContainer = () => {
  const [providers, setProviders] = useState<provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error,setError]=useState<string>("")
  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await fetchApprovedProviderDetails();

        if (res && res.result) {
          setProviders(res.result);
          
        }
      } catch {
        setError("Unable to fetch provider details. Please try again later!");
      } finally {
        setLoading(false);
      }
    }
    fetchProviders();
  }, []);
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  if (loading) {
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
  }
  return <ProviderComponent providers={providers} />;
};
export default ProviderContainer;
