import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import usePasswordToggle from '../../components/usePasswordToggle';
import { setGlobalState } from '../../state';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const logo = "images/logo.png"
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/Swipe`; 
    navigate(path);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleButtonClick = async (e) => {
    setErr('')
    e.preventDefault()
    setIsLoading(true);
 
    await axios.post(
      'http://127.0.0.1:5000/login',
      {username, password},
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
      setIsLoading(false);
      setGlobalState("globalUsername", username);
      routeChange();
    });
  };

  return (
    <div className="loginPage">
        <img alt="tindflix-logo" id="imagelogo" src={logo}/>
        <form className="loginPage-form">
          <div id="failedLogin">
            {err==='' ? <p></p> : <p>The username and password is incorrect. Please try again.</p>}
          </div>
          <div id="userInput">
            <input placeholder='Username' id = "inputs" type='text' value={username} onChange={handleUsernameChange} />
          </div>

          <div id="userInput">
            <input placeholder='Password' id = "inputs" type={PasswordInputType} value={password} onChange={handlePasswordChange} />
            <span id='passwordToggleIcon'>
              {ToggleIcon}
            </span>
          </div>

          <br></br>
            <button type="submit" id="loginButton" onClick={handleButtonClick}>
              LOG IN
            </button>
        </form>

        <div className="LoginPage-forgetRemember">
            <p id="forgetPassword">Forget Password?</p>
            <p id="rememberMe">Remember Me</p>
        </div>
        
        <p className="loginPage-signupLink">
          New to Tindflix? 
          <Link id='signupLink' to="/SignUp">Sign Up</Link>
        </p>
    </div>
  );
}
  
export default Login;