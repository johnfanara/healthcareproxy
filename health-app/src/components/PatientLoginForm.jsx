import React from 'react';

const PatientLoginForm = ({ handleEmailInput, handlePasswordInput, handleSubmit }) => {
  return (
    <div className="LoginForm">
      <h2>Patient Login</h2>
      <form className="initialFormInput">
        <input type="text" name="email" placeholder="Enter email" onChange={handleEmailInput} />
        <input type="text" name="password" placeholder="Enter password" onChange={handlePasswordInput} />
      </form>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default PatientLoginForm;