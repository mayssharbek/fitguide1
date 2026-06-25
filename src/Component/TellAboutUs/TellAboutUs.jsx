import {  useContext, useState } from 'react'
import './TellAboutUs.css'
import { useNavigate } from 'react-router'
import {SliderContext , SliderProvider } from '../../Context/SliderContext'
import { createProfile } from '../../services/api'

const TellAboutUs = ({FoodImage , titleTellUs , descriptionTellUs}) => {
  const navigate = useNavigate()
  const cx= useContext(SliderContext)
 console.log(cx)
    const { formData , setFormData, nextStep} = useContext(SliderContext);
     
   /* const[formData , setFormData] = useState({
     sex: "",
     height: "",
     weight: "",
     age: "",
     body_fat: "",
     goal_type: "",
     activity_level: "",
     diet_type:""
    })*/
 


   const fakeApi = (data) =>{
    return new Promise((resolve)=>{
       setTimeout(()=>{
         resolve({success:true});
       },1000);
    })
   }

   
   const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

   const handleSelect = (name , value) =>{
     setFormData({
        ...formData,
        [name]:value

     });
   };
   const handleSubmit = async()=>{
    const res = await fakeApi(formData);
    nextStep();
    if (res.success){
      navigate("/dashboard/goal")
    }
   
     
    alert("Saved successfully")
   }

   const normalize = (value) => {
    if (!value) return "";
  
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

   const handleSubmit1 = async () => {
    try {
      console.log(formData)
      console.log("CREATE CLICKED");
  
      const profileData = {
        gender: formData.sex.toLowerCase(),
        height: Number(formData.height),
        current_weight: Number(formData.weight),
        target_weight:Number(formData.target_weight) || null,
        activity_level: normalize(formData.activity_level).toLowerCase(),
        goal_type: normalize(formData.goal_type).toLowerCase(),
        diet_type: normalize(formData.diet_type).toLowerCase(),
        age: Number(formData.age),
        allergies: formData.allergies
      };
  
      console.log("SEND:", profileData);
  
      const result = await createProfile(profileData);
  
      console.log("RESULT:", result.profile);
  
      if (!result) {
        console.log("no response");
        return;
      }
  
       
   if (result?.message === "profile created successfully") {
     console.log("PROFILE CREATED");
     navigate("/app/profile");
  return;
}

// ❌ فشل
console.log("API ERROR:", result);
     /* if (result?.massage !== 200 || result.status !== 201) {
        console.log("Api error " , result)
        console.log("error detalies" , result?.data?.errors)
        return
        
      } 
      navigate("/app/profile");
      }*/
    }
     catch (error) {
      console.log("CATCH ERROR:", error);
    }
  };
      


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
           <input name='height' onChange={handleChange} value={formData.height}/>
          
           <label>Weight(kg)</label>
           <input name='weight' onChange={handleChange} value={formData.weight}/>
            
           <label> Target Weight(kg)</label>
           <input name='target_weight' onChange={handleChange} value={formData.target_weight}/>

           <label>Age</label>
           <input name='age' onChange={handleChange} value={formData.age}/>

           <label>Body Fat</label>
           <div className='BodyFat'>
             <button onClick={()=>{handleSelect("body_fat","low")}}>low</button>
             <button onClick={()=>{handleSelect("body_fat","medium")}}>medium</button>
             <button onClick={()=>{handleSelect("body_fat","high")}}>higt</button>
           </div>
 
          <label>Activity Level</label>
           <select name='activity_level' onChange={handleChange} className='select' value={formData.activity_level}
           >
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very active">Very active</option>

           </select>

           <button className='continue' onClick={handleSubmit}>Continue</button>
           <button
  type="button"
  onClick={() => {
    console.log("BUTTON WORKS");
    handleSubmit1()
    alert("WORKS");
  }}
>
  Create
</button>

        </div>

      </div>
    </div>
  )
}

export default TellAboutUs
