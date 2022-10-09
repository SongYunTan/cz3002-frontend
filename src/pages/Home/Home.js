import React, { useState, useEffect } from 'react';
import {matchgroup} from './matchgroup';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import './Homepage.css';

const Home = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
    return (
      <div className='home'>
        <Navbar />
        <div className='homepage'>
        <div className='group'>
            <p id='ctext'>Trying to decide what to watch? <br></br> Create a group and get matches now!</p>
            <Link  style={{ textDecoration:'none'}} to='/Create' className='button1' id={window.location.pathname === '/Create' ? "active": ""} onClick={closeMobileMenu}>
            <div id='create'>Create</div>
            </Link>
            <div className='createpic'>
              <img id='cpicture' src='images/cpicture.png'></img>
            </div>
        </div>
        <div className='group'>
            <p id='mtext'>Check the Matches in Your Groups </p>
            {matchgroup.map((val, key) =>{
                return (
                  <div className="groups">
                    <img className='groupicon' alt='group pic' src={'images/' + val.image}></img>
                    <p>{val.title}</p>
                  </div>
                )
              })
            } 
        </div>
        <div>
            <p id='rtext'>Recently watched a movie?<br></br>Leave a review for your friends!</p>
            <Link to='/review'  style={{ textDecoration:'none'}} className='button1' id={window.location.pathname === '/review' ? "active": ""} onClick={closeMobileMenu}>
            <div id='review'>Review</div>
            </Link>
        </div>
        </div>
     </div>
      
    )
  }
  export default Home;
