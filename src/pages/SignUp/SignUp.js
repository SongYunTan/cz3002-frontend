import React, {useState} from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import usePasswordToggle from '../../components/usePasswordToggle';
import './SignUp.css';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [PasswordInputType1, ToggleIcon1] = usePasswordToggle();
  const [password2, setPassword2] = useState('');
  const [PasswordInputType2, ToggleIcon2] = usePasswordToggle();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailValid, setEmailValid] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

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
 
    try{
      await axios.post(
        'http://127.0.0.1:5000/register',
      {username: username, password: password1, email: email},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        setSuccess(true);
      });
    } catch (err) {
      setErr(err.message);
    }
  };

  const logo = "images/logo.png"
  return (
    <div className="signupPage">
        <img alt="tindflix-logo" id="imagelogo" src={logo}/>
        <div id="failedSignup">
          {err==='' ? <p></p> : <p>The username is taken. Please try again.</p>}
        </div>
        <div id="successSignup">
          {success===true ? <p>You have signed up successfully. Please proceed to log in.</p> : <p></p>}
        </div>

        <form className="signupPage-form">
            <div id="userInput">
              <input placeholder='Email' id = "inputs" type='text' value={email} onChange={handleEmailChange} required/>
            </div>

            <div id="userInput">
              <input placeholder='Username' id = "inputs" type='text' value={username} onChange={handleUsernameChange} required/>
            </div>

            <div id="userInput">
              <input placeholder='Password' id = "inputs" type={PasswordInputType1} value={password1} onChange={handlePassword1Change} required/>
              <span id='passwordToggleIcon'>
                {ToggleIcon1}
              </span>
            </div>
            <div id="userInput">
              <input placeholder='Confirm Password' id = "inputs" type={PasswordInputType2} value={password2} onChange={handlePassword2Change} required/>
              <span id='passwordToggleIcon'>
                {ToggleIcon2}
              </span>
            </div>

            <div id="pwSame">
              {password1 !== password2 ? <p data-testid="pwSame">Passwords do not match.</p> : <p></p>}
            </div>
            <br></br>
              <button type="submit" id="signupButton" onClick={handleButtonClick}>
                SIGN UP
              </button>
        </form>
    </div>
  );
}
  
export default SignUp;