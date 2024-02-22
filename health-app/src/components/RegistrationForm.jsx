//Create index.css file in 
//To DO Import index.css
import '../index.css';


const RegistrationForm = ({ handleEmailInput, handlePasswordInput, handleSubmit }) => {
    return (
      <div className="App">
        <h2>Register</h2> 
        <form className="intialFormInput">
          <input type='text' name='email' placeholder='email' onChange={handleEmailInput} />
          <input type='text' name='password' placeholder='Enter password' onChange={handlePasswordInput} />
        </form>
        <button onClick={handleSubmit}>Register</button>
      </div>
      
    )
  }

  export default RegistrationForm