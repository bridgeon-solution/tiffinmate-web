import { useEffect, useState } from "react";
import MenuComponent from "../../Components/MenuComponent";
import { FetchMenuService } from "../../Services/UserService";

function MenuContainer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("BreakFast");
  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };
  interface MenuItem {
    day: string;
    foodname: string;
    description: string;
    price: string;
    categoryname: string;
  }
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const fetchMenu = async () => {
    const res = await FetchMenuService();
    var result = res.data.result;

    setMenu(
      result.filter((item: MenuItem) => item.categoryname === selectedCategory)
    );
  };
  useEffect(() => {
    fetchMenu();
  }, [selectedCategory]);
  return <MenuComponent handleCategory={handleCategory} menu={menu} />;
}

export default MenuContainer;
