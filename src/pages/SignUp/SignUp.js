import React, {useState} from 'react';
import { Link } from "react-router-dom";
import usePasswordToggle from '../../components/usePasswordToggle';
import './SignUp.css';

function TextInput({ label }) {
  const [value, setValue] = useState('');
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="signupPage-userInput">
      <input placeholder={label==='Email'?'Email':label==='Username'?'Username':label==='Password1'?'Password':'Confirm Password'} className = "signupPage-inputs" 
      type={label==='Password1'||label==='Password2'?PasswordInputType:label==='Email'?'email':'text'} value={value} onChange={handleChange} />
      <span className={label==='Password1'|| label ==='Password2'?'signupPage-passwordToggleIcon':'signupPage-userToggle'}>
        {ToggleIcon}
      </span>
    </div>
  );
}

const SignUp = () => {
  const logo = "images/logo.png"
  return (
    <div className="signupPage">
        <img alt="tindflix-logo" className="signupPage-imagelogo" src={logo}/>
        <form className="signupPage-form">
            <TextInput label="Email"/>
            <TextInput label="Username"/>
            <TextInput label="Password1"/>
            <TextInput label="Password2"/>
            <br></br>
            <div className="signupPage-signupButton">
            <Link to="/Swipe">
                <input type="submit" value="SIGN UP" className="signupPage-register"/>
            </Link>
            </div>
        </form>
    </div>
  );
}
  
export default SignUp;