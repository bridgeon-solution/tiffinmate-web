import { useParams } from "react-router-dom";
import { ProviderDetailsComponent } from "../../Components/ProviderDetailsComponent";
import { useEffect, useState } from "react";
import { fetchProviderDetails } from "../../Services/ProviderService";
import { Provider } from "./type";

export const ProviderDetailsContainer = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState<Provider>();

  useEffect(() => {
    const fetchProvider = async (id: string) => {
      const res = await fetchProviderDetails(id);
      if (res && res.result) {
        setProvider(res.result);
      }
    };
    if (id) fetchProvider(id);
  }, [id]);
  return <ProviderDetailsComponent provider={provider} />;
};
