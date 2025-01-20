import React, { useEffect, useState } from "react";
import { FetchMenu } from "../../Services/UserService";
import MenuComponent from "../../Components/MenuComponent";
import { useParams } from "react-router-dom";
import { MenuCard } from "../../Components/MenuComponent/type";
import { CircularProgress, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

const MenuContainer: React.FC = () => {
  const { id } = useParams();

  const [category, setCategory] = useState<MenuCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const fetchMenuDetails = async () => {
    try {
      const providerId = id ?? "";
      const res = await FetchMenu(providerId);
      setCategory(res?.data?.result || []);
      setError("")
    } catch {
      setError("Failed to load menu details. Please try again later!");
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
  
  return (
    <>
      {category.length === 0 ? (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No menus have been added yet.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please check back later.
        </Typography>
      </Box>
      ) : (
        <MenuComponent categories={category} />
      )}
    </>
  );
};

export default MenuContainer;
