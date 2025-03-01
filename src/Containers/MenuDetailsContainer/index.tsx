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
import { PostOrder, PostSubscriptionOrder } from "../../Services/OrderService";
import { CircularProgress, Box, Typography } from "@mui/material";

function MenuDetailsContainer() {
  const { id, menuId } = useParams();
  const providerId = id || "";
  const menuid = menuId || "";
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "019522f2-8a7c-783e-99dc-ef52f5260586"
  );
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [dailyModal, setDailyModal] = useState<boolean>(false);
  const [subscriptionModal, setSubscriptionModal] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const[error,setError]=useState<string>("")
  const userId=localStorage.getItem("id");
  
  const userid=userId||""
  const categories = [
    {
      id: "019522f2-8a7c-783e-99dc-ef52f5260586",
      name: "Breakfast",
      image: BreakFast,
      description:
        "Morning Glory: A Feast to Jumpstart Your Day,A Feast to Jumpstart Your Day",
    },
    {
      id: "019522f2-a971-7fb3-ab86-88e064149bb1",
      name: "Lunch",
      image: Lunch,
      description:
        "Midday Marvels: Lunchtime Delights Await,A Feast to Jumpstart Your Day",
    },
    {
      id: "019522f2-d11d-7f90-b354-a5a60f817a47",
      name: "Dinner",
      image: Dinner,
      description:
        "Dinner Delights: An Evening of Culinary Elegance ,A Feast to Jumpstart Your Day",
    },
  ];
  const handlePay = async (modalType: "daily" | "subscription") => {
    if (!userid) {
      toast.warn("Please login to continue");
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }
    if (selectedCategories.length === 0) {
      toast.warn("Please select at least one category.");
      return;
    }
    if (!selectedDate) {
      toast.warn("Please select a date.");
      return;
    }

    // daily plan

    if(modalType==="daily"){
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
      }else{ 
        toast.error(response.error_message || "Failed to place order.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.")
    }

    // subscription plan

  }else if (modalType === "subscription") {
    try {
      const orderData: OrderProp = {
        date: selectedDate,
        menu_id: menuid,
        provider_id: providerId,
        total_price: totalAmount,
        user_id: userid,
      };
      const response = await PostSubscriptionOrder(orderData);

      if (response.status == "success") {
        handleClose(modalType);
        navigate("subscription", {
          state: {
            orderId: response.result,
            categories: selectedCategories,
            date: selectedDate,
           
          },
        });
      }else{
        toast.error(response.error_message || "Failed to place order.");
      }
    } catch (error) {
      toast.warning("Something went wrong. Please try again later.");
    }
  }
}

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
      setError("Failed to fetch menu details. try again later!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, [selectedCategory]);
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