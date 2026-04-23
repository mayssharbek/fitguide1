import { useState } from "react"
import './AuthForm.css'


const AuthForm = ({inputs , changeData , submit}) => {
    let data 

   const dataHandle = (event)=>{
    event.preventDefault()
      changeData(data)
   }



  return (
     <form onSubmit={dataHandle}>
          {inputs.map((input ,index)=> {
            return(
                <input type={input.type}  placeholder={input.placeholder}  name={input.name}     onChange={(event)=> {data = {...data , [input.name] : input.type!= "file" ? event.target.value : event.target.files[0]} }}  
                    key={index}/>
            )
          }     
          
          )
          }
          <button className="createAccount">{submit}</button>
     </form>
  )
}

export default AuthForm
