import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {  getMeals, swapMeal } from "../../services/api";
import "./FoodLibrarySection.css";

const FoodLibrarySection = ({ titleLibraryFood }) => {
  const location = useLocation();
  console.log("location" , location)
  const navigate = useNavigate();

  const { mealPlanItemId , mealType}  = location.state || {};

  /*const foodsData = [
    { id: 1, name: "Chicken Breast", calories: 165 },
    { id: 2, name: "Beef", calories: 250 },
    { id: 3, name: "Rice", calories: 130 },
    { id: 4, name: "Oats", calories: 389 },
  ]*/

  
  const [meals, setMeals] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  });
  const [search, setSearch] = useState("");

  const allMeals =[
    ...meals.Breakfast,
    ...meals.Lunch,
    ...meals.Dinner,
    ...meals.Snack
  ]

  useEffect(() => {

    const loadMeals = async()=>{
      try{
        const response = await getMeals();
        if(!response || !response.data){
          console.log("no meal or unauthorized")
          return
        }
      console.log("response" , response)
        const groupedMeals = {
          Breakfast: [],
          Lunch: [],
          Dinner: [],
          Snack: []
        };
        
       response.data.forEach((meal) => {
        
          if (meal.meal_type === "breakfast") {
            groupedMeals.Breakfast.push(meal);
          }
        
          if (meal.meal_type === "lunch") {
            groupedMeals.Lunch.push(meal);
          }
        
          if (meal.meal_type === "dinner") {
            groupedMeals.Dinner.push(meal);
          }
        
          if (meal.meal_type === "snack") {
            groupedMeals.Snack.push(meal);
          }
        
        });
        
        setMeals(groupedMeals);
      }
  
       catch(error){
        console.log(error)
      }
    };
       loadMeals()
       
       }
    
    

  , []);


  const handleSelectMeal = async (food) => {
    try {
      /*if(food.catogery !== mealType){
        alert("the meal doesent match type" , mealType)
        return
      }*/
    const res=  await swapMeal(mealPlanItemId, food.id);
    console.log("res" , res)
      console.log( "itemid" ,mealPlanItemId)
      // 🔥 يرجع ويعمل refresh
      navigate("/app/mealplan", {
        state: { 
          refresh:Date.now()
        },
      });

    } catch (err) {
      console.log(err);
    }
  };

  const filtered = allMeals.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Library-container">

      <h1>{titleLibraryFood}</h1>

      <input
        placeholder="Search food"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="food-grid">
        {filtered.map((food) => (
          <div key={food.id} className="food-card">
            <h3>{food.name}</h3>
            <p>{food.calories} kcal</p>
            <button onClick={() => handleSelectMeal(food)}>
              Swap
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FoodLibrarySection;