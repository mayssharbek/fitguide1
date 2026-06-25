 import { useEffect, useState } from "react";
import "./DailyGoalsProgress.css";
import { getMealLogs } from "../../services/api";

export default function DailyGoal() {
  const [logs, setLogs] = useState([]);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [water, setWater] = useState(0);

  const calorieGoal = 2200;
  const proteinGoal = 120;
  const waterGoal = 8;

  const addWater = () => {
    const today = new Date().toISOString().split("T")[0];

    const currentWater =
      Number(localStorage.getItem(water`${today}`)) || 0;

    const updatedWater = currentWater + 1;

    localStorage.setItem(
      `water${today}`,
      updatedWater
    );

    setWater(updatedWater);
  };

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await getMealLogs();

        console.log("MEAL LOGS:", res);

        if (res.status) {
          setLogs(res.data || []);
        }

        const today = new Date().toISOString().split("T")[0];

        const savedWater =
          Number(localStorage.getItem(water`${today} `))||  0;

        setWater(savedWater);

      } catch (error) {
        console.log(error);
      }
    };

    loadLogs();

    const handler = () => loadLogs();

    window.addEventListener("mealsUpdated", handler);

    return () => {
      window.removeEventListener(
        "mealsUpdated",
        handler
      );
    };
  }, []);

  useEffect(() => {
    let totalCalories = 0;
    let totalProtein = 0;

    logs.forEach((log) => {
      const qty = Number(log.quantity || 1);

      totalCalories +=Number(log.meal?.calories || 0) * qty;

      totalProtein +=Number(log.meal?.protein || 0) * qty;
    });

    setCalories(totalCalories);
    setProtein(totalProtein);

    console.log("Calories:", totalCalories);
    console.log("Protein:", totalProtein);

  }, [logs]);

  const caloriePercent = Math.min(
    (calories / calorieGoal) * 100,
    100
  );

  const proteinPercent = Math.min(
    (protein / proteinGoal) * 100,
    100
  );

  const waterPercent = Math.min(
    (water / waterGoal) * 100,
    100
  );

  return (
    <div className="goalCardProgress">
      <h2>Daily Goals Progress</h2>

      <div className="goalsRow">

        <div className="circleBoxProgress">
          <div
            className="circleProgress"
            style={{
              background: `conic-gradient(
                #85c318 ${caloriePercent}%,
                #eee ${caloriePercent}%
              )`,
            }}
          >
            <div className="innerCircleProgress">
              <strong>
                {Math.round(caloriePercent)}%
              </strong>
            </div>
          </div>

          <p>
            Calories
            <br />
            {calories}/{calorieGoal}
          </p>
        </div>

        <div className="circleBoxProgress">
          <div
            className="circleProgress"
            style={{
              background: `conic-gradient(
                orange ${proteinPercent}%,
                #eee ${proteinPercent}%
              )`,
            }}
          >
            <div className="innerCircleProgress">
              <strong>
                {Math.round(proteinPercent)}%
              </strong>
            </div>
          </div>

          <p>
            Protein
            <br />
            {protein}g/{proteinGoal}g
          </p>
        </div>

        <div className="circleBoxProgress">
          <div
            className="circleProgress"
            style={{
              background: `conic-gradient(
                #4db7ff ${waterPercent}%,
                #eee ${waterPercent}%
              )`,
            }}
          >
            <div className="innerCircleProgress">
              <strong>
                {Math.round(waterPercent)}%
              </strong>
            </div>
          </div>

          <p>
            Water
            <br />
            {water}/{waterGoal} cups
          </p>
        </div>
[25/06/2026 04:00 م] Mays sharbek: </div>
 <button
        className="waterBtn"
        onClick={addWater}
      >
        + Add Water
      </button>

      <div className="motivationBox">
        Great consistency today! Keep going.
      </div>
    </div>
  );
}