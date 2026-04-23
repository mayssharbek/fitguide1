import { useState } from 'react'
import './DoctorGuideSection.css'
import { useNavigate } from 'react-router'
import { doctorsData } from '../../Data1/Data1';


const DoctorGuideSection = ({TitleDoctorGuide}) => {
  const navigate = useNavigate();
    
    const [search , setSearch] = useState("");
    const condition = localStorage.getItem("condition");
    const filteredDoctors = doctorsData.filter(doc =>
        (doc.condition === condition || doc.condition === "all") &&
        doc.specialty.toLowerCase().includes(search.toLowerCase())
      );
    
    
  return (
    <div>
       <h1>{TitleDoctorGuide}</h1>

      <input type="text" placeholder="Search doctor..."
        className="search"
        onChange={(e) => setSearch(e.target.value)}
        />

     <div className="doctors-grid">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="doctor-card" onClick={()=>navigate(`/features/healthdata/doctorguide/doctorsdetalies/${doc.id}`)}>

       <h2 className='sex'>Sex:{doc.sex}</h2>
       <p>Specialty: {doc.specialty}</p>
       <p>Location: {doc.location}</p>
       <p>Rating: {doc.rating}</p>
       <button>Phone:{doc.phone}</button>
     
      
      </div>

  ))}
</div>

    </div>
  )
}

export default DoctorGuideSection
