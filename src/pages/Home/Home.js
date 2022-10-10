import React, { useState, useEffect, useRef } from 'react';
import {matchgroup} from './matchgroup';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import RateReviewIcon from '@mui/icons-material/RateReview';
import './Homepage.css';

const Home = () => {
  /* =========================Horizontal Sliding================================ */
  const ref = useRef(null);

  useEffect(() => {
    const slider = document.querySelector('.homepage-groupList');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      console.log(walk);
    });
  })
  /* ================================================================ */

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
      <div className='homePage'>
        <Navbar />
        <div className='homePage-container'>
          <div className='homepage-group'>
            <div className='homepage-creategroup'>
              <p id='ctext'>Trying to decide what to watch? <br></br> Create a group and get matches now!</p>
              <Link style={{ textDecoration:'none'}} to='/Create' className='button1' id={window.location.pathname === '/Create' ? "active": ""} onClick={closeMobileMenu}>
                <div id='create'>Create Group</div>
              </Link>
            </div>
            <img id='cpicture' src='images/movie_vector.png'></img>
          </div>
          <div className='homepage-allGroups'>
            <p id='mtext'>Check the Matches in Your Groups </p>
            <div ref={ref} className='homepage-groupList'> 
            {matchgroup.map((val, key) =>{
                return (
                  <div className="homepage-allGroup">
                    <Link to='/Swipe' id="groupIcon">{val.title[0].toUpperCase() + val.title[val.title.length-1]}</Link>
                    <p id="groupName">{val.title}</p>
                  </div>
                )
              })
            }
            </div>
          </div>

          <div className='homepage-review'>
            <p id='rtext'>Recently watched a movie?<br></br>Leave a review for your friends!</p>
            <Link to='/Review' className='homepage-reviewbutton' id={window.location.pathname === '/review' ? "active": ""} onClick={closeMobileMenu}>
            <p id='review'>Leave Reviews</p>
            <RateReviewIcon id='reviewIcon'/>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  export default Home;
