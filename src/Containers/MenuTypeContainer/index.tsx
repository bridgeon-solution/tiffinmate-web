import React, { useEffect, useState } from "react";
import MenuTypeComponent from "../../Components/MenuTypeComponent";
import VegImage from "../../Assets/Lunch.webp";
import NonVegImage from "../../Assets/BreakFast.webp";
import PremiumImage from "../../Assets/Dinner.webp";
import { FetchMenu } from "../../Services/UserService";
import { MenuCard } from "../../Components/MenuTypeComponent/type";

const MenuTypeContainer: React.FC = () => {
  const [categoriess, setCategoriess] = useState<MenuCard[]>([]);
  const categories = [
    {
      image: VegImage,
      title: "Veg Options",
      description:
        "Delicious vegetarian meals crafted with fresh and healthy ingredients.",
    },
    {
      image: NonVegImage,
      title: "Non-Veg Options",
      description:
        "Savor the finest non-vegetarian dishes cooked to perfection.",
    },
    {
      image: PremiumImage,
      title: "Premium Dining",
      description:
        "Experience luxury dining with our exclusive premium options.",
    },
  ];
  const fetchMenuDetails = async () => {
    const res = await FetchMenu();
    setCategoriess(res?.data?.result);
  };
  useEffect(() => {
    fetchMenuDetails();
  }, []);

  return <MenuTypeComponent categories={categories} />;
};

export default MenuTypeContainer;
