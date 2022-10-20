import React, {useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import './Verify.css';
import axios from 'axios';
import { Oval } from 'react-loading-icons';
import { useEffect } from 'react';

const Verify = () => {
  const logo = "images/logo.png"
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const id = location.state.id;
  const username = location.state.username;
  const email = location.state.email;
  const password = location.state.password;

  function handleCodeChange(e) {
    const result = e.target.value.replace(/\D/g, '');
    setCode(result);
  }

  useEffect(()=>  {
    if (code.length===6) {
      callVerifyAPI();
    }
  }, [code]);


  const callVerifyAPI = async () => {
    setErr('')
    setIsLoading(true);
    setSuccess(false);
    try{
      await axios.post(
        'http://127.0.0.1:5000/verify-code',
        {id, code},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      ).then((response)=> {
        console.log(response)
        if (response.status === 200) {
          setSuccess(true);
          setErr('')
        }
        setIsLoading(false);
      });
    }
    catch (err) {
      setErr(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="verifyPage">
        <img alt="tindflix-logo" id="imagelogo" src={logo}/>
        <form className="verifyPage-form">
          <h3>We sent a code to your email, please key in the code here to verify your email and complete your sign up.</h3>
          <div id="successSignup">
            {success===true ? <p>You have signed up successfully. Please proceed to log in.</p> : <p></p>}
          </div>
          <div id="failedVerify">
            {err==='' ? <p></p> : <p>The code is incorrect. Please try again.</p>}
          </div>
          <div id='userInput'>
            <input id = "inputs" type='text' maxLength={6} value={code} onChange={handleCodeChange} />
          </div>
          {isLoading===true && <Oval />}
          {success===true && <Link to="/" id="goLogin">Back to login</Link>}
        </form>
    </div>
  );
}
  
export default Verify;