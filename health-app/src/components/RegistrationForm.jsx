//Create index.css file in 
//To DO Import index.css
import '../index.css';
import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const RegistrationForm = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
  }
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
    </div>
  )
}

  export default RegistrationForm