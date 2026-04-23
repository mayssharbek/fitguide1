           
import { useState } from 'react'
import './Goal.css'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import SliderContext from '../../Context/SliderContext'


const Goal = () => {
    const navigate = useNavigate()
    const [goal , setGoal] = useState("")
    const {prevStep} =useContext(SliderContext)

   const fakeApi = (data) =>{
    return new Promise((resolve)=>{
       setTimeout(()=>{
         resolve({success:true});
       },1000);
    })
   }




   const handleSubmit = async()=>{
    const res = await fakeApi(goal);
    if (res.success){
      navigate("/dashboard/systemeat")
    }

    alert("Saved successfully")
   }

   const backSubmit = () =>{
      prevStep();
      navigate(-1);
   }


  return (
    
    <div className='containerGoal'>
      <div className="cardGoal">
        <h1>What is your goal?</h1>
        <p className="subtitle">
          We'll adjust your daily nutrition targets to match your goals.
        </p>


        <p className="label">I want to</p>
        <div className="goals">
          <button
            className={goal === "lose" ? "goal active" : "goal"}
            onClick={() => setGoal("lose")}
          >
            Lose fat
          </button>

          <button
            className={goal === "maintain" ? "goal active" : "goal"}
            onClick={() => setGoal("maintain")}
          >
            Maintain weight
          </button>

          <button
            className={goal === "build" ? "goal active" : "goal"}
            onClick={() => setGoal("build")}
          >
            Build muscle
          </button>
        </div>

        <div className="actions">
          <button className="continue" onClick={handleSubmit}>Continue →</button>
          <button className="continue" onClick={backSubmit}>Back</button>
        </div>
      </div>
 </div>
  );
}
   
  

export default Goal

 
