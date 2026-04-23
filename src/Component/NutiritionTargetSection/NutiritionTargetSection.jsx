
import './NutiritionTargetSection.css'
import { useNavigate } from 'react-router'

const NutiritionTargetSection = ({titleNutirition , descNutiritionTarget , btn}) => {

    const navigate = useNavigate();



    const nutirition = {
        "calories": 1703,
        "carbs":31,
        "fat":52,
        "protin" : 68
    }

  return (
    <div className='containerNutiritionTarget'>
        <div className='nutirition-header'>
            <h2>{titleNutirition}</h2>
        </div>
        <div className='nutirition-desc'>
           <p>{descNutiritionTarget}</p>
        </div>

       
            <div className='nutirition-row'>
                <span className='title-Calories'>Calories</span>
                <span className='value'>{nutirition.calories}</span>
            </div>
           
            <div className='nutirition-row'>
                <span className='title-Carbs'>Carbs</span>
                <span className='value'>at least{nutirition.carbs}g</span>
            </div>

            <div className='nutirition-row'>
                <span className='title-Fat'>Fat</span>
                <span className='value'>at least{nutirition.fat}g</span>
            </div>
         
            <div className='nutirition-row'>
                <span className='title-Protin'>Protein</span>
                <span className='value'> at least{nutirition.protin}g</span>
            </div>
            <button className='Custimize-btn'>Custimize</button>
     
        <button className='btnFinish' onClick={()=>navigate("/app")}>{btn}</button>
    </div>
  )
}

export default NutiritionTargetSection
