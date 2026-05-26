import { Outlet } from "react-router"
import Footer from "../Component/Footer/Footer"
import NavBar from "../Component/NavBar/NavBar"


const Root = () => {

  const items=[{
    content : "Home",
    url : ""

  },
  {
    content : "Features",
    url : "features"
  },

    {
      content : "Contact",
       url : "contact"
    },
    

  ]
  return (
    <>
       <NavBar  logo="/FitGuideProject/assets/image/logo.jpg"  items ={items}  btn="SignUp/GetStarted"/>
       
    
    <Outlet/>
    </>
      
   
  )
}

export default Root
