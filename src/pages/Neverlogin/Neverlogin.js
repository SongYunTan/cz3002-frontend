import React from 'react'
import { Link } from 'react-router-dom';
import './Neverlogin.css';

const Neverlogin = () => {
  return (
    <div className='neverLoginPage'>
        <img alt="logo" id='imagelogo' src="images/logo.png"/>
        <h2 id="ltext">Please login to access the page</h2>
        <Link to='/' className='neverLogin-nav'>
        Login Now!
        </Link>
    </div>
  )
}

export default Neverlogin