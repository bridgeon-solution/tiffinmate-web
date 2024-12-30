import { useEffect, useState } from "react";
import { fetchApprovedProviderDetails } from "../../Services/ProviderService";
import { ProviderComponent } from "../../Components/ProviderComponent";
import { provider } from "../ProviderDetailsContainer/type";
import { toast } from "react-toast";

const ProviderContainer = () => {
  const [providers, setProviders] = useState<provider[]>([]);
  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await fetchApprovedProviderDetails();
        
        if (res && res.result) {
          setProviders(res.result);
        }
      } catch {
        toast.error("Error in fetching Provider Details");
      }
    }
    fetchProviders();
  }, []);
  return <ProviderComponent providers={providers} />;
};
export default ProviderContainer;
