import React, {useRef,useEffect} from 'react'
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import GroupNavbar from '../../components/GroupNavbar';
import Navbar from '../../components/Navbar';
import {Memberlist} from './Memberlist';
import {Genrelist} from './Genrelist';
import './Groupsetting.css';

const Groupsetting = () => {
  const ref = useRef(null);

  useEffect(() => {
    const slider = document.querySelector('.member-pic');
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
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
      console.log(walk);
    });
  })

  return (
    <div className="groupSetting-page">
      <Navbar />
      <div className='groupSetting-container'>
        <div className='groupSetting-bar'><GroupNavbar /></div>
        <div className='groupSetting-navbar'>
            <Link to='/Swipe' className="groupSetting-backbtn">
            <KeyboardBackspaceIcon className='backicon'/>
            </Link>
        </div>
        <div className='groupSetting-details'>
            <div className='groupSetting-title'>
                <h2 className='member-title'>Members:</h2>
                <button class="groupSetting-editbtn">
                <EditIcon className='editicon'/>
            </button>
            </div>
            <div ref={ref} className='member-pic'>
              {Memberlist.map((val, key) =>{
                return (
                <div key={key} className='memberInfo'>
                <img alt="memberprofile" src={val.image} id='memberImg'/>
                <div id='memberusername'>{val.username}</div>
                </div>)
                })
              }
            </div>
            <div className='groupSetting-genre'>
                <h2 className='genre-title'>Genre:</h2>
                <ul className='genre-list'>
                    {Genrelist.map((val, key) =>{
                    return (
                    <li key={key} className='genre-row'>
                    <div className='genreInfo'>
                    <button id='genrename'>{val.name}</button>
                    </div>
                    </li>)
                    })
                    }
                </ul>
            </div>
            <div className='groupSetting-delete'>
                <button class="groupSetting-deletebtn">Delete Group</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Groupsetting