import React, {useState} from 'react';
import { Link } from "react-router-dom";
import usePasswordToggle from '../../components/usePasswordToggle';
import './Login.css';

function TextInput({ label }) {
  const [value, setValue] = useState('');
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="loginPage-userInput">
      <input placeholder={label==='Password'?'Password':'Username/Email'} className = "loginPage-inputs" type={label==='Password'?PasswordInputType:'text'} value={value} onChange={handleChange} />
      <span className={label==='Password'?'loginPage-passwordToggleIcon':'loginPage-userToggle'}>
        {ToggleIcon}
      </span>
    </div>
  );
}

const Login = () => {
  const logo = "images/logo.png"
  return (
    <div className="loginPage">
        <img alt="tindflix-logo" className="loginPage-imagelogo" src={logo}/>
        <form className="loginPage-form">
            <TextInput label="Email"/>
            <TextInput label="Password"/>
            <br></br>
            <div className="LoginPage-loginButton">
            <Link to="/Swipe">
                <input type="submit" value="LOG IN" className="loginPage-login"/>
            </Link>
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