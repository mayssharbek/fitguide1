import { Outlet } from 'react-router'
import SignUp from './SignUp/SignUp'


const Auth = () => {
  return (
    <div>
        <SignUp/>
        <Outlet/>
    </div>
  )
}

export default Auth
