 import { useEffect, useState } from "react";
 import './WeaklyProgress.css'

const WeeklyProgress =({}) =>{
  const [week, setWeek] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [consistency, setConsistency] = useState(0);

  useEffect(() => {
    const loadData = ()=>{

    const stored = JSON.parse(localStorage.getItem("meals") || "{}");

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const todayIndex = new Date().getDay();

    const result = days.map((day, index) => {
      const d = new Date();
      d.setDate(d.getDate() - (todayIndex - index));
      const dateKey = d.toISOString().split("T")[0];

      const meals = stored[dateKey] || {};

      const total = Object.values(meals)
        .flat()
        .reduce((sum, f) => sum + (f?.kcal || f?.calories || 0), 0);

      let status = "empty";

      if (index === todayIndex) status = "today";
      else if (total === 0) status = "empty";
      else if (total <= 2000) status = "good";
      else status = "bad";

      return { day, status , total};
    });

    setWeek(result);
  
    let completedCount = 0;

    for (let i = 0; i < 7; i++) {
    
      const d = new Date();
      d.setDate(d.getDate() - i);
    
      const dateKey = d.toISOString().split("T")[0];
    
      const meals = stored[dateKey] || {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snack: []
      };
    
      const totalMeals =
        (meals.Breakfast?.length || 0) +
        (meals.Lunch?.length || 0) +
        (meals.Dinner?.length || 0) +
        (meals.Snack?.length || 0);
    
      if (totalMeals > 0) {
        completedCount++;
      }
    }

  const consistencyValue = Math.round((completedCount / 7) * 100);

  let streakCount =0;

 const sortedDays = Object.keys(stored).sort().reverse();

 for (let day of sortedDays) {

  const meals = stored[day];

  const totalMeals =
  (meals.Breakfast?.length || 0) +
  (meals.Lunch?.length || 0) +
  (meals.Dinner?.length || 0) +
  (meals.Snack?.length || 0);

  if (totalMeals > 0) {
    streakCount++;
  } else {
    break;
  }
}
setCompleted(completedCount);
setStreak(streakCount);
setConsistency(consistencyValue);
    }

  loadData()
  window.addEventListener("mealsUpdated", loadData)
   return()=>{
    window.removeEventListener("mealsUpdated" , loadData)
   }
  }, []);


   




  return (
    <div className="weekly-container">
      <h3>Weekly Progress</h3>

      <div className="week-grid">
        {week.map((d, i) => (
          <div key={i} className="day-item">
            <span>{d.day}</span>
         <div  className={`circle ${d.status}`}>
                                    {d.total}
            {d.status === "good" && "✔️"}
            {d.status === "bad" && "✖️"}
            {d.status === "today" && "•"}
            {d.status === "empty" && "-"}
             
         </div>


            </div>
        ))      
}
</div>

  <div className="statsRow">
   <div className="statCard">
       <h3>{streak}</h3>
       <p>Current Streak</p>
   </div>
   <div className="statCard">
       <h3>{completed}/7</h3>
       <p> Days Completed</p>
   </div>
   <div className="statCard">
       <h3>{consistency}%</h3>
       <p>Consitency</p>
   </div>
  </div>


</div>
  )}
    export default WeeklyProgress