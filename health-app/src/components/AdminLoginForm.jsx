import React from 'react';

const AdminLoginForm = ({ handleEmailInput, handlePasswordInput, handleSubmit }) => {
  return (
    <div className="LoginForm">
      <h2>Admin Login</h2>
      <form className="initialFormInput">
        <input type="text" name="email" placeholder="Enter email" onChange={handleEmailInput} />
        <input type="text" name="password" placeholder="Enter password" onChange={handlePasswordInput} />
      </form>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default AdminLoginForm;