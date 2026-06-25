import { useContext } from 'react'
import './AvoidEatSection.css'
import { useNavigate } from 'react-router'
import SliderContext from '../../Context/SliderContext'

const AvoidEatSection = ({ imageAvoidEat, titleAvoidEat, descriptionAvoidEat }) => {

  const navigate = useNavigate()
  const { formData, setFormData, prevStep } = useContext(SliderContext)

  const foods = [
    "Dairy",
    "Peanuts",
    "Eggs",
    "ShellFish",
    "Fish",
    "Soy",
    "Gluten"
  ]


  const toggleFood = (food) => {
    setFormData(prev => {
      const exists = prev.allergies.includes(food)

      return {
        ...prev,
        allergies: exists
          ? prev.allergies.filter(f => f !== food)
          : [...prev.allergies, food]
      }
    })
  }

  const fakeApi = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 1000)
    })
  }

  const handleSubmit = async () => {
    const res = await fakeApi(formData.allergies)

    if (res.success) {
      navigate("/dashboard/nutiritiontarget")
    }

    alert("Saved successfully")
  }

  const backSubmit = () => {
    prevStep()
    navigate(-1)
  }

  return (
    <div className='containerAvoidEat'>
      
      <div className='leftAvoidEat'>
        <img src={imageAvoidEat} />
      </div>

      <div className='rightAvoidEat'>
        <h1>{titleAvoidEat}</h1>
        <p>{descriptionAvoidEat}</p>

       
        <div className='food-list'>
          {foods.map((food) => (
            <button
              key={food}
              className={`food-btn ${formData.allergies.includes(food) ? "active" : ""}`}
              onClick={() => toggleFood(food)}
            >
              {food}
            </button>
          ))}
        </div>

        <div className='desc-food'>
          You can fully configure your Food Exclusion later, including custom exclusions
        </div>

        <button className='continue1' onClick={handleSubmit}>
          continue
        </button>

        <button className='back1' onClick={backSubmit}>
          back
        </button>

      </div>
    </div>
  )
}

export default AvoidEatSection