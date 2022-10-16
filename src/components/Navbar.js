import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';

import './Navbar.css';

const Navbar = (props) => {

  /*============================= Resize Window===================================== */
  const [click, setClick] = useState(false);
  const [, setButton] = useState(true);

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
  /*============================================================================== */

  /*=============================Update Group Id===================================== */
  const [, setCurrentGroup] = useState();
  const updateGroup = React.useCallback((val) => {
    if (sessionStorage.getItem("groupname") !== val){
      setCurrentGroup(val);
      sessionStorage.setItem("groupname" , val);
    }
  }, []);
  /*========================================================================== */

  return (
    <nav className='navbar'>
        <div className='navbar-container'>

          <Link to='/Home' onClick={ () => {
              closeMobileMenu();
              sessionStorage.setItem("groupname" , null);
              }}>
            <img data-testid="image-logo" alt="logo" id='imagelogo' src="images/logo.png"/>
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <div className={click ? 'nav-menu active' : 'nav-menu'}>

            <Link to='/Uprofile' className='userProfile-mobile' onClick={ () => {
              closeMobileMenu();
              sessionStorage.setItem("groupname" , null);
              }}>
            <img alt="profile" src="images/profile.jpg" id='profileImage'/>
            <div data-testid="username-mobile" id='username'>{props.username}</div>
            </Link>

            <Link to='/Home' className='nav-links' id={window.location.pathname === '/Home' ? "active": ""} onClick={ () => {
              closeMobileMenu();
              sessionStorage.setItem("groupname" , null);
              }}>
            <div id='icon'><HomeIcon/></div>
            <div id='title'>Home</div>
            </Link>

            <span id='header'>GROUPS</span>
            <div className='userlistOfGroups'>
            {props.groups.map((val,key) =>{
                return (
                <Link key={key} to='/Swipe' className='nav-links' id={val === sessionStorage.getItem("groupname") ? "active": ""} 
                onClick={() => {
                  closeMobileMenu();
                  updateGroup(val);
                }} >
                <div id='icon'><GroupsIcon/></div>
                <div id='title'>{val}</div>
                </Link>)
              })
            }
            </div>

            <Link to='/Create' className='nav-links' id={window.location.pathname === '/Create' ? "active": ""} onClick={ () => {
              closeMobileMenu();
              sessionStorage.setItem("groupname" , null);
              }}>
            <div id='icon'><AddCircleIcon/></div>
            <div id='title'>Create</div>
            </Link>

            <Link to='/Review' className='nav-links' id={window.location.pathname === '/Review' ? "active": ""} onClick={ () => {
              closeMobileMenu();
              sessionStorage.setItem("groupname" , null);
              }}>
            <div id='icon'><RateReviewIcon/></div>
            <div id='title'>Add Review</div>
            </Link>

            <Link to='/' className='userProfile-mobileLogout' onClick={ () => {
              closeMobileMenu();
              sessionStorage.removeItem("groupname");
              sessionStorage.removeItem("id");
              }}>
            <LogoutIcon id='logouticon'/>
            <div id='title'>Logout</div>
            </Link>
          </div>

          <Link to='/Uprofile' className='userProfile-web' onClick={ () => {
              closeMobileMenu();
              sessionStorage.setItem("groupname" , null);
              }}>
            <img alt="profile" src="images/profile.jpg" id='profileImage'/>
            <div data-testid="username-web" id='username'>{props.username}</div>
          </Link>

        </div>
    </nav>
  );
}

export default Navbar;
