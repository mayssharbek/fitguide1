import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MealsSection.css";
import { createMealLogs, getMealPlan } from "../../services/api";

const MealsSection = ({ titleMeal }) => {
  const navigate = useNavigate();

  const [meals, setMeals] = useState({
    Breakfast: null,
    Lunch: null,
    Dinner: null,
    Snack: null,
  });

  const [weekRange, setWeekRange] = useState({ start: "", end: "" });


  const getWeekRange = () => {
    const start = new Date();
  
    const end = new Date();
    end.setDate(start.getDate() + 6);
  
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    };
  };

  useEffect(() => {
    const range = getWeekRange();
      setWeekRange(range);
  }, []);

  









  useEffect(() => {
    const loadMeals = async () => {
      try {
        const plans = await getMealPlan();

        console.log("PLAN:", plans);

        if (!plans || plans.length === 0) return;

        const mealPlan = plans[0];

        const today = new Date()
          .toLocaleDateString("en-US", { weekday: "long" })
          .toLowerCase();

        const grouped = {
          Breakfast: null,
          Lunch: null,
          Dinner: null,
          Snack: null,
        };

        mealPlan.meal_plan_items.forEach((item) => {
          if (item.day_of_week.toLowerCase() !== today) return;

          const meal = {
            ...item.meal,
            mealPlanItemId: item.id,
            mealTime: item.meal_time,
          };

          switch (item.meal_time.toLowerCase()) {
            case "breakfast":
              grouped.Breakfast = meal;
              break;

            case "lunch":
              grouped.Lunch = meal;
              break;

            case "dinner":
              grouped.Dinner = meal;
              break;

            case "snack":
              grouped.Snack = meal;
              break;

            default:
              break;
          }
        });

        setMeals(grouped);
      } catch (err) {
        console.log(err);
      }
    };

    loadMeals();
    const handleUpdate = ()=>{
      loadMeals();
    }
    window.addEventListener("mealPlanUpdated" , handleUpdate)
    return()=>{
      window.removeEventListener("mealPlanUpdated" , handleUpdate)
    }
  }, []);

  const handleSwap = (meal) => {
    navigate("/app/foodlibrary", {
      state: {
        mealPlanItemId: meal.mealPlanItemId,
        mealType: meal.mealTime,
      },
    });
  };

  const handleAddMeal = async (meal) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const payload = {
        meal_id: meal.id,
        quantity: 1,
        log_date: today,
        meal_time: meal.mealTime,
      };

      console.log("PAYLOAD:", payload);

      await createMealLogs(payload);

      window.dispatchEvent(new Event("mealsUpdated"));

      alert("Meal added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const renderMeal = (type) => {
    const meal = meals[type];

    return (
      <div className="meal-card" key={type}>
        <h4>{type}</h4>

        {meal ? (
          <div className="food-item">
            <h2 className="itemName">{meal.name}</h2>

            <p>{meal.calories} kcal</p>

            <p>Protein: {meal.protein} g</p>

            <p>Carbs: {meal.carbs} g</p>

            <p>Fat: {meal.fats} g</p>

            <button
              className="swap"
              onClick={() => handleSwap(meal)}
            >
              Swap 🔄
            </button>

            <button
              className="add"
              onClick={() => handleAddMeal(meal)}
            >
              Add
            </button>
          </div>
        ) : (
          <div className="no-food">
            <h2>No food</h2>
            <p>0 kcal</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="meals-container">
      <h1>{titleMeal}</h1>

      <div className="meals-grid">
      <h2>
       Week: {weekRange.start} → {weekRange.end}
      </h2>
        {["Breakfast", "Lunch", "Dinner", "Snack"].map(renderMeal)}
      </div>
    </div>
  );
};

export default MealsSection;