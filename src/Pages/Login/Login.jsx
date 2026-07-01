import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import './Login.css'
import AuthForm from "../../Componnent/AuthForm/AuthForm"
import { login1 } from "../../services/api"



const Login = () => {
    const[data , setData] = useState({
      email : "",
      password: ""
    })
    const navigate = useNavigate()
     
   /* useEffect(()=> {
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
*/

 

  const handleSubmit = async(formData)=>{
    console.log("form data" ,formData)
    try{
      const result = await login1(
        formData.email,
        formData.password,
      )
      console.log("result" , result)

       if(!result){
        alert("server error")
        return
     }


      if(result?.status=== "success")
    {
      localStorage.setItem("token" , result.data.token)
      localStorage.setItem("user" , JSON.stringify(result.data.user))

    
       console.log("token" , result.data.token)
       console.log("user" ,(result.data.user) )
      alert("Registered");
      navigate("/dashboard")}

      else{
      console.log("error" , result)
      alert("Falied");
      }
    }

    catch(error){
      console.log("error" , error)
      alert("Falied")
    }
  };
    
  useEffect(()=>{
    console.log("API:" , import.meta.env.VITE_API_URL)
},[])




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
              <AuthForm inputs={input}  submit="LogIn" changeData={setData}  onSubmit={handleSubmit}/>
              <p className='loginLink1'>dont have an account? <Link to="/auth"><span>signup</span></Link></p>

              </div>
</div>
  ) 
}

export default Login
