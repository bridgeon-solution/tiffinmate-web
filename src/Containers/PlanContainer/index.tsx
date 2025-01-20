import { useEffect, useState } from "react";
import PlanComponent from "../../Components/PlanComponent";
import { GetSubscriptionByUser } from "../../Services/OrderService";
import {
  MenuItem,
  Subscription,
  UserSubscription,
} from "../../Components/PlanComponent/type";

function PlanContainer() {
  const [userSubscription, setUserSubscription] = useState<UserSubscription[]>(
    []
  );
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const userId = localStorage.getItem("id") || "";
        if (!userId) {
          return;
        }
        const data = await GetSubscriptionByUser(userId);

        const SubscrptionData = {
          userSubscription: data.result.map(
            (subscription: {
              provider: string;
              total_amount: number;
              subscription: Subscription[];
            }) => {
              const userSub: UserSubscription = {
                providerName: subscription.provider,
                monthly_amount: subscription.total_amount,
                categories: subscription.subscription
                  .map((sub: Subscription) => sub.category)
                  .join(", "),
              };
              return userSub;
            }
          ),
          menuItems: [] as MenuItem[],
        };

        data.result.forEach(
          (subscription: {
            provider: string;
            total_amount: number;
            subscription: Subscription[];
          }) => {
            subscription.subscription.forEach((sub) => {
              const categoryId =
                sub.category === "Breakfast"
                  ? "1"
                  : sub.category === "Lunch"
                  ? "2"
                  : "3";
              sub.fooditems.forEach((item) => {
                SubscrptionData.menuItems.push({
                  category_id: categoryId,
                  day: item.day,
                  food_name: item.food_name,
                });
              });
            });
          }
        );

        setUserSubscription(SubscrptionData.userSubscription);
        setMenuItems(SubscrptionData.menuItems);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchSubscriptionData();
  }, []);

  const daysOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const sortedMenuDays = daysOrder.map((day) => {
    const menuForDay = menuItems.filter((item) => item.day === day);
    const breakfast = menuForDay.find((item) => item.category_id === "1");
    const lunch = menuForDay.find((item) => item.category_id === "2");
    const dinner = menuForDay.find((item) => item.category_id === "3");

    return {
      day,
      breakfast: breakfast?.food_name || "-",
      lunch: lunch?.food_name || "-",
      dinner: dinner?.food_name || "-",
    };
  });

  return (
    <PlanComponent
      sortedMenuDays={sortedMenuDays}
      userSubscription={userSubscription}
    />
  );
}

export default PlanContainer;
