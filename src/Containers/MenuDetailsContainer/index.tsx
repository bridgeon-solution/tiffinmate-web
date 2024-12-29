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
import { useNavigate, useParams } from "react-router-dom";
import SubscriptionPlanComponent from "../../Components/SubscriptionPlanComponent";

function MenuDetailsContainer() {
  type Params = {
    id: string;
    menuId: string;
  };
  const { id, menuId } = useParams<Params>();
  const providerId = id || "";
  const menuid = menuId || "";
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("Breakfast");
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [dailyModal, setDailyModal] = useState<boolean>(false);
  const [subscriptionModal, setSubscriptionModal] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const categories = [
    {
      id: "0193ce2c-ab58-7b6f-8470-7462704e8638",
      name: "Breakfast",
      image: BreakFast,
      description:
        "Morning Glory: A Feast to Jumpstart Your Day,A Feast to Jumpstart Your Day",
    },
    {
      id: "0193ce2d-5a2b-7a4c-b75a-aeaa23f3e6b2",
      name: "Lunch",
      image: Lunch,
      description:
        "Midday Marvels: Lunchtime Delights Await,A Feast to Jumpstart Your Day",
    },
    {
      id: "0193ce2d-862c-7c4f-b3c2-7ee4c8e7113e",
      name: "Dinner",
      image: Dinner,
      description:
        "Dinner Delights: An Evening of Culinary Elegance ,A Feast to Jumpstart Your Day",
    },
  ];

  const handlePay = (modalType: "daily" | "subscription") => {
    if (selectedCategories.length === 0) {
      toast.warn("Please select at least one category.");
      return;
    }
    navigate("order");
    handleClose(modalType);
  };

  const handleClose = (modalType: "daily" | "subscription") => {
    if (modalType === "daily") {
      setDailyModal(false);
    } else if (modalType === "subscription") {
      setSubscriptionModal(false);
    }
    setSelectedCategories([]);
    setSelectedDate("");
    setTotalAmount(0);
  };

  useEffect(() => {
    if (selectedDate && selectedCategories.length > 0) {
      const is_subscription = dailyModal ? false : true;
      CalculateTotal(
        selectedDate,
        selectedCategories,
        providerId,
        menuid,
        is_subscription
      ).then((response) => {
        if (response && response.data && response.data.result) {
          setTotalAmount(response.data.result);
        }
      });
    }
  }, [selectedCategories, selectedDate, dailyModal, subscriptionModal]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleCategorySelect = async (id: string) => {
    const newSelectedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];
    setSelectedCategories(newSelectedCategories);

    if (selectedDate) {
      const is_subscription = dailyModal ? false : true;
      const response = await CalculateTotal(
        selectedDate,
        newSelectedCategories,
        providerId,
        menuid,
        is_subscription
      );
      if (response?.data?.result) {
        setTotalAmount(response.data.result);
      }
    }
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchMenu = async () => {
    const res = await FetchMenuDetails(providerId, menuid);

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
        setDailyModal={setDailyModal}
        setSubscriptionModal={setSubscriptionModal}
      />
      {dailyModal && (
        <DailyPlanComponent
          open={dailyModal}
          handleClose={() => handleClose("daily")}
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategorySelect={handleCategorySelect}
          totalAmount={totalAmount}
          selectedDate={selectedDate}
          handlePay={() => handlePay("daily")}
          handleDateChange={handleDateChange}
        />
      )}
      {subscriptionModal && (
        <SubscriptionPlanComponent
          open={subscriptionModal}
          handleClose={() => handleClose("subscription")}
          categories={categories}
          selectedCategories={selectedCategories}
          selectedDate={selectedDate}
          handlePay={() => handlePay("subscription")}
          handleDateChange={handleDateChange}
          totalAmount={totalAmount}
          handleCategorySelect={handleCategorySelect}
        />
      )}
    </>
  );
}
export default MenuDetailsContainer;
