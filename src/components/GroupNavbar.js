import { Link } from 'react-router-dom';
import React from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import SwipeIcon from '@mui/icons-material/Swipe';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import './GroupNavbar.css';

function GroupNavbar() {
  return (
    <nav className='groupnav'>
        <div className='groupnav-container'>
            <ul className='groupnav-menu-web'>
                <li className='groupnav-item'>
                <Link to='/Swipe' className='groupnav-links' id={window.location.pathname === '/Swipe' ? "active": ""}>
                <div id='title'>Swipe</div>
                </Link>
                </li>
                <li className='groupnav-item'>
                <Link to='/Matches' className='groupnav-links' id={window.location.pathname === '/match' ? "active": ""}>
                <div id='title'>Matches</div>
                </Link>
                </li>
            </ul>
            <Link to='/Groupsetting' className='groupSetting'>
                <TuneIcon className='groupIcon'/>
                <div id='groupSettingText'>Group Settings</div>
            </Link>

            <ul className='groupnav-menu-mobile'>
                <li className='groupnav-item-mobile'>
                <Link to='/Swipe' className='groupnav-mobile-links' id={window.location.pathname === '/Swipe' ? "active": ""}>
                <div id='groupIcon'><SwipeIcon/></div>
                <div id='title'>Swipe</div>
                </Link>
                </li>
                <li className='groupnav-item-mobile'>
                <Link to='/' className='groupnav-mobile-links' id={window.location.pathname === '/match' ? "active": ""}>
                <div id='groupIcon'><Diversity1Icon/></div>
                <div id='title'>Matches</div>
                </Link>
                </li>
                <li className='groupnav-item-mobile'>
                <Link to='/Groupsetting' className='groupnav-mobile-links' id={window.location.pathname === '/Groupsetting' ? "active": ""}>
                <div id='groupIcon'><TuneIcon/></div>
                <div id='title'>Group Setting</div>
                </Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default GroupNavbar