import { useContext, useState } from 'react'
import './Goal.css'
import { useNavigate } from 'react-router'
import SliderContext from '../../Context/SliderContext'


const Goal = () => {
  const navigate = useNavigate()
  const { formData, setFormData, prevStep } = useContext(SliderContext)

  const handleSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      goal_type: value
    }))
  }

  const handleSubmit = () => {
    if (!formData.goal_type) {
      alert("select goal first")
      return
    }

    navigate("/dashboard/systemeat")
  }

  const backSubmit = () => {
    prevStep()
    navigate(-1)
  }

  return (
    <div className='containerGoal'>
      <div className="cardGoal">

        <h1>What is your goal?</h1>

        <div className="goals">

          <button
            className={formData.goal_type === "lose_fat" ? "goal active" : "goal"}
            onClick={() => handleSelect("lose_fat")}
          >
            Lose fat
          </button>

          <button
            className={formData.goal_type === "maintain_weight" ? "goal active" : "goal"}
            onClick={() => handleSelect("maintain_weight")}
          >
            Maintain weight
          </button>

          <button
            className={formData.goal_type === "build_muscle" ? "goal active" : "goal"}
            onClick={() => handleSelect("build_muscle")}
          >
            Build muscle
          </button>

        </div>

        <div className="actions">
          <button onClick={handleSubmit}>Continue →</button>
          <button onClick={backSubmit}>Back</button>
        </div>

      </div>
    </div>
  )
}

export default Goal