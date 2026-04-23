import { useNavigate } from 'react-router'
import './NavBar1.css'
import { useState } from 'react';

const NavBar1 = () => {
    const[open , setOpen] = useState(false);
    const navigate = useNavigate();
  return (
    <div className= "navbar ">
           <img src="/fitguide/assets/image/logo.jpg"  className='logo'/>

    
      <div className="nav-center">
        <span onClick={() => navigate("/app")}>
          Dashboard
        </span>
      </div>

        <div className='rightSide'>
            <span>🔔</span>
            <span>⚙️</span>
  
    
       <div className='profile' onClick={()=>setOpen(!open)}>
          <div className='avatar'>U</div>
            {open &&(
              <div className='dropdown'>
                 <p onClick={()=>navigate("/app/profile")}>Profile</p>
              </div>
            )}
         
       </div>

      </div>

    </div>
  );
}
    

export default NavBar1

