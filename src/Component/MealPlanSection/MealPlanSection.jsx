import { useEffect, useState } from 'react';
import './MealPlanSection.css'
import { useNavigate } from 'react-router';


const Days = ["sunday" , "monday" , "tuesday" , "wednesday" , "thursday" , "friday" ,"saturday"]
const initialPlan={
    id:1,
   items: [
    {
      id: 101,
      day_of_week: "sunday",
      meal_type: "Breakfast",
      name: "Oatmeal",
      calories: 350,
      protein: 20,
      carbs: 45,
      fat: 10,
    },
    {
      id: 102,
      day_of_week: "sunday",
      meal_type: "Lunch",
      name: "Chicken Rice",
      calories: 600,
      protein: 45,
      carbs: 70,
      fat: 15,
    },
    {
      id: 103,
      day_of_week: "monday",
      meal_type: "Dinner",
      name: "Salmon Salad",
      calories: 500,
      protein: 35,
      carbs: 20,
      fat: 25,
    },
  ],
};

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  d.setDate(d.getDate() - day);
  return d;
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}



const MealPlanSection = ({MealPlanTitle , MealPlanDesc}) => {
 
 const[plan , setPlan] = useState(initialPlan);
 const [selectdDay , setSelectedDay] = useState("");
 const [startOfWeek , setStartOfWeek] = useState(getStartOfWeek(new Date()));
 const[showLibrary , setShowLibrary]= useState(false)
 const[selectedItem , setSelectedItem] =useState(null);
 const navigate = useNavigate()

 const generatePlan = ()=>{

     const newPlan = {
        ...initialPlan,
        items:initialPlan.items.map((item)=>
        ({
                ...item,
                calories: item.calories+Math.floor(Math.random()*50)
            })),
        }
        setPlan(newPlan);

 }


    const deletePlan = ()=>{
        setPlan(null)
    }

    /*const handleSwap = (item)=>{
      navigate("/app/foodlibrary", {
        state: {
          mealType: item.type,
          swapTargetId : item.instanceId
        }})
        }*/
        const handleSwap = (day, type) => {
          navigate("/app/foodlibrary", {
            state: {
              from: "mealplan",
              day:day,
              type:type
            }
          });
        };
        useEffect(() => {

          const loadPlan = () => {
        
            const stored =
              JSON.parse(localStorage.getItem("mealPlan")) || {};
        
            setPlan(stored);
        
          };
        
          loadPlan();
        
          window.addEventListener("mealPlanUpdated",loadPlan);
        
          return () => {
        
            window.removeEventListener("mealPlanUpdated",loadPlan);
          }; 
        }, []);

    const selectMeal = (meal) => {
      const updated = plan.items.map((item) =>
        item.id === selectedItem.id ? { ...meal, id: item.id, day_of_week: item.day_of_week }: item
      );
    
      setPlan({ ...plan, items: updated });
      setShowLibrary(false);
    };

    const logMeal = (item)=>{
          alert(`logged:${item.name}`)
    }
 
  const filteredItem =
   plan?.items?.filter((i) => i.day_of_week === selectdDay) || [];

  
   const nextWeek = ()=>{
    const next = new Date(startOfWeek);
    next.setDate(next.getDate()+7);
    setStartOfWeek(next);
   }


   const prevWeek = ()=>{
    const prev = new Date(startOfWeek);
      prev.setDate(prev.getDate()-7);
      setStartOfWeek(prev);
   }

  

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate()+6);

   

  const getDateOfDay = (dayIndex)=>{
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate()+dayIndex)
    return date
  }



  return (
    <div className='MealPlanContainer'>
      <div className="headerMealPlan">
        <div>
          <h2> {MealPlanTitle}</h2>
          <p>{MealPlanDesc}</p>
        </div>

        <button className="primary-btnMeal" onClick={generatePlan}>
           Generate New Plan
        </button>
      </div>

      <div className="week-nav">
        <button onClick={prevWeek}>←</button>
        <span>This Week {formatDate(startOfWeek)} {formatDate(endOfWeek)}</span> 
        <button onClick={nextWeek}>→</button>
      </div>

      <div className="days">
        {Days.map((d , index) => {
          const date = getDateOfDay(index)
          return(
            <button
            key={d}
            className={selectdDay === d ? "active" : ""}
            onClick={() => setSelectedDay(d)}
          >
           <div>{d}</div>
           <small>
           {date.toLocaleDateString("en-US", {
                                    month: "short",
                                     day: "numeric",
            })};
           </small>
          </button>
          )
        }     
        )}
      </div>

      <div className="gridMealPlan">
        {filteredItem.map((item) => (
          <div className="cardMealPlan" key={item.id}>
            <div className="badgeMealPlan">
              {item.meal_type} • {item.calories} kcal
            </div>

            <div className="mealPlan-info">
              <div>
                <h4>{item.name}</h4>
                <p>
                  P:{item.protein} C:{item.carbs} F:{item.fat}
                </p>
              </div>
            </div>

            <div className="actionsMealPlan">
             <button onClick={() => handleSwap(selectdDay, item.meal_type)}> Swap 🔄</button>
              <button onClick={() => logMeal(item)}> Log</button>
            </div>
          </div>
        ))}
      </div>

      {plan && (
        <button className="deleteMealPlan" onClick={deletePlan}>
           Delete Plan
        </button>
      )}
    </div>

  )
}

export default MealPlanSection
