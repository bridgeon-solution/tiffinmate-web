import { useEffect, useState } from "react";
import {
  MenuItem,
  OrderProp,
} from "../../Components/MenuDetailsComponent/type";
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
import { PostOrder } from "../../Services/OrderService";
import { CircularProgress, Box } from "@mui/material";

function MenuDetailsContainer() {
  const { id, menuId } = useParams();
  const providerId = id || "";
  const menuid = menuId || "";
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "0193ce2c-ab58-7b6f-8470-7462704e8638"
  );
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [dailyModal, setDailyModal] = useState<boolean>(false);
  const [subscriptionModal, setSubscriptionModal] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const userId = localStorage.getItem("id");

  const userid = userId || "";
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
  const handlePay = async (modalType: "daily" | "subscription") => {
    if (selectedCategories.length === 0) {
      toast.warn("Please select at least one category.");
      return;
    }
    if (!selectedDate) {
      toast.warn("Please select a date.");
      return;
    }
    try {
      const orderData: OrderProp = {
        date: selectedDate,
        menu_id: menuid,
        provider_id: providerId,
        total_price: totalAmount,
        user_id: userid,
      };
      const response = await PostOrder(orderData);

      if (response.status == "success") {
        handleClose(modalType);
        navigate("order", {
          state: {
            orderId: response.result,
            categories: selectedCategories,
            date: selectedDate,
          },
        });
      }
    } catch (error) {
      toast.error("error creating order");
    }
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
    const fetchTotalAmount = async () => {
      if (selectedDate && selectedCategories.length > 0) {
        setIsCalculating(true);
        const is_subscription = dailyModal ? false : true;
        try {
          const response = await CalculateTotal(
            selectedDate,
            selectedCategories,
            menuid,
            is_subscription
          );
          setTotalAmount(response?.data?.result || 0);
        } catch {
          setTotalAmount(0);
        } finally {
          setIsCalculating(false);
        }
      } else {
        setTotalAmount(0);
      }
    };
    fetchTotalAmount();
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
        menuid,
        is_subscription
      );
      if (response?.data?.result) {
        setTotalAmount(response.data.result);
      } else {
        setTotalAmount(0);
      }
    }
  };
  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await FetchMenuDetails(menuid, selectedCategory);
      if (res && res.data && res.data.result) {
        setMenu(res?.data?.result);
      }
    } catch (error) {
      toast.error("Failed to fetch menu details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, [selectedCategory]);
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
          isCalculating={isCalculating}
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
          isCalculating={isCalculating}
        />
      )}
    </>
  );
}
export default MenuDetailsContainer;
