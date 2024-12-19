import { useEffect } from "react";
import { fetchProvider } from "../Services/ProviderService";
import { ProviderComponent } from "../Components/ProviderComponent";

export const Provider = () => {
  useEffect(() => {
    const fetchProviders = async () => {
      await fetchProvider();
    };
    fetchProviders();
  }, []);
  return (
    <>
      <ProviderComponent />
    </>
  );
};
