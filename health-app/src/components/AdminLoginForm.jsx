import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../App';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Admin login successful");

      setEmail('');
      setPassword('');
      
      setMessage('Login successful!');

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch(error) {
      console.error("Admin login error: ", error.message);

      setMessage('Error: ${error.message}');

      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="App">
      <h2>Admin Login</h2>
      <form className="initialFormInput">
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={onSubmit}>
          Login
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  )
}

export default AdminLoginForm;