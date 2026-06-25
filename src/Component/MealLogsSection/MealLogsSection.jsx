 import { useEffect, useState } from 'react';
import './MealLogsSection.css';
import { getMealLogs , deleteMealLogs } from '../../services/api';

const MealLogsSection = ({ MealLogsTitle, MealLogsDes }) => {
  /*const [data, setData] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    mealsCount: 0
  });*/
 const [logs , setLogs] = useState([]);
 const [filter , setFilter]=useState("All")
  /*const [mealsList, setMealsList] = useState([]);*/

  const GOAL = {
    calories: 2100,
    protein: 140,
    carbs: 230,
    fats: 70
  };
  

  /*const loadData = () => {
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
  };*/
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
  
  const handleDelete = async (id) => {
    try {
      await deleteMealLogs(id);
      console.log("Meal log deleted");

      loadLogs(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

   let calories = 0;
   let protein= 0;
   let carbs= 0;
   let fats=0;

   (logs ?? []).forEach((log) => {
    const meal = log.meal; // مهم: لازم backend يرجّع meal داخل log

    protein += Number(meal?.protein || 0) * (log.quantity);
    calories += Number(meal?.calories ||  0) * (log.quantity);
    carbs += Number(meal?.carbs ||  0) * (log.quantity);
    fats += Number(meal?.fats||  0) * (log.quantity);
  });

 const data = {
    calories,
    protein,
    carbs,
    fats,
    mealsCount: logs.length,
  };

  const filterMeals =filter === "All" ? logs: logs.filter((l) => l.meal_time === filter.toLowerCase());

  const percent = (value, goal) =>
    Math.min((value / goal) * 100, 100);

  const lastMeal =
    logs.length > 0 ? logs[logs.length - 1] : null;

  const isTypeDone = (type) =>
    logs.some((l) => l.meal_time === type.toLowerCase());

  /*useEffect(() => {
    loadData();
    window.addEventListener("mealsUpdated", loadData);
    return () => window.removeEventListener("mealsUpdated", loadData);
  }, []);

  
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
      time : "11:00 Am"}]*/

      

  

   /*const handleDelete = (id) => {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("meals") || "{}");

    Object.keys(stored[today]).forEach(type => {
      stored[today][type] = stored[today][type].filter(
        m => m.instanceId !== id
      );
    });

    localStorage.setItem("meals", JSON.stringify(stored));
    window.dispatchEvent(new Event("mealsUpdated"));
  };*/

  


  return (
      <div className="summary-page">
        <h1>{MealLogsTitle}</h1>
        <p>{MealLogsDes}</p>
  
        {/* CALORIES */}
        <div className="cardMealLogs">
          <h4>CALORIES CONSUMED</h4>
          <h1>
            {data.calories} <span>kcal</span>
          </h1>
  
          <p>
            Goal: {GOAL.calories} kcal —{" "}
            <span className="green">
              {GOAL.calories - data.calories > 0
                ? GOAL.calories - data.calories
                : 0}{" "}
              left
            </span>
          </p>
  
          <div className="progress">
            <div
              className="fill green"
              style={{
                width: `${percent(data.calories, GOAL.calories)}%`,
              }}
            >
              <span className="percent-text">
                {Math.round(
                  percent(data.calories, GOAL.calories)
                )}
                %
              </span>
            </div>
          </div>
        </div>
  
        {/* MEALS COUNT */}
        <div className="cardMealLogs">
          <h3>MEALS LOGGED</h3>
          <h1>
            {data.mealsCount} <span>meals</span>
          </h1>
  
          <p className="lastDes">
            {lastMeal
              ?` Last logged at {lastMeal.meal_time}`
              : "No meals logged yet"}
          </p>
  
          <div className="mealTypePills">
            {["Breakfast", "Lunch", "Dinner", "Snack"].map((t) => (
              <span
                key={t}
                className={`mealTypePill ${
                  isTypeDone(t) ? "done" : ""
                }`}
              >
                {isTypeDone(t) ? "✔️ " : "- "}
                {t}
              </span>
            ))}
          </div>
        </div>
  
        {/* MACROS */}
        <div className="cardMealLogs">
          <h4>TODAY MACROS</h4>
          <p className="sub-text">From logged meals</p>
  
          <div className="macros-row">
            <div className="macros-box">
              <h5>PROTEIN</h5>
              <h2>{data.protein}g</h2>
              <div className="progress">
                <div
                  className="fill protein"
                  style={{
                    width: `${percent(data.protein, GOAL.protein)}%`,
                  }}
                />
              </div>
            </div>
  
            <div className="macros-box">
              <h5>CARBS</h5>
              <h2>{data.carbs}g</h2>
              <div className="progress">
                <div
                  className="fill carbs"
                  style={{
                    width: `${percent(data.carbs, GOAL.carbs)}%`,
                  }}
                />
              </div>
            </div>
  
            <div className="macros-box">
              <h5>FATS</h5>
              <h2>{data.fats}g</h2>
              <div className="progress">
                <div
                  className="fill fats"
                  style={{
                    width: `${percent(data.fats, GOAL.fats)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
  
        {/* FILTERS */}
        <div className="cardMealLogs">
          <h2>
            TODAY LOGGED MEALS
            <span className="badge">{filterMeals.length} logs</span>
          </h2>
  
          <div className="filters">
            {["All", "Breakfast", "Lunch", "Dinner", "Snack"].map(
              (f) => (
                <button
                  key={f}
                  className={filter === f ? "active" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              )
            )}
          </div>
  
          {/* LIST */}
          <div className="meals-list">
            {filterMeals.map((log) => (
              <div key={log.id} className="meal-item">
                <div className="meal-info">
                  <h3>{log.meal?.name}</h3>
  
                  <div className="macrosLogs">
                    <span>🥩 {log.meal?.protein}g</span>
                    <span>🍞 {log.meal?.carbs}g</span>
                    <span>🥑 {log.meal?.fats}g</span>
                  </div>
                </div>

         <div className="meal-right">
                  <span className="kcal">
                    {log.meal?.calories} kcal
                  </span>
  
                  <span className="time">
                    {log.meal_time}
                  </span>
  
                  <button
                    className="deleteIcon"
                    onClick={() => handleDelete(log.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
 

export default MealLogsSection;