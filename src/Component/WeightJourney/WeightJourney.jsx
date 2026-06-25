import { useEffect, useState } from "react";
import "./WeightJourney.css";
import { createWeightLogs, getWeightLogs } from "../../services/api";

export default function WeightJourney() {

  const [weights, setWeights] = useState([]);


  const loadWeights = async () => {

   try{
    const response = await getWeightLogs()

    console.log("weightLogs" , response);

    setWeights(response.data || []);
   }

   catch (error) {
    console.log(error.response?.data);
  }

  };


  useEffect(() => {

    loadWeights();

    const handler = () => loadWeights();
    window.addEventListener(
      "weightsUpdated",
      handler
    );

    return () => {
      window.removeEventListener(
        "weightsUpdated",
        handler
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
  const addWeight = async() => {

    const newWeight = prompt(
      "Enter your weight"
    );

    if (!newWeight) return;

    try {
      const payload = {
        weight: Number(newWeight),
        log_date: new Date().toISOString().split("T")[0],
      };

      console.log("SENDING WEIGHT:",payload);

      const response = await createWeightLogs(payload);

      console.log("POST RESPONSE:",response);
      /*console.log("WEIGHT ERROR" , response.errors?.weight)
      console.log("Date error" , response.errors?.log_date)*/
     window.dispatchEvent(
       new Event("weightsUpdated")
    );
  }
   catch (error) {
    console.log(
      error.response?.data
    );
  }
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