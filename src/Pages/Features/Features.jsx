import { Outlet, useNavigate } from "react-router"
import Container from "../../Component/Container/Container"
import Header from "../../Component/Header/Header"
import Hero from "../../Component/Hero/Hero"
import SectionTitle from "../../Component/SectionTitle/SectionTitle"
import './Features.css'
import HealthData from "../HealthData/HealthData"


const Features = () => {
  const navigate = useNavigate();
  const cards = [{
     Image1 : "/fitguide1/assets/image/cardlogo1.jpg",
     title1 : "Personalized to Your Body",
     desc1 : "Our system uses your height,weight,age,and activity level to calculate the exact calories and nutrients your body needs to reach your goal."
  },
  {
    Image1 : "/fitguide1/assets/image/cardlogo2.jpg",
    title1 : "Precision Macro Tracking",
    desc1 : "we balance your Proteins,Carbs,and Fats.Every meal is optimizer to keep you full,energized,and burning fat or building muscle effectively."
  },
  {
    Image1 : "/fitguide1/assets/image/cardLogo3.jpg",
    title1 : "Track Your Transformation",
    desc1 : "As you lose weight or gain muscle,your needs change.Our system evolves with you, updating your meal portions as your input your weekly progress."
  }
  
    


  ]
  const goToHealthData = ()=>{
     navigate("/features/healthdata")
  }
  return (
    <>
    <Header>
       <Hero image="/fitguide1/assets/image/fruite.jpeg" title="Features FitGuide" 
         description1="Diverse group of people working out in gym, weight training, cardio machines, yoga area, bright modern fitness center, energetic vibe"
         btn = "Welcome"
      />
    </Header>
     <main>
      <SectionTitle title= "Why Choose Our Nutritionn System?"/>
       <div className="container1">
       {cards.map((card , index)=>{
           return (
             <Container key={index} 
             Image1={card.Image1}
             title1={card.title1}
             desc1={card.desc1}
            />
           )

       })}
       </div>
      
      
    </main> 
    <div className="btnRead1">
       <button onClick={goToHealthData}>Read More</button>
    </div>

     <Outlet/>
    </>
  )
}

export default Features
