import './Home.css'
import Hero from '../../Component/Hero/Hero'
import SectionTitle from '../../Component/SectionTitle/SectionTitle'
import Container from '../../Component/Container/Container'
import Header from '../../Component/Header/Header'


const Home = () => {

  

 
  return (
    <>
      <Header>
      <Hero image="/assets/image/fitguide.jpg" title="STAY FIT & HEALTHY" 
      title1 = "Nutirition plane , precision tailored for you"
      description1="share your 
       our details and let our system craft a personalized meal plan 
       designed specifically for your body, goals, and lifestyle."
       btn="start now"
      />
       </Header>
        
      
    </>
  )
}

export default Home
