import { useEffect, useState } from 'react'
import './CaloriesSection.css'
import { useNavigate } from 'react-router';

const CaloriesSection = ({caloriesTitle}) => {
    const [total , setTotal] = useState(0);
    const goal = 2200;
    const navigate = useNavigate();

    useEffect(() => {
      const loadData = ()=>{
        const today = new Date().toISOString().split("T")[0];
          const stored = JSON.parse(localStorage.getItem("meals") || "{}")
          const meals = stored[today] || {};
          const sum = Object.values(meals).flat().reduce((acc , food)=>acc+(food?.kcal || food?.calories || 0),0);
          setTotal(sum);
      }
         loadData();
         window.addEventListener("mealsUpdate" , loadData);
         return ()=>{
          window.removeEventListener("mealsUpdated" , loadData)
         }
        
      
      }, []);

      const remaining =  goal - total
      const percent = Math.min((total / goal)*100 , 100);
      

 
      const handleSubmit =()=>{
        navigate("/dashboard/meals")
      }
      const goToFoodPage= ()=>{
        navigate("/dashboard/foodlibrary"
        , {state : {mealType : "Snack"}});
      }

  return (

    <div className='calories-container'>

        <h3>{caloriesTitle}</h3>


      <div className="circle-wrapper">
       <div
        className="circle-progress"
        style={{
          background: `conic-gradient(#7cc000 ${percent}%, #e5e5e5 ${percent}%)`
        }}
      >
        <div className="circle-inner">
          <h1>{total}</h1>
          <p>kcal consumed</p>
          <p>Goal: {goal}</p>
          <span>{remaining} remaining</span>
        </div>
      </div>
    </div>

  
    <div className="message">
      ⭐ You're doing great today!
    </div>


    <button className="btn green" onClick={goToFoodPage}>+ Add Meal Manually</button>

    <button className='btn outline' onClick={()=>navigate("/app/mealplan")}> 📅 Go to Weekly Planner</button>

      
   
  </div>
       
  

   
  )
}

export default CaloriesSection
