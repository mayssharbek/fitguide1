import { useEffect, useState } from "react";
import "./MealPlanSection.css";
import { useLocation, useNavigate } from "react-router";

import {
  getMealPlan,
  generateMealPlan,
  deleteMealPlan,
  swapMeal,
} from "../../services/api";

const Days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const MealPlanSection = ({ MealPlanTitle, MealPlanDesc }) => {
  const [plan, setPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState("monday");
  const navigate = useNavigate();
  const location = useLocation()

  // ================= LOAD API =================
  const loadMealPlan = async () => {
    try {
      const data = await getMealPlan();

      console.log("API RES:", data);

      if (Array.isArray(data) && data.length > 0) {
        setPlan(data[0]);
      } else {
        setPlan(null);
      }
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  useEffect(() => {
    loadMealPlan();
  }, [location.state?.refresh]);

  // ================= GENERATE =================
  const handleGenerate = async () => {
    try {
      const res = await generateMealPlan();
      console.log("GENERATE:", res);

      if (res?.meal_plan) {
        setPlan(res.meal_plan);
      }

     await loadMealPlan(); // refresh from server
    } catch (err) {
      console.log("GENERATE ERROR:", err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      if (!plan) return;

      await deleteMealPlan(plan.id);
      setPlan(null);
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  // ================= SWAP =================
  /*const handleSwap = async (itemId, mealId) => {
    try {
      await swapMeal(itemId, mealId);
      loadMealPlan(); // refresh
    } catch (err) {
      console.log("SWAP ERROR:", err);
    }
  };*/
  const handleSwap = (item) => {
    navigate("/app/foodlibrary", {
      state: {
        mealPlanItemId: item.id,
        mealType: item.meal_type,
        day: item.day_of_week,
      },
    });
  };

  /*const loadMeal = async(mealId) =>{
    console.log("LOADING MEAL " , mealId)
    const meal = await getMealPlan1(mealId)
    console.log("meal res" , meal)
    setMealDetalies((prev)=>({
      ...prev ,
      [mealId]: meal
    })       
    )
  }

  useEffect(()=>{
    plan?.meal_plan_items?.forEach((item)=>{
      loadMeal(item.meal_id)
    })
  },[plan])*/



  // ================= FILTER ITEMS =================
  const filteredItems =
    plan?.meal_plan_items?.filter(
      (item) => item.day_of_week === selectedDay
    ) || [];
    console.log("mealplanitem",plan?.meal_plan_items)

  console.log("PLAN:", plan);
  console.log("ITEMS:", plan?.meal_plan_items);
  console.log("FILTERED:", filteredItems);
 

  // ================= EMPTY STATE =================
  if (!plan) {
    return <p>No meal plan found</p>;
  }

  return (
    <div className="MealPlanContainer">

      {/* HEADER */}
      <div className="headerMealPlan">
        <div>
          <h2>{MealPlanTitle}</h2>
          <p>{MealPlanDesc}</p>
        </div>

        <button className="primary-btnMeal" onClick={handleGenerate}>
          Generate New Plan
        </button>
      </div>



      <div style={{ background: "#eee", padding: 10 }}>
        <p>Items count: {plan?.meal_plan_items?.length}</p>
        <p>Selected Day: {selectedDay}</p>
        <p>Plan ID: {plan?.id}</p>
      </div>




      {/* DAYS */}
      <div className="days">
        {Days.map((d) => (
          <button
            key={d}
            className={selectedDay === d ? "active" : ""}
            onClick={() => setSelectedDay(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {/* ITEMS */}
      <div className="gridMealPlan">
        {filteredItems.map((item) => (
          <div className="cardMealPlan" key={item.id}>

            <div className="badgeMealPlan">
              {item.meal_time} • {item.meal?.calories} kcal
            </div>

            <h4>{item.meal?.name}</h4>

            <p>
              P:{item.meal?.protein} C:{item.meal?.carbs} F:{item.meal?.fat}
            </p>

            <div className="actionsMealPlan">
              <button onClick={() => handleSwap(item)}
              >
                Swap 🔄
              </button>
            </div>

          </div>
        ))}
    




      </div>

      {/* DELETE */}
      <button className="deleteMealPlan" onClick={handleDelete}>
        Delete Plan
      </button>

    </div>
  );
};

export default MealPlanSection;