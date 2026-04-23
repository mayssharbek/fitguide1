import { Outlet } from 'react-router'
import DoctorGuideSection from '../../Component/DoctorGuideSection/DoctorGuideSection'
import './DoctorGuide.css'

const DoctorGuide = () => {
  return (
    <div>
      <DoctorGuideSection TitleDoctorGuide="Doctor Guide"/>
      <Outlet/>
    </div>
  )
}

export default DoctorGuide
