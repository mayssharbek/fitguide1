import { useContext, useState } from 'react'
import './AvoidEatSection.css'
import { useNavigate } from 'react-router'
import SliderContext from '../../Context/SliderContext'

const AvoidEatSection = ({imageAvoidEat , titleAvoidEat , descriptionAvoidEat , food}) => {
    const[selectFood , setSelectFood] = useState([])
    const navigate = useNavigate()
    const {prevStep} = useContext(SliderContext);


    const fakeApi = (data) =>{
        return new Promise((resolve)=>{
           setTimeout(()=>{
             resolve({success:true});
           },1000);
        })
       }
   
     const foods =[
        "Dairy",
        "Peanuts",
        "Eggs",
        "ShellFish",
        "Fish",
        "Soy",
        "Gluten"
     ]

    const toogleFood = (food) =>{
        if(selectFood.includes(foods)){
            setSelectFood(selectFood.filter((f)=> f!==food))
        }
        else{
           setSelectFood([...selectFood , food]);
        }
    }


    const handleSubmit = async()=>{
        const res = await fakeApi(selectFood);
        if (res.success){
           navigate("/dashboard/nutiritiontarget")
        }
    
        alert("Saved successfully")
       }
    
       const backSubmit = () =>{
         prevStep();
         navigate(-1);
       }


  return (
    <div className='containerAvoidEat'>
      <div className='leftAvoidEat'>
          <img src={imageAvoidEat}/>
      </div>
      <div className='rightAvoidEat'>
         <h1>{titleAvoidEat}</h1>
         <p>{descriptionAvoidEat}</p>

         <div className='food-list'>
          {foods.map((food)=>{
               return(
                <button key={food} className={`food-btn ${selectFood.includes(food) ? "active" : ""}`}
                onClick={()=>toogleFood(food)}>  {food}  </button>
               )
          })}
         </div>


         <div className='desc-food'>
            You can fully configure your Food Exclusion later,including setting custom exclusions
         </div>

  
         <button className='continue1' onClick={handleSubmit}>continue</button>
         <button className='back1' onClick={backSubmit}>back</button>
      </div>
    </div>
  )
        }

export default AvoidEatSection
