import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import RegistrationForm from './components/RegistrationForm';
import AdminReportForm from './components/AdminReportForm';
import AdminLoginForm from './components/AdminLoginForm';
import PatientInfoForm from './components/PatientInfoForm'; // Ensure this import is correct

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
  const [showAdminLoginForm, setShowAdminLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

<<<<<<< HEAD
  // Event handlers for showing different forms
  const handlePatientButtonClick = () => {
    setShowPatientLoginForm(true);
    setShowAdminLoginForm(false);
    setShowRegistrationForm(false);
  };

=======
>>>>>>> 817989905f86b43b1b3d7eff15722f6bba3a8608
  const handleAdminButtonClick = () => {
    setShowAdminLoginForm(true);
    setShowRegistrationForm(false);
  };

  const handleRegistrationButtonClick = () => {
    setShowRegistrationForm(true);
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

<<<<<<< HEAD
  return (
    <div>
      <div className="App">
        <h1 className="heading">Healthcare Proxy</h1>
        <button onClick={handlePatientButtonClick}>Patient Login</button>
=======
  const handleAdminLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Admin logged in successfully");
    } catch (error) {
      console.error("Admin login error: ", error.message);
    }
  };

  return (
    <div>
      <div className="App">
        <h1 className="heading">
          Healthcare Proxy
        </h1>
>>>>>>> 817989905f86b43b1b3d7eff15722f6bba3a8608
        <button onClick={handleAdminButtonClick}>Admin Login</button>
        <button onClick={handleRegistrationButtonClick}>Register</button>
      </div>

<<<<<<< HEAD
      {showPatientLoginForm && (
        <PatientLoginForm
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
        />
      )}

=======
>>>>>>> 817989905f86b43b1b3d7eff15722f6bba3a8608
      {showAdminLoginForm && (
        <AdminLoginForm
          auth={auth}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
<<<<<<< HEAD
=======
          handleLogin={handleAdminLogin}
>>>>>>> 817989905f86b43b1b3d7eff15722f6bba3a8608
        />
      )}

      {showRegistrationForm && (
        <RegistrationForm
          auth={auth}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
<<<<<<< HEAD
        />
=======
          />
>>>>>>> 817989905f86b43b1b3d7eff15722f6bba3a8608
      )}

      {/* PatientInfoForm is always visible as per requirement */}
      <PatientInfoForm />
      <AdminReportForm />
    </div>
  );
}

export { auth, App as default };
