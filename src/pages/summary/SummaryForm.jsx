import React from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';

const SummaryForm = () => {
  return (
    <div>
      <span>
        <FormCheckInput />
        <p>
          I agree to <span color='blue'>Terms and Conditions</span>
        </p>
      </span>
    </div>
  );
};

export default SummaryForm;
