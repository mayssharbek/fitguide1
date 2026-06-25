import { useEffect, useState } from "react";
import "./SmartInsights.css";
import {
  getMealLogs,
  getWeightLogs,
} from "../../services/api";

const SmartInsights = ({ insightsTitle }) => {
  const [calories, setCalories] = useState(0);
  const [water, setWater] = useState(0);
  const [streak, setStreak] = useState(0);
  const [weightMessage, setWeightMessage] = useState(
    "No weight data yet"
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        
        const mealRes = await getMealLogs();

        if (mealRes.status) {
          let totalCalories = 0;

          mealRes.data.forEach((log) => {
            totalCalories +=Number(log.meal?.calories  ||0) *Number(log.quantity||  1);
          });

          setCalories(totalCalories);

          
          setStreak(mealRes.data.length);
        }

   
        const weightRes = await getWeightLogs();

        if (
          weightRes.status &&
          weightRes.data.length >= 2
        ) {
          const first =
            Number(weightRes.data[0].weight);

          const last =
            Number(
              weightRes.data[
                weightRes.data.length - 1
              ].weight
            );

          if (last < first) {
            setWeightMessage(
              "Weight is decreasing toward your goal 📉"
            );
          } else if (last > first) {
            setWeightMessage(
              "Weight is increasing 📈"
            );
          } else {
            setWeightMessage(
              "Weight is stable ⚖️"
            );
          }
        }

        // ===== Water =====
        const today = new Date()
          .toISOString()
          .split("T")[0];

        const savedWater =
          Number(
            localStorage.getItem(
              water`${today}`
            )
          ) || 0;

        setWater(savedWater);

      } catch (error) {
        console.log(error);
      }
    };

    loadData();

    const handler = () => loadData();

    window.addEventListener(
      "mealsUpdated",
      handler
    );

    window.addEventListener(
      "weightsUpdated",
      handler
    );

    return () => {
      window.removeEventListener(
        "mealsUpdated",
        handler
      );

      window.removeEventListener(
        "weightsUpdated",
        handler
      );
    };
  }, []);

  return (
    <div className="insighsContainer">
      <h2>{insightsTitle}</h2>

      <div className="insights greenBox">
        Your calories intake is {calories} kcal today
      </div>

      <div className="insights blueBox">
        {weightMessage}
      </div>

      <div className="insights orangeBox">
        You logged {streak} meals today
      </div>

      <div className="insights purpleBox">
        Water intake is {water} cups today
      </div>
    </div>
  );
};

export default SmartInsights;