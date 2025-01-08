import { useEffect, useState } from "react";
import { fetchApprovedProviderDetails } from "../../Services/ProviderService";
import { ProviderComponent } from "../../Components/ProviderComponent";
import { provider } from "../ProviderDetailsContainer/type";
import { toast } from "react-toastify";
import { CircularProgress, Box } from "@mui/material";

const ProviderContainer = () => {
  const [providers, setProviders] = useState<provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await fetchApprovedProviderDetails();

        if (res && res.result) {
          setProviders(res.result);
        }
      } catch {
        toast.error("Error in fetching Provider Details");
      } finally {
        setLoading(false);
      }
    }
    fetchProviders();
  }, []);

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
