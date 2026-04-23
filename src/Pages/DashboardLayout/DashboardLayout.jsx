import { Outlet } from 'react-router'
import NavBar1 from '../../Component/NavBar1/NavBar1'
import './DashboardLayout.css'

const DashboardLayout = () => {
  return (
    <div>
      <NavBar1/>
      <Outlet/>
    </div>
  )
}

export default DashboardLayout

