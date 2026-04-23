import { useContext } from 'react'
import './ProgressBar.css'
import SliderContext from '../../Context/SliderContext'

const ProgressBar = () => {
    const {step} = useContext(SliderContext)
    const totalStep = 5;
    const progress = ((step+1) / (totalStep) *100);

  return (
   <div className='progress-container'>
     <div className='progress-bar' style ={{ width : progress + "%"}}>
      
     </div>
   </div>
      
   
  )
}

export default ProgressBar
