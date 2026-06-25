import { useEffect, useState } from "react";
import "./NutiritionTargetSection.css";
import { useNavigate } from "react-router";
import {  nutiritionTargetGet } from "../../services/api";

const NutiritionTargetSection = ({titleNutirition,descNutiritionTarget,btn}) => {
  const navigate = useNavigate();

  const [nutrition, setNutrition] = useState({
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
  });

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const response = await nutiritionTargetGet();

        console.log("GOALS:", response);

        const Target = response.goals[0];

        setNutrition({
          calories: Target.daily_calories,
          carbs: Target.carbs_goal,
          fat: Target.fat_goal,
          protein: Target.protein_goal,
        });
      } catch (error) {
        console.log("GOALS ERROR:", error);
      }
    };

    loadGoals();
  }, []);

  return (
    <div className="containerNutiritionTarget">
      <div className="nutirition-header">
        <h2>{titleNutirition}</h2>
      </div>

      <div className="nutirition-desc">
        <p>{descNutiritionTarget}</p>
      </div>

      <div className="nutirition-row">
        <span className="title-Calories">Calories</span>
        <span className="value">{nutrition.calories}</span>
      </div>

      <div className="nutirition-row">
        <span className="title-Carbs">Carbs</span>
        <span className="value">
          at least {nutrition.carbs}g
        </span>
      </div>

      <div className="nutirition-row">
        <span className="title-Fat">Fat</span>
        <span className="value">
          at least {nutrition.fat}g
        </span>
      </div>

      <div className="nutirition-row">
        <span className="title-Protin">Protein</span>
        <span className="value">
          at least {nutrition.protein}g
        </span>
      </div>

      <button className="Custimize-btn">
        Customize
      </button>

      <button
        className="btnFinish"
        onClick={() => navigate("/app")}
      >
        {btn}
      </button>
    </div>
  );
};

export default NutiritionTargetSection;