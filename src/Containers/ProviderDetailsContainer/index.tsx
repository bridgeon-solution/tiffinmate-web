import { useParams } from "react-router-dom";
import { ProviderDetailsComponent } from "../../Components/ProviderDetailsComponent";
import { useEffect, useState } from "react";
import { fetchProviderDetails } from "../../Services/ProviderService";
import { ProviderDetails } from "./type";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";

export const ProviderDetailsContainer = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState<ProviderDetails>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProvider = async (id: string) => {
      try {
        const res = await fetchProviderDetails(id);
        if (res && res.result) {
          setProvider(res.result);
        }
      } catch{
        toast.error("Error fetching provider details");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      setLoading(true);
      fetchProvider(id);
    }
  }, [id]);
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
  return <ProviderDetailsComponent provider={provider} />;
};
