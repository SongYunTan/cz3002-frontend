import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import RateReviewIcon from '@mui/icons-material/RateReview';

import axios from 'axios';
import Navbar from '../../components/Navbar';
import Neverlogin from '../Neverlogin/Neverlogin';
import './Homepage.css';

const Home = () => {

  /* =========================Horizontal Sliding================================ */
  const ref = useRef(null);

  useEffect(() => {
    const slider = document.querySelector('.homepage-groupList');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    if (sessionStorage.getItem("id") !== null){
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
    }
  })
  /* ===================================================================================== */

  /*=============================get User Info===================================== */  
  const [currentUser, setCurrentUser] = useState(
    {"username":"",
    "email":"",
    "groups":[]
  });

  useEffect(() => {

    const userid = sessionStorage.getItem("id");
    const getCurrentUser = async () => {
      try {
        await axios.get(
          'http://127.0.0.1:5000/profile',
        {
        params: { id: userid },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        },
        ).then((response)=> {
          console.log(JSON.stringify(response.data, null, 4));
          setCurrentUser(response.data);
        });
      } catch(err) {
        console.log(err.message);
      } 
    };
    getCurrentUser();
  }, []);
  /*============================================================================= */
  
  let c = <Navbar />
  const p = React.cloneElement(c, 
  { username: currentUser.username, email: currentUser.email, groups: currentUser.groups });

  return (
    sessionStorage.getItem("id") !== null ?
      (<div className='homePage'>
        { p }
        <div className='homePage-container'>
          <div className='homepage-group'>
            <div className='homepage-creategroup'>
              <p id='ctext'>Trying to decide what to watch? <br></br> Create a group and get matches now!</p>
              <Link style={{ textDecoration:'none'}} to='/Create' className='homepage-createbutton'>
                <p id='create'>Create Group</p>
              </Link>
            </div>
            <img alt="Home" id='cpicture' src='images/movie_vector.png'></img>
          </div>
          <div className='homepage-allGroups'>
            <p id='mtext'>Check the Matches in Your Groups </p>
            <div ref={ref} className='homepage-groupList'> 
            {currentUser.groups.map((val, key) => {
                return (
                  <div data-testid="listitem" key={key} className="homepage-allGroup">
                    <Link to='/Swipe' id="groupIcon" onClick={ () => {sessionStorage.setItem("groupname" , val);}}>
                      {val[0].toUpperCase() + val[val.length-1]}</Link>
                    <p id="groupName">{ val }</p>
                  </div>
                )
              })
            }
            </div>
          </div>

          <div className='homepage-review'>
            <p id='rtext'>Recently watched a movie?<br></br>Leave a review for your friends!</p>
            <Link to='/Review' className='homepage-reviewbutton'>
            <p id='review'>Leave Reviews</p>
            <RateReviewIcon id='reviewIcon'/>
            </Link>
          </div>
        </div>
      </div>) : (<Neverlogin />)
    );
  }
  export default Home;
