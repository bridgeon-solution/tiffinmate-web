import React, { useEffect} from "react";
import VegImage from "../../Assets/Lunch.webp";
import NonVegImage from "../../Assets/BreakFast.webp";
import PremiumImage from "../../Assets/Dinner.webp";
import { FetchMenu } from "../../Services/UserService";
// import { MenuCard } from "../../Components/MenuComponent/type";
import MenuComponent from "../../Components/MenuComponent";

const MenuContainer: React.FC = () => {
  // const [category, setCategory] = useState<MenuCard[]>([]);
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
    // setCategory(res?.data?.result);
    return res;
  };
  useEffect(() => {
    fetchMenuDetails();
  }, []);

  return <MenuComponent categories={categories} />;
};

export default MenuContainer;
