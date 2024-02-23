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
        <form>                                                                                            
          <div>
            <label htmlFor="email-address">
                Email address
            </label>
            <input
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
              required                                    
              placeholder="Email address"                                
            />
            </div>
            <div>
              <label htmlFor="password">
                  Password
              </label>
              <input
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required                                 
                placeholder="Password"              
              />
            </div>
            <button
            type="submit" 
            onClick={onSubmit}                        
            >  
                Sign up                                
            </button>                                                  
        </form>
      </div>
    )
  }

  export default RegistrationForm