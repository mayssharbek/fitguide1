import { useEffect, useState } from 'react';
import './MacrosSection.css'
import { useNavigate } from 'react-router';

const MacrosSection = ({MacrosTitle}) => {
  const navigate = useNavigate()
    const [macros , setMacros] = useState({
        protein : 0 ,
        carbs : 0,
        fats : 0
    });
    const goals = {
        protein : 140,
        carbs : 230,
        fats:70

    };


    const calculateMacros = () => {
        const today = new Date().toISOString().split("T")[0];
        const stored = JSON.parse(localStorage.getItem("meals") || "{}");
        const meals = stored[today] || { Breakfast: [], Lunch: [], Dinner: [], Snack: [] };
  
        let p = 0, c = 0, f = 0;


        Object.values(meals).forEach((mealArray)=>{
            mealArray.forEach((food)=>{
                p += Number(food.protine || 0 );  
                c += Number(food.carbs|| 0);
                f += Number(food.fats || 0);
            });
        });
        setMacros({protein:p , carbs:c , fats:f})
    }

        useEffect(()=>{

            calculateMacros();
         /*   "mealsUpdated" */
            window.addEventListener("mealsUpdated", calculateMacros);
  
  
          return () => window.removeEventListener("mealsUpdated", calculateMacros);
      
        },[])
       
        
    

     const items = [
        {
         name : "Protein",
         icon: "🥩",
         value: macros.protein,
         goal: goals.protein,
         color: "#7cc000"
    },
    {
      name: "Carbs",
      icon: "🍞",
      value: macros.carbs,
      goal: goals.carbs,
      color: "#f57c00"
    },
    {
      name: "Healthy Fats",
      icon: "🥑",
      value: macros.fats,
      goal: goals.fats,
      color: "#e53935"
    }
  ];
        
     
  return (
    <div className='macros-container'>
        <h3>{MacrosTitle}</h3>
         {items.map((item , index)=>{
            const percent = Math.min((item.value/item.goal)*100 , 100)
            return (
                <div key={index} className='macros-item'>
                <div className='macros-header'>
                <div>
                    <span className='icon'>{item.icon}</span>
                    <strong>{item.name}</strong>
                    <p>Goal : {item.goal}
                    Consumend {Math.round(item.value)}g</p>   
                </div>
                <span className='percent'>
                     %{Math.round(percent)}
                </span>
                </div>
                <div className='progress-bar'>
                    <div className='progress-fill' style={{width :`${percent}%`,
                     background: item.color}}>
                    </div>
                </div>
                
                </div>
            )
         })}
         <div className='warning'>
            You nearing you Carbs !limit
         </div>
         <button onClick={()=>{navigate("/app/meallogs")}} className='logs'>Meal Logs</button>
    </div>
  )
}

export default MacrosSection
