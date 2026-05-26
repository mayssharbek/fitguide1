import { useEffect, useState } from "react";
import "./SmartInsights.css";

const SmartInsights = ({ insightsTitle }) => {

  const [calories, setCalories] = useState(0);
  const [water, setWater] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {

    const loadData = () => {


      const storedMeals = JSON.parse(localStorage.getItem("meals") || "{}");

      const today =new Date().toISOString().split("T")[0];

      const todayMeals =storedMeals[today] || {};

      let totalCalories = 0;

      Object.values(todayMeals)
        .flat()
        .forEach((item) => {

          totalCalories +=( item.calories || item.kcal || 0);

        });

      setCalories(totalCalories);

   
      const savedWater = Number(localStorage.getItem("water")) || 0;

      setWater(savedWater);

      
      let streakCount = 0;

      const sortedDays =
         Object.keys(storedMeals)
          .sort()
          .reverse();

      for (let day of sortedDays) {

        const meals =  storedMeals[day] || {};

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

      setStreak(streakCount);
    };

    loadData();

    window.addEventListener( "mealsUpdated",loadData);

    return () => {

      window.removeEventListener( "mealsUpdated", loadData);

    };

  }, []);

  return (

    <div className='insighsContainer'>

      <h2>{insightsTitle}</h2>

      <div className='insights greenBox'>
        Your calories intake is
        {" "}
        {calories}
        {" "}
        kcal today
      </div>

      <div className='insights blueBox'>
        Weight trend is moving toward your goal
      </div>

      <div className='insights orangeBox'>
        You logged meals
        {" "}
        {streak}
        {" "}
        days in a row
      </div>

      <div className='insights purpleBox'>
        Water intake is
        {" "}
        {water}
        {" "}
        cups today
      </div>

    </div>
  );
};

export default SmartInsights;