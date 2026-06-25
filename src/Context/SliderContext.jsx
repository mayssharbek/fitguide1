import  { createContext, useState } from "react";

  export const SliderContext = createContext();

export const SliderProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    sex: "",
    height: "",
    weight: "",
    age: "",
    body_fat: "",
    activity_level: "",
    goal_type: "",
    diet_type: "",
    allergies: []
  });

  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  
  return (
    <SliderContext.Provider value={{formData, setFormData, step, nextStep, prevStep }}>
      {children}
    </SliderContext.Provider>
  );
};
export default SliderContext
