import { useParams } from "react-router-dom";
import { ProviderDetailsComponent } from "../../Components/ProviderDetailsComponent";
import { useEffect, useState } from "react";
import { fetchProviderDetails } from "../../Services/ProviderService";
import { ProviderDetails } from "./type";
import { Box, CircularProgress, Typography } from "@mui/material";

export const ProviderDetailsContainer = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState<ProviderDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error,setError]=useState<string>("")

  useEffect(() => {
    const fetchProvider = async (id: string) => {
      try {
        const res = await fetchProviderDetails(id);
        if (res && res.result) {
          setProvider(res.result);
        }
      } catch{
        setError("Unable to retrieve provider details at this time. Please try again later");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      setLoading(true);
      fetchProvider(id);
    }
  }, [id]);
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
  return <ProviderDetailsComponent provider={provider} />;
};
