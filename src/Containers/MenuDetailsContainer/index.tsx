import { useEffect, useState } from "react";
import { MenuItem } from "../../Components/MenuDetailsComponent/type";
import MenuDetailsComponent from "../../Components/MenuDetailsComponent";
import { FetchMenuDetails } from "../../Services/UserService";
import { CalculateTotal } from "../../Services/ProviderService";
import DailyPlanComponent from "../../Components/DailyPlanComponent";
import Lunch from "../../Assets/Lunch.webp";
import Dinner from "../../Assets/Dinner.webp";
import BreakFast from "../../Assets/BreakFast.webp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MenuDetailsContainer() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("BreakFast");
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [dailyModal, setDailyModal] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const categories = [
    {
      id: "0193ce2c-ab58-7b6f-8470-7462704e8638",
      name: "BREAKFAST",
      image: BreakFast,
      description:
        "Morning Glory: A Feast to Jumpstart Your Day,A Feast to Jumpstart Your Day",
    },
    {
      id: "0193ce2d-5a2b-7a4c-b75a-aeaa23f3e6b2",
      name: "LUNCH",
      image: Lunch,
      description:
        "Midday Marvels: Lunchtime Delights Await,A Feast to Jumpstart Your Day",
    },
    {
      id: "0193ce2d-862c-7c4f-b3c2-7ee4c8e7113e",
      name: "DINNER",
      image: Dinner,
      description:
        "Dinner Delights: An Evening of Culinary Elegance ,A Feast to Jumpstart Your Day",
    },
  ];

  const handlePay = () => {
    if (selectedCategories.length === 0) {
      toast.warn("Please select at least one category.");
      return;
    }
    navigate("order");
    handleClose();
  };

  const handleClose = () => {
    setDailyModal(false);
  };

  const handleOpen = () => {
    setDailyModal(true);
  };

  useEffect(() => {
    if (selectedDate && selectedCategories.length > 0) {
      CalculateTotal(selectedDate, selectedCategories).then((response) => {
        setTotalAmount(response.data.result);
      });
    }
  }, [selectedCategories, selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleCategorySelect = async (id: string) => {
    const newSelectedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];
    setSelectedCategories(newSelectedCategories);

    if (selectedDate) {
      const response = await CalculateTotal(
        selectedDate,
        newSelectedCategories
      );
      setTotalAmount(response.data.result);
    }
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchMenu = async () => {
    const res = await FetchMenuDetails();
    if (res && res.data && res.data.result) {
      const result = res.data.result;
      setMenu(
        result.filter(
          (item: MenuItem) => item.category_name === selectedCategory
        )
      );
    }
  };
  useEffect(() => {
    fetchMenu();
  }, [selectedCategory]);

  return (
    <>
      <MenuDetailsComponent
        categories={categories}
        handleCategory={handleCategory}
        menu={menu}
        handleOpen={handleOpen}
      />
      {dailyModal && (
        <DailyPlanComponent
          open={dailyModal}
          handleClose={handleClose}
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategorySelect={handleCategorySelect}
          totalAmount={totalAmount}
          selectedDate={selectedDate}
          handlePay={handlePay}
          handleDateChange={handleDateChange}
        />
      )}
    </>
  );
}
export default MenuDetailsContainer;
