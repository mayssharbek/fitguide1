import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./MealsSection.css";
import { createMealLogs, getMeals } from "../../services/api";

const MealsSection = ({ titleMeal }) => {

  const [meals, setMeals] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  });

  const [nuirition, setNutiriton] = useState({
    calories:0,
    protein:0,
    carbs:0,
    fats:0
  });

  const navigate = useNavigate();

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

  const handleSwap = (meal) => {

    navigate("/app/foodlibrary", {
      state: {
        mealId: meal.id,
        mealType: meal.meal_type
      }
    });

  };


  const handleAddMeal = async (meal) => {
    console.log("clicked")
    try {
      const today = new Date().toISOString().split("T")[0];

      /*await createMealLogs({
        meal_id: meal.id,
        quantity: 1,
        log_date: today,
        meal_time: meal.meal_type,
      }
      );*/

    const payload = {
      meal_id: meal.id,
      quantity: 1,
      log_date: today,
      meal_time: meal.meal_type,
};
console.log("payload" , payload)

 const response =await createMealLogs(payload)
 console.log("post" , response)
 console.log("meal added")
console.log("PAYLOAD SENT:", payload);
      

      /*setNutiriton((prev) => ({
        calories: prev.calories + Number(meal.calories || 0),
        protein: prev.protein + Number(meal.protein || 0),
        carbs: prev.carbs + Number(meal.carbs || 0),
        fats: prev.fats + Number(meal.fats || 0),
      }));

      console.log("Meal added + macros updated");*/
     window.dispatchEvent(new Event("mealsUpdated"))
    } catch (error) {
      console.log("status" , error.response?.status)
      console.log("backend", error.response?.data);
    }
  };








  const renderMeal = (type) => {

    const foods = meals[type] || [];

    return (
      <div className="meal-card" key={type}>

        <h4>{type}</h4>

        {foods.length > 0 ? (

          foods.map((item) => (

            <div
              key={item.id}
              className="food-item"
            >

              <h2 className="itemName">
                {item.name}
              </h2>

              <p>
                {item.calories} kcal
              </p>

              <p>
                Protein: {item.protein} g
              </p>

              <button
                className="swap"
                onClick={() => handleSwap(item)}
              >
                Swap 🔄
              </button>

              <button
                className="add"
                onClick={() => handleAddMeal(item)}
              >
                Add
              </button>

            </div>

          ))

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

        {["Breakfast", "Lunch", "Dinner", "Snack"].map(renderMeal)}

      </div>

    </div>

  );

};

export default MealsSection;