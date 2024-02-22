import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import AdminReportForm from './components/AdminReportForm';
import PatientLoginForm from './components/PatientLoginForm';
import AdminLoginForm from './components/AdminLoginForm';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPatientLoginForm, setShowPatientLoginForm] = useState(false);
  const [showAdminLoginForm, setShowAdminLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handlePatientButtonClick = () => {
    setShowPatientLoginForm(true);
    setShowAdminLoginForm(false);
    setShowRegistrationForm(false);
  }

  const handleAdminButtonClick = () => {
    setShowAdminLoginForm(true);
    setShowPatientLoginForm(false);
    setShowRegistrationForm(false);
  }

  const handleRegistrationButtonClick = () => {
    setShowRegistrationForm(true);
    setShowPatientLoginForm(false);
    setShowAdminLoginForm(false);
  }

  // Event handler for email input change
  const handleEmailInput = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  // Event handler for password input change
  const handlePasswordInput = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };


  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement backend logic here
    console.log(email);
    console.log(password);
  };

  return (
    <div>
      <div className="App">
        <h1 className="heading">
          Healthcare Proxy
        </h1>
        <button onClick={handlePatientButtonClick}>Patient Login</button>
        <button onClick={handleAdminButtonClick}>Admin Login</button>
        <button onClick={handleRegistrationButtonClick}>Register</button>
      </div>

      {showPatientLoginForm && (
        <PatientLoginForm
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleSubmit={handleSubmit}
        />
      )}

      {showAdminLoginForm && (
        <AdminLoginForm
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleSubmit={handleSubmit}
        />
      )}

      {showRegistrationForm && (
        <RegistrationForm
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleSubmit={handleSubmit}
          />
      )}
      <AdminReportForm />
    </div>
  );
}

export default App;
