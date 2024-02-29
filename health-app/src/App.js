import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import RegistrationForm from './components/RegistrationForm';
import AdminReportForm from './components/AdminReportForm';
import PatientLoginForm from './components/PatientLoginForm';
import AdminLoginForm from './components/AdminLoginForm';

const firebaseConfig = {
  apiKey: "AIzaSyBqP_Kwxy_m4fUkeR3mJL8icEMQh1bzSJQ",
  authDomain: "healthcareproxy-df31e.firebaseapp.com",
  projectId: "healthcareproxy-df31e",
  storageBucket: "healthcareproxy-df31e.appspot.com",
  messagingSenderId: "1091677666770",
  appId: "1:1091677666770:web:22eb173c5b17f7f10adc0b",
  measurementId: "G-6CNZW4TRF2"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
          auth={auth}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleSubmit={handleSubmit}
        />
      )}

      {showAdminLoginForm && (
        <AdminLoginForm
          auth={auth}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleSubmit={handleSubmit}
        />
      )}

      {showRegistrationForm && (
        <RegistrationForm
          auth={auth}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          handleSubmit={handleSubmit}
          />
      )}
      <AdminReportForm />
    </div>
  );
}

export { auth, App as default };
