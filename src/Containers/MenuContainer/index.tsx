import React, { useEffect, useState } from "react";
import { FetchMenu } from "../../Services/UserService";
import MenuComponent from "../../Components/MenuComponent";
import { useParams } from "react-router-dom";
import { MenuCard } from "../../Components/MenuComponent/type";

const MenuContainer: React.FC = () => {
  const { id } = useParams();

  const [category, setCategory] = useState<MenuCard[]>([]);
  const fetchMenuDetails = async () => {
    const providerId = id ?? "";
    const res = await FetchMenu(providerId);
    setCategory(res?.data?.result);
  };

  useEffect(() => {
    fetchMenuDetails();
  }, [id]);

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
