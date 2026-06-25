import { useEffect, useState } from "react";
import "./CaloriesSection.css";
import { useNavigate } from "react-router";
import { getMealLogs } from "../../services/api";

const CaloriesSection = ({ caloriesTitle }) => {
  const [total, setTotal] = useState(0);

  const goal = 2200;
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await getMealLogs();

      console.log("CALORIES LOGS:", res);

      let calories = 0;

      (res.data || []).forEach((log) => {
        calories +=
          (log.meal?.calories || 0) *
          (log.quantity || 1);
      });

      setTotal(calories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();

    const handler = () => loadData();

    window.addEventListener("mealsUpdated", handler);

    return () => {
      window.removeEventListener("mealsUpdated", handler);
    };
  }, []);

  const remaining = Math.max(goal - total, 0);
  const percent = Math.min((total / goal) * 100, 100);

  const goToFoodPage = () => {
    navigate("/app/foodlibrary", {
      state: { mealType: "Snack" },
    });
  };

  return (
    <div className="calories-container">
      <h3>{caloriesTitle}</h3>

      <div className="circle-wrapper">
        <div
          className="circle-progress"
          style={{
            background: `conic-gradient(
              #7cc000 ${percent}%,
              #e5e5e5 ${percent}%
            )`,
          }}
        >
          <div className="circle-inner">
            <h1>{total}</h1>
            <p>kcal consumed</p>
            <p>Goal: {goal}</p>
            <span>{remaining} remaining</span>
          </div>
        </div>
      </div>

      <div className="message">
        ⭐️ You're doing great today!
      </div>

      <button
        className="btn green"
        onClick={goToFoodPage}
      >
        + Add Meal Manually
      </button>

      <button
        className="btn outline"
        onClick={() => navigate("/app/mealplan")}
      >
        📅 Go to Weekly Planner
      </button>
    </div>
  );
};

export default CaloriesSection;