import { useState } from "react"
import './AuthForm.css'


const AuthForm = ({inputs , changeData , submit , onSubmit}) => {
    const [data , setData] = useState({})

    const handleChange = (event, name, type) => {
      setData((prev) => ({
        ...prev,
        [name]: type !== "file"
          ? event.target.value
          : event.target.files[0]
      }));
    };

   const dataHandle = (event)=>{
    event.preventDefault()
     console.log("data" , data)
   
   if(onSubmit){
    onSubmit(data)
   }
  }

 

  return (
     <form onSubmit={dataHandle}>
          {inputs.map((input ,index)=> {
            return(
                <input  key={index}
                type={input.type} 
                 placeholder={input.placeholder}  
                 name={input.name}    
                 onChange={(e)=>handleChange(e , input.name , input.type)}  
                    />
            )
          }     
          
          )
          }
          <button className="createAccount">{submit}</button>
     </form>
  )
}

export default AuthForm
