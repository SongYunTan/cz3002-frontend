import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import usePasswordToggle from '../../components/usePasswordToggle';
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
      routeChange();
    });


  };

  return (
    <div className="loginPage">
        <img alt="tindflix-logo" className="loginPage-imagelogo" src={logo}/>
        <form className="loginPage-form">
          <div className="loginPage-failedLogin">
            {err==='' ? <p></p> : <p>The username and password is incorrect. Please try again.</p>}
          </div>
          <div className="loginPage-userInput">
            <input placeholder='Username' className = "loginPage-inputs" type='text' value={username} onChange={handleUsernameChange} />
          </div>

          <div className="loginPage-userInput">
            <input placeholder='Password' className = "loginPage-inputs" type='password' value={password} onChange={handlePasswordChange} />
            <span className='loginPage-passwordToggleIcon'>
              {ToggleIcon}
            </span>
          </div>

          <br></br>
          <div className="LoginPage-loginButton">
            
            <button type="submit" className="loginPage-login" onClick={handleButtonClick}>
              LOG IN
            </button>
            
          </div>
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