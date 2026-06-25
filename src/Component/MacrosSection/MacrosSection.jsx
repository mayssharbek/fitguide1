import { useEffect, useState } from 'react';
import './MacrosSection.css'
import { useNavigate } from 'react-router';
import { getMealLogs } from '../../services/api';

const MacrosSection = ({MacrosTitle}) => {
  const navigate = useNavigate()
    const [macros , setMacros] = useState({
        protein : 0 ,
        carbs : 0,
        fats : 0
    });
    const[logs , setLogs] = useState([])
    const goals = {
        protein : 140,
        carbs : 230,
        fats:70

    };


    const calculateMacros = async() => {
      try {
        const logs = await getMealLogs();
        console.log("logs" , logs)
  
        let p = 0,
            c = 0,
            f = 0;
  
        logs.data.forEach((log) => {
          const meal = log.meal; // مهم: لازم backend يرجّع meal داخل log
  
          p += Number(meal?.protein || 0) * (log.quantity || 1);
          c += Number(meal?.carbs ||  0) * (log.quantity || 1);
          f += Number(meal?.fats||  0) * (log.quantity || 1);
        });
  
        setMacros({ protein: p, carbs: c, fats: f , mealsCount: logs.length });
  
        console.log("Macros update");
      } catch (err) {
        console.log(err);
      }
    };
    const loadLogs = async()=>{
      try{
        const res = await getMealLogs();
        console.log("MEAL LOGS:", res);
        setLogs(Array.isArray(res?.data)? res.data : []);
       
        setLogs(res.data || []);
      } 
      catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      loadLogs();
  
      const handler = ()=>{
        loadLogs()
      } 
      window.addEventListener("mealsUpdated" , handler)
  
      return()=>{
        window.removeEventListener("mealsUpdated" , handler)
      }
    }, []);
  
    useEffect(() => {
      calculateMacros();
    }, [logs]);
        
       


        /*Object.values(meals).forEach((mealArray)=>{
            mealArray.forEach((food)=>{
                p += Number(food.protine || 0 );  
                c += Number(food.carbs|| 0);
                f += Number(food.fats || 0);
            });
        });
        setMacros({protein:p , carbs:c , fats:f})
    }*/

       
       
    

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
