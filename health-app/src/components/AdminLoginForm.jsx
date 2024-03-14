import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../App';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Admin login successful");
      setEmail('');
      setPassword('');
      setMessage('Login successful!');
      setForgotPassword(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error("Admin login error: ", error.message);
      setForgotPassword(true);
      let errorMessage = "Login failed. Please check your email and password.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
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
  const onResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
      setForgotPassword(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error("Forgot password error: ", error.message);
      setMessage("Error: Unable to send reset email. Please try again.");
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }
  return (
    <div className= "App">
      <form className="initialFormInput">
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password" // Changed to password for security
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
      {forgotPassword && (
        <div>
          <p>Forgot your password?</p>
          <form className="initialFormInput">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" onClick={onResetPassword}>
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default AdminLoginForm;