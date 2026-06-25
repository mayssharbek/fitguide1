import { useContext, useState } from 'react'
import './SystemEatSection.css'
import { useNavigate } from 'react-router'
import {SliderContext} from '../../Context/SliderContext'

const SystemEatSection = ({Image , titleSystemEat ,descriptionSystemEat }) => {

   /* const[selectDiet , setSelectDiet]=useState("normal")*/
    const navigate = useNavigate()
    const{formData , setFormData , prevStep} =useContext(SliderContext);
    

    const fakeApi = (data) =>{
        return new Promise((resolve)=>{
           setTimeout(()=>{
             resolve({success:true});
           },1000);
        })
       }

       const diets=[
        {
           id : "normal",
           title : "Normal",
           desc: "Balanced diet inclding all food groups"
        },
        {
            id : "vegan",
            title : "Vegan",
            desc: "Excludes:Meat,fish,dairy,eggs"
        }
        ,
        {
            id : "vegetarian",
            title : "Vegetarian",
            desc: "Excludes:Meat,fish,poultry"
        },
        {
            id : "high protine",
            title : "High Protin",
            desc: "Focus on protein-rich foods"
        },
        {
          id : "low carb",
            title : "Low Carb",
            desc: "Reduced carbohydrates intake"
        },
        {
          id : "diabetic",
            title : "Diabetic",
            desc: "low suger foods"
        },
        {
            
            id : "iron rich",
            title : "Iron Rich",
            desc: "Foods rich in iron"
        }
       ]

       const handleSelect = (id)=>{
        setFormData(prev =>({
          ...prev ,
          diet_type:id
        }))
       }

 






   const handleSubmit = () => {
    if (!formData.diet_type) {
      alert("Please select diet first")
      return
    }

    console.log("FINAL FORM DATA:", formData)

    navigate("/dashboard/avoideat")
  }


   const backSubmit = ()=>{
      prevStep();
      navigate(-1);
   }




  return (
    <div className='containerSystemEat'>
      <div className='leftImage'>
          <img  src={Image}/>
      </div>
      <div className='rightSection'>
         <h1>{titleSystemEat}</h1>
         <p>{descriptionSystemEat}</p>

         <div className='diet_list'>
           {diets.map((diet)=>{
              return(
                <div  key={diet.id} className={`diet-item${formData.diet_type==diet.id ? "active" : ""}`}
                onClick={()=>handleSelect(diet.id)}>
                 
                 <div className='radio'>
                    {formData.diet_type===diet.id && <div className='redio-fill'></div>}
                    </div>
                    
                    <div className='diet-text'>
                         <h3>{diet.title}</h3>
                         <p>{diet.desc}</p>
                    </div>
                    </div>
              )

           })}

         </div>
         <button className='continue' onClick={handleSubmit}>continue</button>
         <button className='back' onClick={backSubmit}>back</button>
      </div>
 
        






    </div>
  )
        }

export default SystemEatSection
