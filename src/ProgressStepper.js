import React from 'react';

const ProgressStepper = ({ currentStep, children }) => {
  return (
    <div>
      <h3>Step {currentStep}</h3>
      <div>{children}</div>
    </div>
  );
};

export default ProgressStepper;
