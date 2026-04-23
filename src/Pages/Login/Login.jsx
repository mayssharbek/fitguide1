import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import './Login.css'
import AuthForm from "../../Componnent/AuthForm/AuthForm"

const Login = () => {
    const[data , setData] = useState({})
    const navigate = useNavigate()
     
    useEffect(()=> {
      if(data.email) {
         fetch("https://vica.website/api/task-login" , {
            method : "POST" ,
            headers : {
                "Accept" : "Application/json",
               "Content-Type" : "Application/json"
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("token" , `Bearer  ${res.token}` )
            
        })
        .catch(err => console.log(err))
    }

    } , [data])
    
    const input= [
          
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
        ]
    
   const condition = localStorage.getItem("condition")
       if(condition){
        navigate("/app/foodlibrary")
       }
       else{
        navigate("/dashboard")
       }

  return (
   
        <div className='containerSignUp'>
           <div className='cardRegister'>
               <h1>Login</h1>
              <AuthForm inputs={input}  submit="LogIn" changeData={setData} />
              <p className='loginLink1'>dont have an account? <Link to="/auth"><span>signup</span></Link></p>

              </div>
</div>
  ) 
}

export default Login
