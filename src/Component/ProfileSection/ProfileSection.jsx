 import { useEffect, useState } from "react";
import "./ProfileSection.css";
import { getProfile, updateProfile } from "../../services/api";

const ProfileSection = ({ descProfile }) => {
  const [user, setUser] = useState(null);
  const [activityLevel, setActivityLevel] = useState("");
  const [diet, setDiet] = useState("");
  const [selectFood, setSelectFood] = useState([]);

  const foods = [
    "Dairy",
    "Eggs",
    "Fish",
    "Gluten",
    "Peanuts",
    "Sesame",
    "ShellFish",
    "Soy",
    "Tree Nuts",
  ];

  // toggle allergies
  const toggleFood = (food) => {
    if (selectFood.includes(food)) {
      setSelectFood(selectFood.filter((f) => f !== food));
    } else {
      setSelectFood([...selectFood, food]);
    }
  };

  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await getProfile();

        console.log("PROFILE RESPONSE:", result);
          
        if (result?.id) {
          /*const data = result.data?.data || result.data;*/
          setUser(result)
          console.log("user data" , result)
          

          /*setActivityLevel(data?.activity_level || "");
          setDiet(data?.diet_type || "");
          setSelectFood(data?.allergies || []);*/
        } else {
          console.log("Profile not found");
        }
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    loadProfile();
  }, []);

  if (!user) return <p>Loading...</p>;


  const calculateBMI = (w, h) => {
    const height = h / 100;
    return (w / (height * height)).toFixed(1);
  };

  const bmi = calculateBMI(Number(user.current_weight || 0), Number(user.height || 0));

  const getStatus = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };


 let loginUser = null 
 try{
   loginUser = JSON.parse(localStorage.getItem("user"))
 }

 catch(e){
  loginUser= null
 }






  return (
    <div className="profile-page">
      <div className="profile-container">
   
      <div className='profile1'>
        <div className='profileTitle'>
           <h1>My Profile</h1>
           <p>{descProfile}</p>
         </div>
        
        </div>
</div>


        <div className='profile-container'>
      
        <div className="cardProfile left-card">
          <div className="avatar-big">
            {loginUser?.name?.charAt(0)?.toUpperCase()}
          </div>

          <h2>{loginUser?.name}</h2>
          <p>{loginUser?.email}</p>

          <div className="state">
            <div>
              <strong>{user?.height}</strong>
              <span>Height(cm)</span>
            </div>

            <div>
              <strong>{user?.current_weight}</strong>
              <span>Weight(kg)</span>
            </div>

           

            <div>
              <strong>{bmi}</strong>
              <span>{getStatus(bmi)}</span>
            </div>
          </div>

          <div className="info-box">
            <label>Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
              <option value="very active">Very active</option>
            </select>
          </div>

          <div className="info-box">
            <label>Diet</label>
            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
              <option value="Normal">Normal</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Low Carb">Low Carb</option>
            </select>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rightProfile-side">
         
         
        <h3>PERSONAL INFORMATION</h3>
            <div className="gridProfile">
              <div className='FULL'>
                <label>FULL NAME</label>
                <input value={loginUser?.name || ""} readOnly />
              </div>
              <div className='FULL'>
               <label>EMAIL</label>
               <input value={loginUser?.email || ""} readOnly />
              </div>
             
              <div className='FULL'>
                <label>GENDER</label>
                  <div className='Sex1'>
                   <button onClick={()=>{handleSelect("gender","male")}}>Male</button>
                   <button onClick={()=>{handleSelect("gender","female")}}>Female</button>
              </div>

 </div>
 </div>




          {/* BODY INFO */}
          <div className="cardProfile">
            <h3>BODY STATE</h3>

            <div>
              <div>
                <label>HEIGHT:</label>
                <input value={user?.height || ""} readOnly />
              </div>

              <div>
                <label>WEIGHT:</label>
                <input value={user?.current_weight || ""} readOnly />
              </div>
              <div>
              <label>BODY FAT </label>
                <div className='Sex1'>
                   <button onClick={()=>handleSelect("body_fat","low")}>Low</button>
                   <button onClick={()=>handleSelect("body_fat","medium")}>Medium</button>
                   <button onClick={()=>handleSelect("body_fat","high")}>High</button>
              </div>
              </div>

              <div className='FULL'>
                <label>ACTIVITY LEVEL</label>
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very active">Very active</option>
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
              <button onClick={() => handleSelect("goal_type", "lose_fat")}>Lose Fat</button>
              <button onClick={() => handleSelect("goal_type", "maintain")}>Maintain</button>
              <button onClick={() => handleSelect("goal_type", "build_muscle")}>Build Muscle</button>
      </div>
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
  
  
  



         {/* DAILY TARGETS */}
          <div className="cardProfile">
            <h3>DAILY NUTRITION</h3>

            <div className="state1">
              <div>{user?.calories} Calories</div>
              <div>{user?.protein} Protein</div>
              <div>{user?.carbs} Carbs</div>
              <div>{user?.fats} Fats</div>
            </div>
          </div>

          {/* ALLERGIES */}
          <div className="cardProfile">
            <h3>FOOD ALLERGIES</h3>

            <div className="tags">
              {foods.map((food) => (
                <button
                  key={food}
                  onClick={() => toggleFood(food)}
                  className={selectFood.includes(food) ? "active" : ""}
                >
                  {food}
                </button>
              ))}
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
  );
};

export default ProfileSection;