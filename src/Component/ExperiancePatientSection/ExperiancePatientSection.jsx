import { useNavigate } from 'react-router'
import { ExperianceData } from '../../ExperianceData/ExperianceDtat'
import './ExperiancePatientSection.css'

const ExperiancePatientSection = ({titleExperiancePatient}) => {
    const navigate = useNavigate();
  

  return (
    <div className='exp-container'>
        <h1>{titleExperiancePatient}</h1>
        <div className='exp-grid'>
             {ExperianceData.map((person)=>
               (
                <div key={person.id} className='exp-card'>
                  <h3>{person.name}</h3>
                  <h3>{person.sex}</h3>
                  <p><b>Disease:{person.disease}</b></p>
                  <p><b>Experiance:{person.experiance}</b></p>
                  <img src={person.image}  alt = "blood" className="blood-img" onClick={()=>window.open(person.image)}/>
                   <p>Glucose:{person.bloodTest.glucose}</p>
                   <p>Hemoglobin : {person.bloodTest.hemoglobin}</p>
                   <p>Iron : {person.bloodTest.iron}</p>
             
                </div>

               )          
            
             )}
            
        </div>

    </div>
  )
}

export default ExperiancePatientSection
