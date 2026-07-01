import { useNavigate } from 'react-router'
import './EmailValidationSection.css'
import { useEffect, useState } from 'react';
import { resendVerificationEmail } from '../../services/api';

const EmailValidationSection = ({tilteVerification , descEmailVerification }) => {
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false)

  /*const email = localStorage.getItem("email")*/
  
    /*const user = JSON.parse(localStorage.getItem("user"));*/
    /*const email = user?.email || ""*/
    const email = localStorage.getItem("email")
  
  
  const handleResend = async()=>{
    try{
      /*setLoading(true)*/
      console.log("token" ,localStorage.getItem("token"))
      const res = await resendVerificationEmail();
      console.log(res)
      alert(res.message || "Verification email sent succesess")

      /*setTimeout(()=>{
        alert("Verification email sent succesess")
        setLoading(fales)
      },1000)*/
    }
    catch(err){
      console.log(err)
      alert(err.response?.data?.message || "falied")
      
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="verification-container">
    <div className="verification-card">
  
      <h1>{tilteVerification}</h1>

      <p className="descVerification">
         {descEmailVerification}
      </p>

      <h3 className="emailVerification">{email}</h3>

      <p className="note">
        Please check your inbox and click the verification link to activate
        your account.
      </p>

      <button
        className="resend-btn"
        onClick={handleResend}
        disabled={loading}
      >
        {loading ? "Sending..." : "Resend Email"}
      </button>

      <button
        className="back-btn"
        onClick={() => navigate("/auth/login")}
      >
       GO to Login
      </button>
    </div>
  </div>
);
};
      
  
export default EmailValidationSection

