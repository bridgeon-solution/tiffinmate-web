import React, { useEffect, useState } from "react";
import { FetchMenu } from "../../Services/UserService";
import MenuComponent from "../../Components/MenuComponent";
import { useParams } from "react-router-dom";
import { MenuCard } from "../../Components/MenuComponent/type";
import { CircularProgress, Box } from "@mui/material";
import { toast } from "react-toastify";

const MenuContainer: React.FC = () => {
  const { id } = useParams();

  const [category, setCategory] = useState<MenuCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchMenuDetails = async () => {
    try {
      const providerId = id ?? "";
      const res = await FetchMenu(providerId);
      setCategory(res?.data?.result || []);
    } catch {
      toast.error("Error fetching menu details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMenuDetails();
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
  return (
    <>
      {category.length === 0 ? (
        <p>Loading menu...</p>
      ) : (
        <MenuComponent categories={category} />
      )}
    </>
  );
};

export default MenuContainer;
