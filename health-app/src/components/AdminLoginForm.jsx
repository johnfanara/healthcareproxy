import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  return (
    <div className="LoginForm">
      <h2>Admin Login</h2>
      <form>
        <div>
          <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div>
            <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)} 
            />
        </div>

        <div>
            <button onClick={onLogin}>Login</button>        
        </div>
      </form>
    </div>
  )
}

export default AdminLoginForm