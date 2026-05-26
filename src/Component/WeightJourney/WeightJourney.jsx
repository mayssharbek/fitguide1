import { useEffect, useState } from "react";
import "./WeightJourney.css";

export default function WeightJourney() {

  const [weights, setWeights] = useState([]);


  const loadWeights = () => {

    const stored = JSON.parse(
      localStorage.getItem("weightLogs") || "[]"
    );

    setWeights(stored);
  };


  useEffect(() => {

    loadWeights();

    window.addEventListener(
      "weightsUpdated",
      loadWeights
    );

    return () => {
      window.removeEventListener(
        "weightsUpdated",
        loadWeights
      );
    };

  }, []);

  // آخر وزن
  const currentWeight =
    weights.length > 0
      ? weights[weights.length - 1].weight
      : 0;

  // أول وزن
  const firstWeight =
    weights.length > 0
      ? weights[0].weight
      : 0;

  // الفرق
  const diff = (
    firstWeight - currentWeight
  ).toFixed(1);

  // إضافة وزن جديد
  const addWeight = () => {

    const newWeight = prompt(
      "Enter your weight"
    );

    if (!newWeight) return;

    const logs = JSON.parse(
      localStorage.getItem("weightLogs") || "[]"
    );

    const newEntry = {
      weight: Number(newWeight),
      date: new Date()
        .toISOString()
        .split("T")[0]
    };

    logs.push(newEntry);

    localStorage.setItem(
      "weightLogs",
      JSON.stringify(logs)
    );

    // تحديث فوري
    window.dispatchEvent(
      new Event("weightsUpdated")
    );
  };

  return (
    <div className="weightCard">

      <h2>⚖️ Weight Journey</h2>

      <div className="weightNumber">

        <h1>{currentWeight}</h1>

        <span>kg</span>

      </div>

      <div className="weightBadge">

        ↓ {diff}kg this month

      </div>

      <div className="weightsList">

        {weights.map((item, index) => (

          <div
            key={index}
            className="weightItem"
          >

            <div>
              {item.date}
            </div>

            <strong>
              {item.weight} kg
            </strong>

            <span>
              #{index + 1}
            </span>

          </div>

        ))}

      </div>

      <button
        className="logBtnWeight"
        onClick={addWeight}
      >
        + Log New Weight
      </button>

    </div>
  );
}