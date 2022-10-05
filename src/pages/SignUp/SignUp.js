import React, {useState} from 'react';
import { Link } from "react-router-dom";
import usePasswordToggle from '../../components/usePasswordToggle';
import './SignUp.css';
import axios from 'axios';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [password2, setPassword2] = useState('');
  const [pwSame, setPwSame] = useState(true);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePassword1Change(e) {
    setPassword1(e.target.value);
  }

  function handlePassword2Change(e) {
    setPassword2(e.target.value);
  }

  const handleButtonClick = async (e) => {
    setErr('')
    e.preventDefault()
 
    await axios.post(
      'http://127.0.0.1:5000/register',
      {username, password1, email},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    ).catch((err) => {
      setErr(err.message);
    }).then((response)=> {
      console.log(JSON.stringify(response.data, null, 4));
      setSuccess(true);
    });
  };

  const logo = "images/logo.png"
  return (
    <div className="signupPage">
        <img alt="tindflix-logo" className="signupPage-imagelogo" src={logo}/>
        <form className="signupPage-form">
            <div id="failedSignup">
              {err==='' ? <p></p> : <p>The username is taken. Please try again.</p>}
            </div>
            <div id="successSignup">
              {success===true ? <p>You have signed up successfully. Please proceed to log in.</p> : <p></p>}
            </div>

            <div id="userInput">
              <input placeholder='Email' id = "inputs" type='text' value={email} onChange={handleEmailChange} />
            </div>

            <div id="userInput">
              <input placeholder='Username' id = "inputs" type='text' value={username} onChange={handleUsernameChange} />
            </div>

            <div id="userInput">
              <input placeholder='Password' id = "inputs" type={PasswordInputType} value={password1} onChange={handlePassword1Change} />
              <span id='passwordToggleIcon'>
                {ToggleIcon}
              </span>
            </div>
            <div id="userInput">
              <input placeholder='Confirm Password' id = "inputs" type={PasswordInputType} value={password2} onChange={handlePassword2Change} />
              <span id='passwordToggleIcon'>
                {ToggleIcon}
              </span>
            </div>

            <div id="pwSame">
              {password1 !== password2 ? <p>Passwords do not match.</p> : <p></p>}
            </div>
            <br></br>
            <div className="signupPage-signupButton">
              <button type="submit" className="signupPage-register" onClick={handleButtonClick}>
                SIGN UP
              </button>
            </div>
            <div className="goLogin">
              <Link to="/" id="goLogin">Back to login</Link>
            </div>
        </form>
    </div>
  );
}
  
export default SignUp;