
import Calories from '../Calories/Calories'
import Meals from '../Meals/Meals'
import './DashboardHome.css'

const DashboardHome = () => {
  return (
    <div className='dashboard-home'>
       <div className='top-section'>
            <Calories/>
            </div>
   
             <Meals/>
    </div>

   
  )
}

export default DashboardHome
