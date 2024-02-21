import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import AdminReportForm from './components/AdminReportForm';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Event handler for username input change
  const handleUsernameInput = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
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
    console.log(username);
    console.log(password);
  };

  return (
    <div>
      <RegistrationForm 
        handleUsernameInput={handleUsernameInput} 
        handlePasswordInput={handlePasswordInput} 
        handleSubmit={handleSubmit} 
      />
      <AdminReportForm />
    </div>
  );
}

export default App;
