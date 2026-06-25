import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  RouterProvider, createBrowserRouter } from 'react-router'
import Home from './Pages/Home/Home'
import Root from './Pages/Root'
import Contact from './Pages/Contact/Contact'
import Auth from './Pages/Auth'
import Features from './Pages/Features/Features'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import Dashboard from './Pages/Dashboard/Dashboard'
import TellUs from './Pages/TellUs/TellUs'
import Goal from './Pages/Goal/Goal'
import SystemEat from './Pages/SystemEat/SystemEat'
import AvoidEat from './Pages/AvoidEat/AvoidEat'
import NutiritionTarget from './Pages/NutiritionTarget/NutiritionTarget'
import {SliderProvider} from './Context/SliderContext'
import Meals from './Pages/Meals/Meals'
import FoodLibrary from './Pages/FoodLibrary/FoodLibrary'
import Calories from './Pages/Calories/Calories'
import HealthData from './Pages/HealthData/HealthData'
import ExperiancePatient from './Pages/ExperiancePatient/ExperiancePatient'
import DoctorGuide from './Pages/DoctorGuide/DoctorGuide'
import DoctorsDetalies from './Pages/DoctorsDetalies/DoctorsDetalies'
import DashboardLayout from './Pages/DashboardLayout/DashboardLayout'
import DashboardHome from './Pages/DashboardHome/DashboardHome'
import Profile from './Pages/Profile/Profile'
import MealLogs from './Pages/MealLogs/MealLogs'
import MealPlan from './Pages/MealPlan/MealPlan'
import Progress from './Pages/Progress/Progress'
import EmailVerification from './Pages/EmailVerification/EmailVerification'


const routes = createBrowserRouter([
  {
   path: "/",
   element: <Root/>,
   children : [
    {
      path: "",
      element: <Home/>
    },
    { 
      path:"features",
      element: <Features/>,
      children : [
      {
        path:"healthdata",
        element : <HealthData/>,
        children : [
          {
            path : "experiancepatient",
            element : <ExperiancePatient/>
          },
          {
            path :"doctorguide",
            element : <DoctorGuide/>,
            children : [
              {
                path :"doctorsdetalies/:id",
                element : <DoctorsDetalies/>
              }
            ]
            
          }
        ]
      }
      ]

    },
    {
      path:"contact",
      element: <Contact/>
    }
   ]
  },
  {
    path: "/auth",
    element: <Auth/>,
    children : [
      {
        path: "signup",
        element: <SignUp/>,
        
      },
      {
         path: "emailverification",
         element: <EmailVerification/>,
      },
      {
        path: "login",
        element: <Login/>
      }
    ]
  },
  {
    path : "/dashboard",
    element : <Dashboard/>,
    children : [
      {
      path : "tellus",
      element : <TellUs/>
    },
    {
      path : "goal",
      element : <Goal/>
    },
    {
      path : "systemeat",
      element : <SystemEat/>
    },
    {
      path : "avoideat",
      element : <AvoidEat/>
    },
    {
      path : "nutiritiontarget",
      element : <NutiritionTarget/>
    },
    
  ]},
  {
    path:"/app",
    element:<DashboardLayout/>,
    children:[
      {
        path : "",
        element:<DashboardHome/>
      },
      { 
        path : "meals",
        element : <Meals/>
      },
      { 
        path : "foodlibrary",
        element : <FoodLibrary/>
      },
      {
        path : "calories",
        element : <Calories/>
      },
      {
        path : "profile",
        element : <Profile/>
      },
      {
        path: "meallogs",
        element : <MealLogs/>
      },
      {
        path:"mealplan",
        element:<MealPlan/>
      },
      {
        path:"progress",
        element:<Progress/>
      }
    ]
    
  }
  
  
],
{
  basename : "/FitGuideProject"
}
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SliderProvider>
    <RouterProvider router={routes}/>
    </SliderProvider>
  </StrictMode>

)



