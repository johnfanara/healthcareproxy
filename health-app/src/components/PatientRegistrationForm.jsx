import '../index.css';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { auth } from '../App';

const PatientRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const db = getFirestore();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      const patientsCol = collection(db, 'patients');
      const q = query(patientsCol, orderBy('id', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);

      let nextPatientId = 'patient-01';
      
      if (!querySnapshot.empty) {
        const lastVisible = querySnapshot.docs[0].data();
        const currentIdNumber = parseInt(lastVisible.id.replace('patient-', ''), 10);
        const nextIdNumber = currentIdNumber + 1;
        nextPatientId = `patient-${nextIdNumber.toString().padStart(2, '0')}`;
      }

      await setDoc(doc(patientsCol, nextPatientId), {
        email: user.email,
        id: nextPatientId,
        firstName: firstName,
        lastName: lastName
      });

      console.log('Patient registration successful');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');

      setMessage('Patient registration successful!');

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error("Patient registration error:", error.message);
      let errorMessage = "Registration failed. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters long.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use. Please use a different one.";
          break;
        default:
          break;
      }
      setMessage(errorMessage);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="App">
      <h2>Register New Patient</h2> 
      <form className="initialFormInput" onSubmit={onSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First Name" 
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last Name" 
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  
          required                                    
          placeholder="Email address"/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required                                 
          placeholder="Password"/>
        <button type="submit">Sign up</button>
      </form>                                                                                           
      {message && <p className="message">{message}</p>}                                                  
    </div>
  );
};

export default PatientRegistrationForm;