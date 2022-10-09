import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';
import {Grouplist} from './Grouplist';
import './Navbar.css';

function Navbar() {

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
    <nav className='navbar'>
        <div className='navbar-container'>

          <Link to='/' onClick={closeMobileMenu}>
            <img alt="logo" className='navbar-logo' src="images/logo.png"/>
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <div className={click ? 'nav-menu active' : 'nav-menu'}>

            <Link to='/Profile' className='userProfile-mobile' onClick={closeMobileMenu}>
            <div className='imageSize'><img alt="profile" src="images/profile.png" id='profileImg'/></div>
            <div className='userSize' id='username'>Username</div>
            </Link>

            <Link to='/home' className='nav-links' id={window.location.pathname === '/' ? "active": ""} onClick={closeMobileMenu}>
            <div id='icon'><HomeIcon/></div>
            <div id='title'>Home</div>
            </Link>

            <span className='group-header'>GROUPS</span>
            <div className='userlistOfGroups'>
            {Grouplist.map((val, key) =>{
                return (
                <Link to='/Swipe' className='nav-links' id={window.location.pathname === '/Swipe' ? "active": ""} onClick={closeMobileMenu}>
                <div id='icon'>{val.icon}</div>
                <div id='title'>{val.title}</div>
                </Link>)
              })
            }
            </div>

            <Link to='/Create' className='nav-links' id={window.location.pathname === '/Create' ? "active": ""} onClick={closeMobileMenu}>
            <div id='icon'><AddCircleIcon/></div>
            <div id='title'>Create</div>
            </Link>

            <Link to='/review' className='nav-links' id={window.location.pathname === '/review' ? "active": ""} onClick={closeMobileMenu}>
            <div id='icon'><RateReviewIcon/></div>
            <div id='title'>Add Review</div>
            </Link>
          </div>

          <Link to='/profile' className='userProfile-web' onClick={closeMobileMenu}>
            <div className='imageSize'><img alt="profile" src="images/profile.png" id='profileImg'/></div>
            <div className='userSize' id='username'>Username</div>
          </Link>

        </div>
    </nav>
  );
}

export default Navbar;
