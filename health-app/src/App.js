import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import RegistrationForm from './components/RegistrationForm';
import AdminReportForm from './components/AdminReportForm';
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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLoginForm, setShowAdminLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdminLoggedIn(!!user);
    });
    return unsubscribe; // Cleanup function
  }, []);
  const handleAdminButtonClick = () => {
    setShowAdminLoginForm(true);
    setShowRegistrationForm(false);
  };
  const handleRegistrationButtonClick = () => {
    setShowRegistrationForm(true);
    setShowAdminLoginForm(false);
  };
  const handleAdminLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAdminLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error during logout: ", error.message);
      });
  };
  return (
    <div className="App">
      <h1 className="heading">Healthcare Proxy</h1>
      {!isAdminLoggedIn && (
        <>
          <button onClick={handleAdminButtonClick}>Admin Login</button>
          <button onClick={handleRegistrationButtonClick}>Register</button>
        </>
      )}
      {showAdminLoginForm && !isAdminLoggedIn && (
        <AdminLoginForm />
      )}
      {showRegistrationForm && !isAdminLoggedIn && (
        <RegistrationForm />
      )}
      {isAdminLoggedIn && <AdminReportForm />}
      {isAdminLoggedIn && (
        <button className="logoutButton" onClick={handleAdminLogout}>
          Sign Off
        </button>
      )}
    </div>
  );
}
export { auth, App as default };
