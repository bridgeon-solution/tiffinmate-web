import { useEffect, useState } from "react";
import { MenuItem } from "../../Components/MenuDetailsComponent/type";
import MenuDetailsComponent from "../../Components/MenuDetailsComponent";
import { FetchMenuDetails } from "../../Services/UserService";

function MenuDetailsContainer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("BreakFast");
  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const fetchMenu = async () => {
    const res = await FetchMenuDetails();
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
  return <MenuDetailsComponent handleCategory={handleCategory} menu={menu} />;
}

export default MenuDetailsContainer;
