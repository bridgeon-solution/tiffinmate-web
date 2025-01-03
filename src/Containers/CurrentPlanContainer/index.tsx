import { useState } from 'react'
import { categories, MenuDay } from '../../Components/CurrentPlanComponent/type';
import PlanComponent from '../../Components/CurrentPlanComponent';

function PlanContainer() {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const userSubscription = {
      providerId: "provider456",
      providerName: "Granula Haven",
      monthly_amount: 234,
      paid_amount: 3456,
      categories: "category1, category2",
      menuId: "menu789",
    };
    
    const categories:categories[] = [
      { id: "category1", name: "Breakfast" },
      { id: "category2", name: "Lunch" },
      { id: "category3", name: "Dinner" },
    ];
    
    const menuItems = [
      { category_id: "category1", day: "Monday", food_name: "Dosa" },
      { category_id: "category1", day: "Tuesday", food_name: "puttu" },
      { category_id: "category1", day: "Wednesday", food_name: "Porotta" },
      { category_id: "category1", day: "Thursday", food_name: "Masala Dosa" },
      { category_id: "category1", day: "Friday", food_name: "Porotta" },
      { category_id: "category1", day: "Saturday", food_name: "Dosa" },
      { category_id: "category1", day: "Sunday", food_name: "puttu" },
      { category_id: "category2", day: "Monday", food_name: "Sadya" },
      { category_id: "category2", day: "Tuesday", food_name: "Biriyani" },
      { category_id: "category2", day: "Wednesday", food_name: "Meals" },
      { category_id: "category2", day: "Thursday", food_name: "sadya" },
      { category_id: "category2", day: "Friday", food_name: "Fried rice" },
      { category_id: "category2", day: "Saturday", food_name: "Meals" },
      { category_id: "category2", day: "Sunday", food_name: "Biriyani" },
    ];

    const handleFlip = (): void => {
      setIsFlipped(!isFlipped);
    };
  
    const daysOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
  
    const sortedMenuDays: MenuDay[] = daysOrder.map((day) => {
      const breakfast = menuItems.find(
        (item) => item.day === day && item.category_id === "category1"
      );
      const lunch = menuItems.find(
        (item) => item.day === day && item.category_id === "category2"
      );
      const dinner = menuItems.find(
        (item) => item.day === day && item.category_id === "category3"
      );
  
      return {
        day,
        breakfast: breakfast ? breakfast.food_name : "No meal available",
        lunch: lunch ? lunch.food_name : "No meal available",
        dinner: dinner ? dinner.food_name : "No meal available",
      };
    });
    const categoryIds = userSubscription.categories.split(", ");
    const categoryNames = categoryIds
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter((name) => name)
      .join(", ");
  return (
    <PlanComponent 
    handleFlip= {handleFlip}
    isFlipped={isFlipped}
    sortedMenuDays={sortedMenuDays}
    categoryNames={categoryNames}
    userSubscription={userSubscription}
    categories={categories}/>
  )
}

export default PlanContainer