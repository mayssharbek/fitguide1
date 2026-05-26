 import { useEffect, useState } from 'react';
import './MealLogsSection.css';

const MealLogsSection = ({ MealLogsTitle, MealLogsDes }) => {
  const [data, setData] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    mealsCount: 0
  });

 const [filter , setFilter]=useState("All")
  const [mealsList, setMealsList] = useState([]);

  const GOAL = {
    calories: 2100,
    protein: 140,
    carbs: 230,
    fats: 70
  };
  

  const loadData = () => {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("meals") || "{}");

    const dailyMeals = stored[today] ||{
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snack: []
    };

    let calories = 0, protein = 0, carbs = 0, fats = 0, count = 0;
    let allMealsArray = [
     ...dailyMeals.Breakfast,
     ...dailyMeals.Lunch,
     ...dailyMeals.Dinner,
     ...dailyMeals.Snack
    ];
    setMealsList(allMealsArray)

    Object.keys(dailyMeals).forEach(type => {
      dailyMeals[type].forEach(item => {
        calories += item.kcal ||item.calories|| 0;
        protein += item.protein || 0;
        carbs += item.carbs  ||0;
        fats += item.fats ||  0;
        count++;
   
        allMealsArray.push({ ...item, type: type });
      });
    });

    setData({ calories, protein, carbs, fats, mealsCount: count });
    setMealsList(allMealsArray); 
  };

  useEffect(() => {
    loadData();
    window.addEventListener("mealsUpdated", loadData);
    return () => window.removeEventListener("mealsUpdated", loadData);
  }, []);

  const percent = (value, goal) => Math.min((value / goal) * 100, 100);

  const lastMeal = mealsList.length > 0 ? mealsList[mealsList.length - 1] : null;
  const isTypeDone = (type) => mealsList.some((m) => m.type === type);

  const INITIAL_MEALS = [
    {
      id: 1,
      name: "Oatmeal",
      type: "Breakfast",
      icon: "🥣",
      calories: 350,
      protein: 18,
      carbs: 42,
      fats: 9,
      time : "11:00 Am"}]

      

   const filterMeals = filter==="All" ? mealsList : mealsList.filter(m=>m.type===filter)

   const handleDelete = (id) => {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("meals") || "{}");

    Object.keys(stored[today]).forEach(type => {
      stored[today][type] = stored[today][type].filter(
        m => m.instanceId !== id
      );
    });

    localStorage.setItem("meals", JSON.stringify(stored));
    window.dispatchEvent(new Event("mealsUpdated"));
  };


  return (
    <div className="summary-page">
      <h1>{MealLogsTitle}</h1>
      <p>{MealLogsDes}</p>

      {/* كرت السعرات */}
      <div className="cardMealLogs">
        <h4>CALORIES CONSUMED</h4>
        <h1>{data.calories} <span>kcal</span></h1>
        <p>
          Goal: {GOAL.calories} kcal —{" "}
          <span className="green">
            {GOAL.calories - data.calories > 0 ? GOAL.calories - data.calories : 0} left
          </span>
        </p>
        <div className="progress">
          <div
            className="fill green"
             style={{ width:` ${percent(data.calories, GOAL.calories)}%` }}
          >
            <span className='percent-text'>
              {Math.round(percent(data.calories, GOAL.calories))}%
            </span>
          </div>
        </div>
      </div>

    
      <div className='cardMealLogs'>
        <h3>MEALS LOGGED</h3>
        <h1>{data.mealsCount} <span>meals</span></h1>
        <p className='lastDes'>
          {lastMeal?.time ?` Last logged at ${lastMeal.time}` : "No meals logged yet"}
        </p>

        <div className='mealTypePills'>
          {["Breakfast", "Lunch", "Dinner"].map((t) => (
            <span 
              key={t} 
              className={`mealTypePill ${isTypeDone(t) ? "done" : ""}`}
            >
              {isTypeDone(t) ? "✔️ " : "- "}{t}
            </span>
          ))}
        </div>
      </div>



     
      <div className='cardMealLogs'>
        <h4>TODAY MACROS</h4>
        <p className='sub-text'>From logged meals</p>
        <div className='card-header'>
        <div className='macros-row'>
          <div className='macros-box'>
            <h5>PROTINE</h5>
            <h2 className='protine'>{data.protein}g</h2>
            <div className='progress'>
              <div
              className="fill protine"
              style={{ width:` ${percent(data.protein, GOAL.protein)}%` }}
             >
              </div>
            
           </div>
           <p className='goalProtine'>
                  GOAL:{GOAL.protein}g
              </p>
          </div>


          <div className='macros-box'>
            <h5>CARBS</h5>
            <h2 className='carbs'>{data.carbs}g</h2>
            <div className='progress'>
              <div
              className="fill carbs"
              style={{ width:` ${percent(data.carbs, GOAL.carbs)}%` }}
             >
              </div>
            
           </div>
           <p className='goalCarbs'>
                  GOAL:{GOAL.carbs}g
              </p>
          </div>



          <div className='macros-box'>
            <h5>FATS</h5>
            <h2 className='fats'>{data.fats}g</h2>
            <div className='progress'>
              <div
              className="fill fats"
              style={{ width:` ${percent(data.fats, GOAL.fats)}%` }}
             >
              </div>
            
           </div>
           <p className='goalFats'>
             GOAL:{GOAL.fats}g
          </p>
          </div>

          </div>

      </div>
    </div>

    <div className='cardMealLogs'>
        <h2>TODAY LOGGED MEALS
        <span className='badge'>{filterMeals.length}logged</span>
        </h2>
       
        <div className='filters'>
         {["All" , "Breakfast" ,"Lunch" , "Dinner" , "Snack"].map(f=>(
          <button key={f}
             className={filter===f ? "active" : ""}
             onClick={()=>setFilter(f)}
             >
                {f}
          </button>
         ))}
        </div>
        <div className='meals-list'>
        {filterMeals.map(mealsList=>(
          <div key={mealsList.instanceId} className='meal-item'>
     
           <div className="meal-info">
                 <h3>{mealsList.name}</h3>

              <div className="macrosLogs">
                <span>🥩 {mealsList.protein}g</span>
                <span>🍞 {mealsList.carbs}g</span>
                <span>🥑 {mealsList.fats}g</span>
              </div>
            </div>

            <div className="meal-right">
              <span className="kcal">{mealsList.kcal} kcal</span>
              <span className="time">{mealsList.time} </span>

              <button
                className="deleteIcon"
                onClick={() => handleDelete(mealsList.instanceId)}
              >
                delete
              </button>
            </div>

          </div>

        ))}
        </div>
    </div>


    </div>
 )
 }


export default MealLogsSection;