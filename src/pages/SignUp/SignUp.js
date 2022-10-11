import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import usePasswordToggle from '../../components/usePasswordToggle';
import './SignUp.css';
import axios from 'axios';
import { useEffect } from 'react';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [PasswordInputType1, ToggleIcon1] = usePasswordToggle();
  const [password2, setPassword2] = useState('');
  const [PasswordInputType2, ToggleIcon2] = usePasswordToggle();
  const [err, setErr] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [userID, setUserID] = useState('')


  useEffect(()=>{
    routeChange()
  }, [userID])

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/Verify`; 
    navigate(path, {state:{id:userID,username:username,password: password1,email:email}});
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (!isValidEmail(e.target.value)) {
      setEmailValid(false);
    } else {
      setEmailValid(null);
    }
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
      {username, password: password1, email},
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
      setUserID(response.data.id);
      // routeChange();
    });
  };

  const logo = "images/logo.png"
  return (
    <div className="signupPage">
        <img alt="tindflix-logo" id="imagelogo" src={logo}/>
        <div id="failedSignup">
          {err==='' ? <p></p> : <p>The username is taken. Please try again.</p>}
        </div>

        <form className="signupPage-form">
            <div id="userInput">
              <input placeholder='Email' id = "inputs" type='text' value={email} onChange={handleEmailChange} />
            </div>
            <div id="errMsg">
              {emailValid===false && <p>Please input a valid email.</p>}
            </div>

            <div id="userInput">
              <input placeholder='Username' id = "inputs" type='text' value={username} onChange={handleUsernameChange} />
            </div>

            <div id="userInput">
              <input placeholder='Password' id = "inputs" type={PasswordInputType1} value={password1} onChange={handlePassword1Change} />
              <span id='passwordToggleIcon'>
                {ToggleIcon1}
              </span>
            </div>
            <div id="userInput">
              <input placeholder='Confirm Password' id = "inputs" type={PasswordInputType2} value={password2} onChange={handlePassword2Change} />
              <span id='passwordToggleIcon'>
                {ToggleIcon2}
              </span>
            </div>
            <div id="errMsg">
              {password1 !== password2 && <p>Passwords do not match.</p>}
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