import { useLocation, useNavigate } from 'react-router';
import './MealsSection.css';
import { useEffect, useState } from 'react';

const MealsSection = ({ titleMeal }) => {
  const [meals, setMeals] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  });
  const navigate = useNavigate();

  const SUGGESTED_MEALS = [
    { id: 'm1', name: 'Oatmeal', protein: 10, carbs: 60, fats: 5, kcal: 350 , time:"11:00 Am" },
    { id: 'm2', name: 'Salad', protein: 5, carbs: 15, fats: 10, kcal: 280, time:"10:00 Am" },
  ];


  const load = () => {
    const today = new Date().toISOString().split("T")[0];
    const data = JSON.parse(localStorage.getItem("meals") || "{}");
    if (data[today]) {
      setMeals(data[today]);
    }
  };

  useEffect(() => {
    load();
    window.addEventListener("mealsUpdated", load);
    return () => window.removeEventListener("mealsUpdated", load);
  }, []);

  const handleAddSuggetied = (mealType) => {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("meals") || "{}");

    if (!stored[today]) {
      stored[today] = { Breakfast: [], Lunch: [], Dinner: [], Snack: [] };
    }

    const randomMeal = SUGGESTED_MEALS[0];
    const newEntry = {
      ...randomMeal,
      type: mealType,
      instanceId: Date.now(),
      time : new Date().toLocaleTimeString([] , {hour:"2-digit" , minute:"2-digit"})
    };

    stored[today][mealType].push(newEntry);

    localStorage.setItem("meals", JSON.stringify(stored));
    window.dispatchEvent(new Event("mealsUpdated")); 
  };

  const handleSwap = (meal) => {
    if (!meal || !meal.instanceId) {
      console.log("Error: instanceId is missing");
      return;
    }
    navigate("/app/foodlibrary", {
      state: {
        mealType: meal.type,
        swapTargetId: meal.instanceId
      }
    });
  };

  const renderMeal = (type) => {
    const foods = meals[type] || [];
    return (
      <div className='meal-card' key={type}>
        <h4>{type}</h4>
        {foods.length > 0 ? (
          foods.map((item, i) => (
            <div key={item.instanceId || i} className="food-item">
              <h2 className='itemName'>{item.name}</h2>
              <p>{item.kcal} kcal</p>
              {/* هنا الإصلاح: نمرر الـ item الذي يحتوي على instanceId */}
              <button className='swap' onClick={() => handleSwap(item)}>Swap 🔄</button>
            </div>
          ))
        ) : (
          <div className="no-food">
            <h2>No food</h2>
            <p>0 kcal</p>
          </div>
        )}

        <div className='action'>
          <button className='add' onClick={() => handleAddSuggetied(type)}>Add ✔️</button>
        </div>
      </div>
    );
  };

  return (
    <div className='meals-container'>
      <h1>{titleMeal}</h1>
      <div className='meals-grid'>
        {["Breakfast", "Lunch", "Dinner", "Snack"].map(renderMeal)}
      </div>
    </div>
  );
};

export default MealsSection;