
import '../index.css';
import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const RegistrationForm = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
// Clear form fields after successful submission
        setEmail('');
        setPassword('');

        // Set temporary success message
      setMessage('Registration successful!');
      
      // Clear success message after a certain period
      setTimeout(() => {
        setMessage('');
      }, 3000); //  (3 seconds) - adjust as needed
      }
      )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

         // Set temporary error message
        setMessage(`Error: ${errorMessage}`);
      
      // Clear error message after a certain period
      setTimeout(() => {
        setMessage('');
      }, 3000); // (3 seconds) - adjust
    })
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
            placeholder="Email address" />
          <input
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password" />
        
            <button
              type="submit"
              onClick={onSubmit}
            >
          Sign up
          </button>           
          {message && <p className="message">{message}</p>}                                    
        </form>
      </div>
    )
  }

  export default RegistrationForm;