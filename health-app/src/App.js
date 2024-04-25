import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminRegistrationForm from './components/AdminRegistrationForm';
import AdminReportForm from './components/AdminReportForm';
import AdminLoginForm from './components/AdminLoginForm';
import PatientLoginForm from './components/PatientLoginForm';
import PatientRegistrationForm from './components/PatientRegistrationForm';
import PatientInfoForm from './components/PatientInfoForm';
import NavigationBar from './components/NavigationBar';
import NavigationInfoForm from './components/NavigationInfoForm';
import CustomFooter from './components/CustomFooter';

import image1 from './images/AdminLoginPic.jpg'; // Import your image files
import image2 from './images/PatientLoginPic.jpg';
import image3 from './images/AdminRegisterPic.jpg';
import image4 from './images/PatientRegisterPic.jpg';
import logoVideo from './images/FamLogo1.mp4';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showNavigationBar, setShowNavigationBar] = useState(false);

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setIsUserLoggedIn(true);
            setUserEmail(user.email);

            const db = getFirestore();
            const adminDoc = await getDocs(query(collection(db, 'admins'), where ('email', '==', user.email.toLowerCase())));
            if (!adminDoc.empty) {
              setIsAdmin(true);
              setIsPatient(false);
            } else {
              const patientDoc = await getDocs(query(collection(db, 'patients'), where ('email', '==', user.email.toLowerCase())));
              setIsPatient(!patientDoc.empty);
              setIsAdmin(false);
            }
          } else {
            setIsUserLoggedIn(false);
            setIsAdmin(false);
            setIsPatient(false);
            setUserEmail('');
          }
        });
        return unsubscribe;
      })
      .catch(error => {
        console.error("Error setting persistence: ", error.message);
      });
  }, []);

  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Hide the logo after 6 seconds
    const timer = setTimeout(() => {
      setShowLogo(false);
      setShowNavigationBar(true);
    }, 6000);
    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
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

  const handleIsAdmin = (adminStatus) => {
    setIsAdmin(adminStatus);
    setIsPatient(false);
  }

  const handleAdminRegistration = (adminStatus) => {
    setIsUserLoggedIn(true);
    setIsAdmin(adminStatus);
  }

  const handleIsPatient = (patientStatus) => {
    setIsAdmin(false);
    setIsPatient(patientStatus);
  }

  const handlePatientRegistration = (patientStatus) => {
    setIsUserLoggedIn(true);
    setIsAdmin(false);
    setIsPatient(patientStatus);
  }

  return (
    <Router>
      <div className="App">
        {showLogo && (
        <div className="logo-container">
          <video autoPlay muted loop className="logo">
            <source src={logoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        )}
        {showNavigationBar && (
          <NavigationBar />
        )}
        <Routes>
          <Route path="/about" element={<NavigationInfoForm formType="about" />} />
          <Route path="/mission-statement" element={<NavigationInfoForm formType="mission-statement" />} />
          <Route path="/contacts" element={<NavigationInfoForm formType="contacts" />} />
          <Route path="/documentation" element={<NavigationInfoForm formType="documentation" />} />
          <Route path="*" element={<Navigate To="/" replace/>} />
        </Routes>     
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
        <AdminLoginForm onAdminCheck={handleIsAdmin}/>
      )}
      {showPatientLoginForm && !isUserLoggedIn && (
        <PatientLoginForm onPatientCheck={handleIsPatient}/>
      )}
      {showAdminRegistrationForm && !isUserLoggedIn && (
        <AdminRegistrationForm onAdminRegistered={handleAdminRegistration}/>
      )}
      {showPatientRegistrationForm && !isUserLoggedIn && (
        <PatientRegistrationForm onPatientRegistered={handlePatientRegistration}/>
      )}    
      {isUserLoggedIn && isAdmin && <AdminReportForm />}
      {isUserLoggedIn && isPatient && <PatientInfoForm email={ userEmail }/>}
      {isUserLoggedIn && (
          <div className="logout-container">
            <button className="logoutButton" onClick={handleUserLogout}>
              Log Out
            </button>
          </div>
        )}
        {/* Footer component added here at the bottom before closing the main div */}
        <CustomFooter />
      </div>
    </Router>
  );
}

export { auth, App as default };