import { useEffect, useState } from 'react'
import './ProfileSection.css'

const ProfileSection = ({   descProfile }) => {
  const [user, setUser] = useState(null);
  const [goal , setGoal] =useState("");
  const [diet , setDiet] =useState("");
  const [birthDate , setBirthDate] =useState("");
  const [gender , setGender] =useState("");
  const[formData ,setFormData]=useState({
    gender:"",
    bodyfat:"",
    goal:""
  })
  const[activityLevel , setActivityLevel]=useState("");
  const[selectFood , setSelectFood] = useState([]);

  const foods =[
    "Dairy",
    "Eggs",
    "Fish",
    "Gluten",
    "Peanuts",
    "Sesame",
    "ShellFish",
    "Soy",
    "Tree Nuts"
 ]
 const toogleFood = (food) =>{
  if(selectFood.includes(foods)){
      setSelectFood(selectFood.filter((f)=> f!==food))
  }
  else{
     setSelectFood([...selectFood , food]);
  }
}
  

  const getUser = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Mays",
          email: "mays.sharbek@mail.com",
          height: 167,
          weight: 55,
          age: 22,
          gender: "Female",
          birthDate:5/1/2004,
          diet: "Normal",
          activity: "Moderate",
          level: "Medium",
          calories: 2000,
          protein: 100,
          carbs: 200,
          fats: 40
        })
      }, 1000)
    })
  }

  useEffect(() => {
    getUser().then(data => {setUser(data),
                          setGoal(data.goal),
                          setDiet(data.diet),
                          setBirthDate(data.birthDate),
                          setGender(data.gender),
                        setActivityLevel(data.activityLevel)})
  }, [])

  if (!user) return <p>Loading...</p>


  const calculateBMI = (weight , height)=>{
    const h = height/100;
    return (weight/(h*h)).toFixed(1);
  }
  const BMI = calculateBMI(user.weight , user.height);

  const getStatus = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const handleSave = () => {
    setUser(prev => ({
      ...prev,
      goal: goal,
      diet:diet
    }));
  };


  const handleSelect = (name , value) =>{
    setFormData(prev=>({
      ...prev,
    
       [name]:value

    }));
  };

  return (
    <div className='profile-page'>
       <div className='profile1'>
        <div className='profileTitle'>
           <h1>My Profile</h1>
           <p>{descProfile}</p>
         </div>
        <button className='btn1Profile' onClick={handleSave}>Save Changes</button>
        </div>
      <div className='profile-container'>

        <div className='cardProfile left-card'>
          <div className='avatar-big'>
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user.name}</h2>
          <p>{user.email}</p>

          <div className='state'>
            <div className='heightState'><strong>{user.height}</strong><span>Height(cm)</span></div>
            <div><strong>{user.weight}</strong><span>Weight(kg)</span></div>
            <div><strong>{user.age}</strong><span>Age</span></div>
            <div><strong>BMI</strong><span>{BMI}({getStatus(BMI)})</span></div>
          </div>


          <div className='info-box'>Goal:
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
           <option value="Maintain">Maintain</option>
           <option value="Lose Weight">Lose Weight</option>
           <option value="Gain Weight">Gain Weight</option>
          </select>
          </div>
          <div className='info-box'>Diet: 
           <select value={diet} onChange={(e) => setDiet(e.target.value)}>
             <option value="Normal">Normal</option>
             <option value="Vegan">Vegan</option>
             <option value="Vegetarian">Vegetarian</option>
             <option value="Low Carb">Low Carb</option>
             <option value="Diabetic friendly">Diabetic friendly</option>
             <option value="Iron rich">Iron rich</option>
        </select>
        </div>
        </div>

        <div className='rightProfile-side'>

          <div className='cardProfile'>
            <h3>PERSONAL INFORMATION</h3>
            <div className="gridProfile">
              <div className='FULL'>
                <label>FULL NAME</label>
                <input value={user.name} readOnly />
              </div>
              <div className='FULL'>
               <label>EMAIL</label>
               <input value={user.email} readOnly />
              </div>
              <div className='FULL'>
               <label>Date OF BIRTH</label>
               <input  type="date"value={birthDate} onChange={(e)=>setBirthDate(e.target.value)} max={new Date().toISOString().split("T")[0]}
               readOnly />
                                       
             
              </div>
              <div className='FULL'>
                <label>GENDER</label>
                  <div className='Sex1'>
                   <button onClick={()=>{handleSelect("gender","male")}}>Male</button>
                   <button onClick={()=>{handleSelect("gender","female")}}>Female</button>
              </div>
           </div>
            </div>
          </div>



          <div className='cardProfile'>
            <h3>BODY STATE</h3>
            <div className="gridProfile">
              <div className='FULL'>
                <label>HEIGHT (CM)</label>
               <input value={user.height} readOnly />
              </div>
              <div className='FULL'>
                <label>CURRENT WEIGHT (KG)</label>
                <input value={user.weight} readOnly />
              </div>
              <div className='FULL'>
                <label>BODY FAT </label>
                <div className='Sex1'>
                   <button onClick={()=>handleSelect("bodyfat","Low")}>Low</button>
                   <button onClick={()=>handleSelect("bodyfat","Medium")}>Medium</button>
                   <button onClick={()=>handleSelect("bodyfat","High")}>High</button>
              </div>
              </div>
              <div className='FULL'>
                <label>ACTIVITY LEVEL</label>
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Active">Active</option>
                  <option value="Very active">Very active</option>
            </select>
              </div>
            </div>
          </div>


          
        <div className='cardProfile'>
          <h3>GOAL & DIET</h3>
           <div className='goalDietRow'>
            <div className='Sex1'>
              <label>MY GOAL</label>
             <div className='buttons'>
              <button onClick={() => handleSelect("goal", "Low")}>Lose Fat</button>
              <button onClick={() => handleSelect("goal", "Medium")}>Maintain</button>
              <button onClick={() => handleSelect("goal", "High")}>Build Muscle</button>
      </div>
    </div>

    <div className='dietBox'>
      <label>DIET TYPE</label>
      <select value={diet} onChange={(e) => setDiet(e.target.value)}>
        <option value="Normal">Normal</option>
        <option value="Vegan">Vegan</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Low Carb">Low Carb</option>
        <option value="Diabetic friendly">Diabetic friendly</option>
        <option value="Iron rich">Iron rich</option>
      </select>
    </div>

  </div>
  </div>

   
   <div className='cardProfile'>
    <h3>DAILY NUTIRIYION TARGETS</h3>
     <div className="state1">      
             <div><strong>{user.calories}</strong><span>kg/day </span><br/>Calories</div>
             <div><strong>{user.protein}</strong><span>g/day</span><br/>Protine</div>
             <div><strong>{user.carbs}</strong><span>g/day</span><br/>Carbs</div>
             <div><strong>{user.fats}</strong><span>g/day</span><br/>Fats</div>
            </div>
            <p>Targets are automatically calculated based on your body stats and goal using the Miffin-St Jeor formule.</p>
        </div>
        
   

       <div className='cardProfile'>
         <h3>FOOD ALLERGIES</h3>
         <div className='tags'>
          {foods.map((food)=>{
               return(
                <button key={food} className={`tag ${selectFood.includes(food) ? "active" : ""}`}
                onClick={()=>toogleFood(food)}>  {food}  </button>
               )
          })}
         </div>
        

       </div>
   

         <div className='cardProfile'>
           <h3>ACCOUNT</h3>
           <div className='account-action'>
             <button className='btnDelete'>Delete Account</button>
             <button className='btnDelete'>Change Password</button>
           </div>


         </div>
















          
  
</div>


   </div>
     
       
</div>
  )}

        
      
 


export default ProfileSection