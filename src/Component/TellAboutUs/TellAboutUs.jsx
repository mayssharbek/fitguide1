import { use, useContext, useState } from 'react'
import './TellAboutUs.css'
import { useNavigate } from 'react-router'
import SliderContext, { SliderProvider } from '../../Context/SliderContext'

const TellAboutUs = ({FoodImage , titleTellUs , descriptionTellUs}) => {
  const navigate = useNavigate()
    const[formdata , setFormData] = useState({
     Sex: "",
     Height: "",
     Weight: "",
     Age: "",
     BodyFat: "",
     Activity: ""
    })

    const {nextStep} = useContext(SliderContext);

   const fakeApi = (data) =>{
    return new Promise((resolve)=>{
       setTimeout(()=>{
         resolve({success:true});
       },1000);
    })
   }

   
    const handleChange = (e)=>{
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    }
   const handleSelect = (name , value) =>{
     setFormData({
        ...formdata,
        [name]:value

     });
   };
   const handleSubmit = async()=>{
    const res = await fakeApi(formdata);
    nextStep();
    if (res.success){
      navigate("/dashboard/goal")
    }
   
     
    alert("Saved successfully")
   }



  return (
    <div className='containerTellUs'>
    <div className='left'>
        <img src={FoodImage} onClick={()=>document.body.classList.toggle("dark")} className='foodImage'/>
    </div>
    <div className='right'>
       <h1>{titleTellUs}</h1>
       <p>{descriptionTellUs}</p>
        
        <div className='FormTellUs'>
           <label>Sex</label>
           <div className='Sex'>
              <button onClick={()=>{handleSelect("sex","male")}}>Male</button>
              <button onClick={()=>{handleSelect("sex","female")}}>Female</button>
           </div>

           <label>Height(cm)</label>
           <input name='height' onChange={handleChange}/>

           <label>Weight(kg)</label>
           <input name='Weight' onChange={handleChange}/>

           <label>Age</label>
           <input name='age' onChange={handleChange}/>

           <label>Body Fat</label>
           <div className='BodyFat'>
             <button onClick={()=>{handleSelect("bodyfat","low")}}>Low</button>
             <button onClick={()=>{handleSelect("bodyfat","Medium")}}>Medium</button>
             <button onClick={()=>{handleSelect("bodyfat","height")}}>Height</button>
           </div>
 
          <label>Activity Level</label>
           <select name='activity' onChange={handleChange} className='select'>
            <option>Sedentary</option>
            <option>Light</option>
            <option>Moderate</option>
            <option>Active</option>
            <option>Very active</option>

           </select>

           <button className='continue' onClick={handleSubmit}>Continue</button>


        </div>

      </div>
    </div>
  )
}

export default TellAboutUs
