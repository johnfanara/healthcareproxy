import { useState }from 'react';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
//event handler for user name input change
  const handleUsernameInput = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }
  //event handler for password input change
  const handlePasswordInput = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)

  }

  const handleSubmit = (event) => {
    event.preventDefault()
//TO DO: REMOVE RETURN AND ENTER backend logic
    return(
    console.log(username), 
    console.log(password)
    )
  }
  return (
    <RegistrationForm handlePasswordInput={handlePasswordInput} handleSubmit={handleSubmit} handleUsernameInput={handleUsernameInput} />
  );
}

export default App;
