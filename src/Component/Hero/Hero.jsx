import './Hero.css'

const Hero = ({image,title , title1, description1 , btn}) => {
  return (
    <div className='relative h-screen '  >
        <img src={image} className='image1'/>
        <h1 className='title font-serif'>{title}</h1>
        <h2 className=' text-3xl text-orange-400 text-center font-[<alice>] font-bold'>{title1}</h2> 
        <p className='desc font-[<times new roman mt>]'>{description1}</p>
        <button className='btn1'>{btn}</button>
  
    </div>
  )
}


export default Hero
