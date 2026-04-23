import { Outlet } from 'react-router'
import TellUs from '../TellUs/TellUs'
import './Dashboard.css'
import ProgressBar from '../../Component/ProgressBar/ProgressBar'
import NavBar1 from '../../Component/NavBar1/NavBar1'






const Dashboard = () => {
 

  return (
   <>
        <ProgressBar/>
        <TellUs/> 
 
           <Outlet/>
       
        
      
    
   </>
   

  )
}

export default Dashboard
