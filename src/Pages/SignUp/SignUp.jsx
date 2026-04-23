import './SignUp.css'
import { Link, useNavigate } from "react-router"

import { useEffect, useState } from "react"
import AuthForm from '../../Componnent/AuthForm/AuthForm'


const SignUp = () => {
  const navigate = useNavigate()
  
  const[data , setData] = useState({})


  useEffect(()=> {

    const form = new FormData()
    form.append("user_name" , data.user_name)
    form.append("Email" , data.Email)
    form.append("password" , data.password)
    form.append("password_confirmation" , data.confirmation)


    fetch("https://vica.website/api/register" , {
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
  
  },[data])
  const input=[
  {
    type : "text",
    placeholder :  "username",
    name :"Username"
  },
  {
    type : "email",
    placeholder :  "example@gmail.com",
    name :"Email"
  } ,
 
  {
    type : "password",
    placeholder :  "******",
    name :"Password"
  } ,
  {
    type : "password",
    placeholder :  "******",
    name :"password_confirmation"
  } ,
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
        <AuthForm inputs={input} submit="Create Acoount" changeData={setData} />
        </div>
    </div>
  )
}

export default SignUp
