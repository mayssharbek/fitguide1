 import { useEffect, useState } from "react";
 import './WeaklyProgress.css'

const WeeklyProgress =() =>{
  const [week, setWeek] = useState([]);


  useEffect(() => {
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
        .reduce((sum, f) => sum + (f?.calories || 0), 0);

      let status = "empty";

      if (index === todayIndex) status = "today";
      else if (total === 0) status = "empty";
      else if (total <= 2000) status = "good";
      else status = "bad";

      return { day, status , total};
    });

    setWeek(result);
   
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
</div>
  )}
    export default WeeklyProgress