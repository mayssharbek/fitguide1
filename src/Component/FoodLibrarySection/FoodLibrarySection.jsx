import { useEffect, useState } from 'react';
import './FoodLibrarySection.css';
import { useNavigate, useLocation } from 'react-router';

const FoodLibrarySection = ({ titleLibraryFood }) => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
 /* const mealType = location.state?.mealType; */

  
  const foodsData = [
  { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, sugar: "low", iron: "medium", category: "protein" },
  { name: "Beef", calories: 250, protein: 26, carbs: 0, fats: 15, sugar: "low", iron: "high", category: "protein" },
  { name: "Tuna", calories: 132, protein: 28, carbs: 0, fats: 1, sugar: "low", iron: "medium", category: "protein" },
  { name: "Eggs", calories: 70, protein: 6, carbs: 1, fats: 5, sugar: "low", iron: "low", category: "protein" },

  { name: "Rice", calories: 130, protein: 2, carbs: 28, fats: 0.3, sugar: "medium", iron: "low", category: "carbs" },
  { name: "Oats", calories: 389, protein: 17, carbs: 66, fats: 7, sugar: "low", iron: "medium", category: "carbs" },
  { name: "White Bread", calories: 265, protein: 9, carbs: 49, fats: 3.2, sugar: "high", iron: "low", category: "carbs" },
  { name: "Pasta", calories: 131, protein: 5, carbs: 25, fats: 1.1, sugar: "medium", iron: "low", category: "carbs" },


  { name: "Milk", calories: 42, protein: 3.4, carbs: 5, fats: 1, sugar: "medium", iron: "low", category: "dairy" },
  { name: "Cheese", calories: 402, protein: 25, carbs: 1.3, fats: 33, sugar: "low", iron: "low", category: "dairy" },
  { name: "Yogurt", calories: 59, protein: 10, carbs: 3.6, fats: 0.4, sugar: "low", iron: "low", category: "dairy" },

  
  { name: "Apple", calories: 52, protein: 0.3, carbs: 14, fats: 0.2, sugar: "low", iron: "low", category: "fruits" },
  { name: "Banana", calories: 89, protein: 1, carbs: 23, fats: 0.3, sugar: "high", iron: "low", category: "fruits" },
  { name: "Mango", calories: 60, protein: 0.8, carbs: 15, fats: 0.4, sugar: "high", iron: "low", category: "fruits" },
  { name: "Strawberries", calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, sugar: "low", iron: "low", category: "fruits" },

  
  { name: "Broccoli", calories: 55, protein: 3.7, carbs: 11, fats: 0.6, sugar: "low", iron: "medium", category: "vegetables" },
  { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, sugar: "low", iron: "high", category: "vegetables" },
  { name: "Carrot", calories: 41, protein: 0.9, carbs: 10, fats: 0.2, sugar: "medium", iron: "low", category: "vegetables" },
  { name: "Tomato", calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, sugar: "low", iron: "low", category: "vegetables" },


  { name: "Avocado", calories: 160, protein: 2, carbs: 9, fats: 15, sugar: "low", iron: "low", category: "fats" },
  { name: "Almonds", calories: 579, protein: 21, carbs: 22, fats: 50, sugar: "low", iron: "medium", category: "fats" },
  { name: "Olive Oil", calories: 884, protein: 0, carbs: 0, fats: 100, sugar: "low", iron: "low", category: "fats" },


  { name: "Dark Chocolate", calories: 546, protein: 4.9, carbs: 61, fats: 31, sugar: "high", iron: "medium", category: "snacks" },
  { name: "Candy", calories: 500, protein: 0, carbs: 100, fats: 0, sugar: "high", iron: "low", category: "snacks" }

];



  
  useEffect(() => {
    setTimeout(() => setFoods(foodsData), 500);
  }, []);

  const filterFood = () => {
    return foods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  };

 /* const AddFoods = (food, mealType) => {
    if (!mealType) {
      alert("Meal type is undefined!");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0];
  
    const stored = JSON.parse(localStorage.getItem("meals") || "{}");
  
    const dayMeals = stored[today] || {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snack: []
    };
  
    
    dayMeals[mealType].push(food);
  
    const updated = {
      ...stored,
      [today]: dayMeals
    };
  
    localStorage.setItem("meals", JSON.stringify(updated));
  
    
    window.dispatchEvent(new Event("mealsUpdated"));
  
    alert(`Added ${food.name} to ${mealType}`);
  };*/


  const { swapTargetId, mealType } = location.state || {};

const handleSelected = (selectFood) => {
  const today = new Date().toISOString().split("T")[0];
  const stored = JSON.parse(localStorage.getItem("meals") || "{}");

  // تأكدي أن التاريخ موجود في التخزين
  if (!stored[today]) {
    stored[today] = { Breakfast: [], Lunch: [], Dinner: [], Snack: [] };
  }

  if (swapTargetId) {
    // --- حالة الاستبدال (Swap) ---
    // نبحث عن الوجبة القديمة داخل النوع المحدد (مثلاً Lunch)
    const index = stored[today][mealType].findIndex(m => m.instanceId === swapTargetId);

    if (index !== -1) {
      // نستبدل الوجبة القديمة بالجديدة مع الحفاظ على الـ instanceId والـ type
      stored[today][mealType][index] = { 
        ...selectFood, 
        instanceId: swapTargetId,
        type: mealType 
      };
    }
  } else {
    // --- حالة الإضافة الجديدة (Add) ---
    const newEntry = {
      ...selectFood,
      instanceId: Date.now(), // ننشئ ID جديد
      type: mealType || "Breakfast" // نستخدم النوع القادم من الصفحة السابقة
    };
    stored[today][newEntry.type].push(newEntry);
  }

  // حفظ في LocalStorage وتنبيه بقية المكونات
  localStorage.setItem("meals", JSON.stringify(stored));
  window.dispatchEvent(new Event("mealsUpdated"));
  
  // العودة لصفحة الوجبات
  navigate("/app/meals");
};










  const  goToNextPage = ()=>{
    navigate("/dashboard/calories")
  }

  return (
    <div className='Library-container'>
      <h1>{titleLibraryFood}</h1>
      <input
        className='searchFood'
        type='text'
        placeholder='Search food'
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='food-grid'>
        {filterFood().map((food, index) => (
          <div key={index} className='food-card' onClick={()=>handleSelected(food)}>
            <h3>{food.name}:</h3>
            <p>Calories: {food.calories}</p>
            <p>Protein: {food.protein}</p>
            <p>Category: {food.category}</p>
            <p>Sugar: {food.sugar}</p>
            <p>Iron: {food.iron}</p>
            <p>Fats: {food.fats}g</p>
            <button className='add'  onClick={() => handleSelected(food)}>
             {swapTargetId ? "swap" : "➕ Add"}
      </button>
          </div>
        ))}
      </div>
      
      <button className='continue11' onClick={() => navigate("/app")}>Back</button>
      <button className='continue12' onClick={goToNextPage}>continue</button>
    </div>
  );
};

export default FoodLibrarySection;
