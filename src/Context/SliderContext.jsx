import React, { createContext, useState } from "react";

export const SliderContext = createContext();

export const SliderProvider = ({ children }) => {

  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <SliderContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </SliderContext.Provider>
  );
};
export default SliderContext
