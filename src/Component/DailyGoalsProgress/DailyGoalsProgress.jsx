import { useEffect, useState } from "react";
import "./DailyGoalsProgress.css";

export default function DailyGoal() {

  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [water, setWater] = useState(0);

  const calorieGoal = 2200;
  const proteinGoal = 120;
  const waterGoal = 8;


  const addWater = () => {

    const currentWater =
      Number(localStorage.getItem("water")) || 0;

    const updatedWater = currentWater + 1;

    localStorage.setItem( "water", updatedWater );

    setWater(updatedWater);
  };

  useEffect(() => {

    const loadData = () => {

      const today =new Date().toISOString().split("T")[0];

      const stored = JSON.parse(localStorage.getItem("meals") || "{}");

      const meals = stored[today] || {};

      let totalCalories = 0;
      let totalProtein = 0;

      Object.values(meals)
        .flat()
        .forEach((item) => {

          totalCalories +=(item.calories || item.kcal || 0);

          totalProtein +=(item.protein || 0);

        });

      setCalories(totalCalories);
      setProtein(totalProtein);

     
      const savedWater = Number(localStorage.getItem("water")) || 0;

      setWater(savedWater);
    };

    loadData();

    window.addEventListener("mealsUpdated",loadData);

    return () => {

      window.removeEventListener("mealsUpdated",loadData);

    };

  }, []);

  const caloriePercent =Math.min((calories / calorieGoal) * 100,100 );

  const proteinPercent =  Math.min((protein / proteinGoal) * 100,100
    );

  const waterPercent =Math.min((water / waterGoal) * 100,100);

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
              )`
            }}
          >

            <div className="innerCircleProgress">

              <strong>
                {Math.round(caloriePercent)}%
              </strong>

            </div>

          </div>

          <p>
            Calories<br /> {calories}/{calorieGoal}
          </p>

        </div>

 
        <div className="circleBoxProgress">

          <div
            className="circleProgress"
            style={{
              background: `conic-gradient(
                orange ${proteinPercent}%,
                #eee ${proteinPercent}%
              )`
            }}
          >

            <div className="innerCircleProgress">

              <strong>
                {Math.round(proteinPercent)}%
              </strong>

            </div>

          </div>

          <p>
            Protein <br /> {protein}g/{proteinGoal}g
          </p>

        </div>

       
        <div className="circleBoxProgress">

          <div
            className="circleProgress"
            style={{
              background: `conic-gradient(
                #4db7ff ${waterPercent}%,
                #eee ${waterPercent}%
              )`
            }}
          >

            <div className="innerCircleProgress">

              <strong>
                {Math.round(waterPercent)}%
              </strong>

            </div>

          </div>

          <p>
            Water<br />{water}/{waterGoal} cups
          </p>

        </div>

      </div>

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