import './SignUp.css'
import { register } from "../../services/api";
import { Link, useNavigate } from "react-router"

import { useEffect, useState } from "react"
import AuthForm from '../../Componnent/AuthForm/AuthForm'


const SignUp = () => {
  const navigate = useNavigate()
  
  const[data , setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation:""
  });

  const handleSubmit = async (formData) => {
    try {
      console.log("form data", formData);
  
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.password_confirmation
      );
  
      console.log("result", result);
  
      if (result.status === 201) {
        localStorage.setItem("token", result.data.token);
  
        alert("Registered");
        navigate("/dashboard");
      } else {
        console.log("error", result.data);
      }
  
    } catch (error) {
      console.log("ERROR:", error);
    }
  };




 

  useEffect(()=>{
      console.log("API:" , import.meta.env.VITE_API_URL)
  },[])

  /*useEffect(()=> {

    /*const form = new FormData()
    form.append("name" , data.name)
    form.append("email" , data.email)
    form.append("password" , data.password)
    /*form.append("password_confirmation" , data.confirmation)

  
  },[])*/
    
    
    /*fetch("https://vica.website/api/register" , {
     method : "POST",
     headers :{
          "Accept" : "application/json",
     
          
     },
     body : form
    })
    .then(res=>res.json())
    .then(res=>{
      localStorage.setItem("token"  `Bearer  ${res.data.token} `)
      navigate('/dashboard')
    })
    .catch(err=>console.log(err))



  },[data])*/

  
    
    
  const input=[
  {
    type : "text",
    placeholder :  "username",
    name :"name"
  },
  {
    type : "email",
    placeholder :  "example@gmail.com",
    name :"email"
  } ,
 
  {
    type : "password",
    placeholder :  "******",
    name :"password"
  } ,
  {
  
      type : "password",
      placeholder :  "******",
      name :"password_confirmation"
    
    
  }
  
  ]

  


  return (
    <div className='containerSignUp'>
    <div className='cardRegister'>
      <h1>SignUp</h1>
      <p>Already Have An Acoount?<Link to="login" className='loginLink'><span>login</span></Link></p>
          <div className="checkbox">
            <input type="checkbox"/><span>Send my weekly meal ideas</span>
          </div>
        <p className='optimal'>Optimal! These can help maintian your meal planning , and you can opt-out at any time.</p>
        <AuthForm inputs={input} submit="Create Acoount" changeData={setData}
          onSubmit={handleSubmit} />
        </div>
    </div>
  )
}

export default SignUp

  
  

  


  