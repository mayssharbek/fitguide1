import { useNavigate, useParams } from 'react-router'
import './DoctorsDetaliesSection.css'
import { doctorsData } from '../../Data1/Data1';

const DoctorsDetaliesSection = () => {
      const navigate = useNavigate()
      const {id} = useParams();
      const doctor = doctorsData.find(d=>d.id === Number(id));
      
      if(!doctor){
        return (
            <h2>Doctor not found</h2>
        )
      }
  return (
    <div className='doctor-details'>
        <button className='backBtn' onClick={()=>navigate(-1)}>Back</button>
      <h1>Sex:{doctor.sex}</h1>
      <p><span>Specialty:</span>{doctor.specialty}</p>
      <p><span>Location:</span>{doctor.location}</p>
      <p><span>Experience:</span>{doctor.experience}</p>
      <p><span>Rating:</span>{doctor.rating}</p>
      <p className='doctorDec'><span>Description:</span>{doctor.description}</p>
      <p><span>Patients:</span>{doctor.patients}</p>
      <p><span>WorkingHours:</span>{doctor.workingHours}</p>
      <p><span>Price:</span>{doctor.price}</p>
      <p><span>Education:</span>{doctor.education}</p>
      <p><span>Languages:</span>{doctor.languages}</p>
     

      <div className='actionPhone1'>
         <a href={`tel:${doctor.phone}`} className='call'>Call</a>
      </div>
    </div>
  )
}

export default DoctorsDetaliesSection

