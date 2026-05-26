
import Header from '../../Component/Header/Header'
import Hero from '../../Component/Hero/Hero'
import TogetherContact from '../../Component/TogetherContact/TogetherContact'
import './Contact.css'

const Contact = () => {
  return (
    <>
       <Header>
         <Hero image="/FitGuideProject/assets/image/contactImage1.jpg" title="Contact" 
         description1="Get in Touch with Us ,We Love to Hear From You , Contact Us AnyTime ,Have Question ? Contact Me"
         btn = "Contact me"/>
       </Header>
       <TogetherContact contctImage= "/FitGuideProject/assets/image/Contact.jpg"  title5="Let work together. Get in touch!"
         title6="phone" description3="+980739148"
         title7="Email"  description4="mays.sharbek@gmail.com"

       />
         
    </>
  )
}

export default Contact


