


/*import axios from "axios";

export const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL


});*/

const API_URL = import.meta.env.VITE_API_URL;
const url = API_URL + "/api/auth/register"
const url1= API_URL + "/api/profiles"
const url2= API_URL + "/api/meals"
const url3= API_URL+ "/api/meal-plans"
console.log(url3)
console.log(url2)
console.log(url)

console.log(import.meta.env.VITE_API_URL)



/*register*/
export const register = async (name, email, password, password_confirmation) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
       password_confirmation
      })
    });

    console.log("STATUS:", response.status);

    

    const data = await response.json();
    console.log(data);

    return {status: response.status , data};

  } catch (error) {
    console.log("FETCH ERROR:", error);
  }

};

/*logIn*/
 export const login1 = async ( email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

   

    const data = await response.json();
    console.log(data);

   /* return{status: response.status.data} */
   return data

  } 
  catch (error) {
    console.log("FETCH ERROR:", error);
  }

};



const getToken = ()=>{
  return  localStorage.getItem("token") || ""
 
 }


/*Profile*/
export const getProfile = async () => {
 
  /*console.log("TOKEN FROM STORAGE:", localStorage.getItem("token"));*/
    const response = await fetch(`${API_URL}/api/profiles`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      
      }},
      console.log(`${API_URL}/api/profiles`));
      console.log("STATUS:", response.status);

      /*const data = await response.json()
      return {status : response.status,data}
*/      return await response.json()
    }
  
  

    export const createProfile = async (profileData) => {
      const response = await fetch(`${API_URL}/api/profiles`, {
        method: "POST",
        headers: {
          "Authorization":` Bearer ${getToken()}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(profileData),
      });
    
     return await response.json()
        
      }



  
  export const updateProfile = async (profileData) => {
  
    const response = await fetch(`${API_URL}/api/profiles`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      
      },
      body:JSON.stringify(profileData)
      
    });
    
   
      return await response.json()

  }





/*Meals*/
/*جلب كل الوجبات*/
export const getMeals = async () => {
  const response = await fetch(`${API_URL}/api/meals`,
    {
      headers: {
        "Authorization": `Bearer ${getToken()}`,
         "Accept": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    }
  );

  return response.json();
};

  

/*وجبة واحدة */
export const getMeal = async (id) => {
  const response = await fetch(`${API_URL}/api/meals/${id}`,
    {
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type":"application/json",
         "Accept": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    }
  );

  return response.json();
};



/*Meal logs */
export const getMealLogs = async () => {
  const response = await fetch(`${API_URL}/api/meal-logs`,
    {
      method:"GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
         "Accept": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    }
  );

  return response.json();
};



export const createMealLogs = async (logData) => {
  console.log("sending", logData)
  const response = await fetch(`${API_URL}/api/meal-logs`,
  
    {
      
      method:"POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
         "Accept": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({
        meal_id : logData.meal_id,
        quantity: logData.quantity,
        log_date: logData.log_date,
        meal_time: logData.meal_time
      })
    }
  );
  
  return response.json();
};


export const deleteMealLogs = async (id) => {
  const response = await fetch(`${API_URL}/api/meal-logs/${id}`,
    {
      method:"DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
         "Accept": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    }
  );

  return response.json();
};





/*meal plan*/

export const getMealPlan = async () => {
  const response = await fetch(`${API_URL}/api/meal-plans`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
    },
  });

  return await response.json();
};

// ================= GET ONE =================
export const getMealPlan1 = async (mealId) => {
  const response = await fetch(`${API_URL}/api/meal-plans/${mealId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
    },
  });

  return await response.json();
};

// ================= DELETE =================
export const deleteMealPlan = async (id) => {
  const response = await fetch(`${API_URL}/api/meal-plans/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
    },
  });

  return await response.json();
};

// ================= SWAP =================
/*export const swapMeal = async (itemId, mealId) => {
  const res = await fetch(
    `${API_URL}/api/meal-plans/swap/${itemId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
        "Accept": "application/json",
      },
      body: JSON.stringify({
        meal_id: mealId,
      }),
    }
  );

  return await res.json();
};*/
export const swapMeal = async (MealPlanItemId, mealId) => {
  const res = await fetch(
    `${API_URL}/api/meal-plans/swap/${MealPlanItemId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
        "Accept": "application/json",
      },
      body: JSON.stringify({
        meal_id: mealId,
      }),
    }
  );

  return await res.json();
};

// ================= GENERATE =================
export const generateMealPlan = async () => {
  const res = await fetch(`${API_URL}/api/meal-plans/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
    },
  });

  return await res.json();
};






/*weight-logs*/
export const getWeightLogs = async () => {
  const response = await fetch(`${API_URL}/api/weight-logs`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
    },
  });

  return await response.json();
};



export const createWeightLogs = async (data) => {
  const response = await fetch(`${API_URL}/api/weight-logs`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};




/*nutirition Target*/
export const nutiritionTargetGet = async () => {
  const response = await fetch(`${API_URL}/api/goals`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    
  });

  return await response.json();
};





/*verification*/

export const resendVerificationEmail = async () => {
  const response = await fetch(`${API_URL}/api/email/resend`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Accept": "application/json",
    },
   
  });
console.log("status" , response.status)
  return await response.json();
};

