import { useEffect, useState } from "react";
import "./WeaklyProgress.css";
import { getMealLogs } from "../../services/api";

const WeeklyProgress = () => {
  const [week, setWeek] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [consistency, setConsistency] = useState(0);

  const loadData = async () => {
    try {
      const res = await getMealLogs();

      console.log("WEEKLY LOGS:", res);

      const logs = res.data || [];

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const todayIndex = new Date().getDay();

      const caloriesPerDay = {};

      logs.forEach((log) => {
        const date = log.log_date;

        caloriesPerDay[date] =
          (caloriesPerDay[date] || 0) +
          ((log.meal?.calories || 0) * (log.quantity || 1));
      });

      const result = days.map((day, index) => {
        const d = new Date();
        d.setDate(d.getDate() - (todayIndex - index));

        const dateKey = d.toISOString().split("T")[0];

        const total = caloriesPerDay[dateKey] || 0;

        let status = "empty";

        if (index === todayIndex) {
          status = "today";
        } else if (total === 0) {
          status = "empty";
        } else if (total <= 2200) {
          status = "good";
        } else {
          status = "bad";
        }

        return {
          day,
          status,
          total,
        };
      });

      setWeek(result);

      const completedCount = result.filter(
        (d) => d.total > 0
      ).length;

      setCompleted(completedCount);

      setConsistency(
        Math.round((completedCount / 7) * 100)
      );

      let streakCount = 0;

      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);

        const dateKey = d.toISOString().split("T")[0];

        if ((caloriesPerDay[dateKey] || 0) > 0) {
          streakCount++;
        } else {
          break;
        }
      }

      setStreak(streakCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();

    const handler = () => loadData();

    window.addEventListener("mealsUpdated", handler);

    return () => {
      window.removeEventListener(
        "mealsUpdated",
        handler
      );
    };
  }, []);



return (
  <div className="weekly-container">
    <h3>Weekly Progress</h3>

    <div className="week-grid">
      {week.map((d, i) => (
        <div key={i} className="day-item">
          <span>{d.day}</span>

          <div className={`circle ${d.status}`}>
            {d.total}

            {d.status === "good" && "✔️"}
            {d.status === "bad" && "✖️"}
            {d.status === "today" && "•"}
            {d.status === "empty" && "-"}
          </div>
        </div>
      ))}
    </div>

    <div className="statsRow">
      <div className="statCard">
        <h3>{streak}</h3>
        <p>Current Streak</p>
      </div>

      <div className="statCard">
        <h3>{completed}/7</h3>
        <p>Days Completed</p>
      </div>

      <div className="statCard">
        <h3>{consistency}%</h3>
        <p>Consistency</p>
      </div>
    </div>
  </div>
);
};
export default WeeklyProgress