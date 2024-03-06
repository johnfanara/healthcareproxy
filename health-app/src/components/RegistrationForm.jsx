//Create index.css file in 
//To DO Import index.css
import '../index.css';
import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../App';

const RegistrationForm = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      console.log('Registration successful');
      setEmail('');
      setPassword('');

      setMessage('Registration successful!');
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
  } catch (error) {
    console.error("Registration error:", error.message);
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
        <h2>Register</h2> 
        <form className="initialFormInput">
        <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
              required                                    
              placeholder="Email address"/>
        <input
              type="password"
              label="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required                                 
              placeholder="Password"/>
      </form>                                                                                           
      <button type="submit" onClick={onSubmit} >  
          Sign up                                
      </button>
      {message && <p className="message"> {message}</p>}                                                  
    </div>
  )
}

  export default RegistrationForm