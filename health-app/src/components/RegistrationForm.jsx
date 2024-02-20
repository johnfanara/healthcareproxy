//Create index.css file in 
//To DO Import index.css
import '../index.css';


const RegistrationForm = ({ handlePasswordInput, handleSubmit, handleUsernameInput }) => {
    return (
        
      <div className="App">
        <h1 className='heading'>
          Healthcare Proxy
        </h1>
    
        <form className="intialFormInput">
          <input type='text' name='username' placeholder='Enter username' onChange={handleUsernameInput} />
          <input type='text' name='password' placeholder='Enter password' onChange={handlePasswordInput} />
        </form>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      
    )
  }

  export default RegistrationForm