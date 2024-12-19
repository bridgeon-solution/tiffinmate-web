import { useEffect, useState } from "react";
import MenuComponent from "../../Components/MenuComponent";
import { FetchMenuService } from "../../Services/UserService";
import { MenuItem } from "../../Components/MenuComponent/type";

function MenuContainer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("BreakFast");
  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const fetchMenu = async () => {
    const res = await FetchMenuService();
    if (res && res.data && res.data.result) {
      const result = res.data.result;
      setMenu(
        result.filter(
          (item: MenuItem) => item.categoryname === selectedCategory
        )
      );
    }
  };
  useEffect(() => {
    fetchMenu();
  }, [selectedCategory]);
  return <MenuComponent handleCategory={handleCategory} menu={menu} />;
}

export default MenuContainer;
