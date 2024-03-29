import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AdminRegistrationForm from './components/AdminRegistrationForm';
import AdminReportForm from './components/AdminReportForm';
import AdminLoginForm from './components/AdminLoginForm';
import PatientLoginForm from './components/PatientLoginForm';
import PatientRegistrationForm from './components/PatientRegistrationForm';
import PatientSearch from './components/PatientSearch'; // Import the new PatientSearch component


import image1 from './images/AdminLoginPic.jpg'; // Import your image files
import image2 from './images/PatientLoginPic.jpg';
import image3 from './images/AdminRegisterPic.jpg';
import image4 from './images/PatientRegisterPic.jpg';

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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showAdminLoginForm, setShowAdminLoginForm] = useState(false);
  const [showAdminRegistrationForm, setShowAdminRegistrationForm] = useState(false);
  const [showPatientLoginForm, setShowPatientLoginForm] = useState(false);
  const [showPatientRegistrationForm, setShowPatientRegistrationForm] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });
    return unsubscribe; // Cleanup function
  }, []);


  const handleAdminButtonClick = () => {
    setShowAdminLoginForm(true);
    setShowAdminRegistrationForm(false);
    setShowPatientLoginForm(false);
    setShowPatientRegistrationForm(false);
  };

  const handleAdminRegistrationButtonClick = () => {
    setShowAdminRegistrationForm(true);
    setShowAdminLoginForm(false);
    setShowPatientLoginForm(false);
    setShowPatientRegistrationForm(false);
  };
  
  

  const handlePatientLoginButtonClick = () => {
    setShowPatientLoginForm(true);
    setShowAdminLoginForm(false);
    setShowAdminRegistrationForm(false);
    setShowPatientRegistrationForm(false);
  };

  const handlePatientRegistrationButtonClick = () => {
    setShowPatientRegistrationForm(true);
    setShowPatientLoginForm(false);
    setShowAdminLoginForm(false);
    setShowAdminRegistrationForm(false);
  }

  const handleUserLogout = () => {
    signOut(auth)
      .then(() => {
        setIsUserLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error during logout: ", error.message);
      });
  };

  return (
    <div className="App">
      <h1 className="heading">Farmingdale Alliance Medical</h1>
      {!isUserLoggedIn && (
        <>
        <div className="button-container">
  <div className="button-img-container" onClick={handleAdminButtonClick}>
    <img src={image1} alt="Admin Login" />
    <span>Admin Login</span>
  </div>
  <div className="button-img-container" onClick={handlePatientLoginButtonClick}>
    <img src={image2} alt="Patient Login" />
    <span>Patient Login</span>
  </div>
  <div className="button-img-container" onClick={handleAdminRegistrationButtonClick}>
    <img src={image3} alt="Register Admin" />
    <span>Register Admin</span>
  </div>
  <div className="button-img-container" onClick={handlePatientRegistrationButtonClick}>
    <img src={image4} alt="Register Patient" />
    <span>Register Patient</span>
  </div>
</div>


        
        </>
      )}
      {showAdminLoginForm && !isUserLoggedIn && (
        <AdminLoginForm />
      )}
      {showPatientLoginForm && !isUserLoggedIn && (
        <PatientLoginForm />
      )}
      {showAdminRegistrationForm && !isUserLoggedIn && (
        <AdminRegistrationForm />
      )}
      {showPatientRegistrationForm && !isUserLoggedIn && (
        <PatientRegistrationForm />
      )}
      {isUserLoggedIn && <AdminReportForm />}

      
      {isUserLoggedIn && (
        <button className="logoutButton" onClick={handleUserLogout}>
          Sign Off
        </button>
      )}
      

{isUserLoggedIn && <PatientSearch />} {/* Display the PatientSearch when the user is logged in */}
    
    </div>

    
  );
}

export { auth, App as default };