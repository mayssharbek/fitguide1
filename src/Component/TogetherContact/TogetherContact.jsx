import './TogetherContact.css'

const TogetherContact = ({contctImage , title5 , title6 , description3 , title7 , description4}) => {
  return (
    <div className='containerContact'>
        <div className='contactImage'>
             <img src={contctImage}/>
        </div>
         <div className='workTogether'>
               <h1 className='title5 font-serif'>{title5}</h1>
               <div className='phone'>
                 <h2 className='font-serif'>{title6}</h2>
                 <p className='font-serif'>{description3}</p>
               </div>
               
               <div className='email'>
                 <h2 className='font-serif'>{title7}</h2>
                 <p className='font-serif'>{description4}</p>
               </div>
         </div>
    </div>
  )
}

export default TogetherContact
