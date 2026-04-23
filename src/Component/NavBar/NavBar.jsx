import { Link, useNavigate } from 'react-router'
import './NavBar.css'

const NavBar = ({logo , items , btn}) => {
     const navigate = useNavigate() 
      const changeUrl = ()=>{
         navigate("/auth")
      }
     

  return (
    <nav className= "  flex  justify-between items-center  h-<80px> px-[40px] m-[20px] ">
       <img src={logo}  className='logo'/>
        <div className=" flex items-start  gap-[20px]"> 
         {items?.map((item , index)=>{
          return (
            <ul className='item'>
                <li className='no-underline font-bold font-serif text-lg' key={index}><Link to={item?.url}>{item?.content}</Link></li>
            </ul>
        ) 
      })}
      </div>
      <button onClick={()=>changeUrl()} className='font-serif text-lg '>{btn}</button>
    </nav>
  )
}

export default NavBar
  