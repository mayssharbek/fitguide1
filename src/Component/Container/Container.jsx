import './Container.css'

const Container = ({Image1 , title1 , desc1}) => {
  return (
     <div className='container1'>
       <div className='card'>
         <div className='cardImage'>
            <img src={Image1}/>
        </div>  
      <h2 className='font-serif'>{title1}</h2>
      <p className='desc1 font-serif'>{desc1}</p>
     
      </div>
</div>
  )
}

export default Container
