import { Outlet, useNavigate } from 'react-router'
import { Data } from '../../Data/Data'
import './HealthDataSection.css'

const HealthDataSection = ({titleHealthData}) => {
    const navigate = useNavigate();
    const handleSelect = (type)=>{
        localStorage.setItem("condition" ,type)
        navigate("/auth/login")
    }

     const goToExperiancePage = ()=>{
        navigate("/features/healthdata/experiancepatient")
     }
     const goToDoctorGuide = ()=>{
        navigate("/features/healthdata/doctorguide")
     }
  return (
    <div className='feature-container'>
      <h1>{titleHealthData}</h1>
      <div className='feature-grid'>
       {Data.map((item)=>(
        <div key={item.id} className='cardFeature'>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <h3>Good Foods</h3>
            <ul>
                {item.goodFoods.map((food , i)=>(
                     <li key={i}>{food}</li>
                ))}
            </ul>
                
                <h3>Bad Foods</h3>
                <ul>
                    {item.badFood.map((food , i)=>(
                        <li key={i}>{food}</li>
                    ))}
                </ul>


             <button onClick={()=>handleSelect(item.type)}>Use This Plan</button>



        </div>
       ))}
          

    </div>
    <button onClick={goToExperiancePage}>Read Experiance Patient</button>
    <button onClick={goToDoctorGuide} className='doctorGuide'>Go To Doctor Guide</button>
    <Outlet/>
    </div>
   
  )
}

export default HealthDataSection
