import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import AdminReportForm from './components/AdminReportForm';
import PatientLoginForm from './components/PatientLoginForm';
import AdminLoginForm from './components/AdminLoginForm';
import PatientInfoForm from './components/PatientInfoForm'; // Ensure this import is correct

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPatientLoginForm, setShowPatientLoginForm] = useState(false);
  const [showAdminLoginForm, setShowAdminLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Event handlers for showing different forms
  const handlePatientButtonClick = () => {
    setShowPatientLoginForm(true);
    setShowAdminLoginForm(false);
    setShowRegistrationForm(false);
  };

  const handleAdminButtonClick = () => {
    setShowAdminLoginForm(true);
    setShowPatientLoginForm(false);
    setShowRegistrationForm(false);
  };

  const handleRegistrationButtonClick = () => {
    setShowRegistrationForm(true);
    setShowPatientLoginForm(false);
    setShowAdminLoginForm(false);
  };

  // Event handler for email input change
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  // Event handler for password input change
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <div className="App">
        <h1 className="heading">Healthcare Proxy</h1>
        <button onClick={handlePatientButtonClick}>Patient Login</button>
        <button onClick={handleAdminButtonClick}>Admin Login</button>
        <button onClick={handleRegistrationButtonClick}>Register</button>
      </div>

      {showPatientLoginForm && (
        <PatientLoginForm
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
        />
      )}

      {showAdminLoginForm && (
        <AdminLoginForm
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
        />
      )}

      {showRegistrationForm && (
        <RegistrationForm
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
        />
      )}

      {/* PatientInfoForm is always visible as per requirement */}
      <PatientInfoForm />
      <AdminReportForm />
    </div>
  );
}

export default App;
