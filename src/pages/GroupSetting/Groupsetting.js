import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import GroupNavbar from '../../components/GroupNavbar';
import Navbar from '../../components/Navbar';
import Neverlogin from '../Neverlogin/Neverlogin';
import Popup from '../../components/Popup';
import './Groupsetting.css';

const Groupsetting = () => {
  /* =========================Horizontal Sliding================================ */
  const ref = useRef(null);

  useEffect(() => {
    const slider = document.querySelector('.groupMemberlist');
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
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
        console.log(walk);
      });
    }
  })
  /* ============================================================================= */

  /* =========================Get Group Information================================ */
  const [currentUser, setCurrentUser] = useState(
    {
    "username":"",
    "email":"",
    "groups":[],
    });

  const [currentGroup, setCurrentGroup] = useState(
    {
    "groupmembers":[],
    "groupgenres":[],
    });

  const [allgenre, setAllgenre] = useState([
    {"name" : ""}
    ]);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    let userid = sessionStorage.getItem("id");
    let groupName = sessionStorage.getItem("groupname");

    const getCurrentSettings = async () => {
      try {
        const response1 = await axios.get( 'http://127.0.0.1:5000/get_groupInfo',
        {
        params: { groupname: groupName },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        });
  
        const response2 = await axios.get( 'http://127.0.0.1:5000/profile',
        {
        params: { id: userid },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        });
  
        const response3 = await axios.get('http://127.0.0.1:5000/get_users',
        {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        });
  
        const response4 = await axios.get('http://127.0.0.1:5000/get_genres',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
  
        axios.all([response1, response2, response3, response4])
        .then(axios.spread((...responses) => {
  
          const responseOne = responses[0].data;
          const responseTwo = responses[1].data;
          const responseThree = responses[2].data;
          const responseFour = responses[3].data;
               
          setCurrentGroup(responseOne);
          setCurrentUser(responseTwo);
          setAllUsers(responseThree);
          setAllgenre(responseFour);
        }))
      } catch (err) {
        console.log(err.message);
      };
    };
    getCurrentSettings();
  }, []);
  /* ============================================================================= */

  /* =========================Delete Group================================ */
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/Home'; 
    navigate(path);
  }

  const deleteGroup = async (groupname) => {
    try {
      await axios.post( 'http://127.0.0.1:5000/delete_group',
      {groupName: groupname},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        routeChange();
      })
    } catch (err) {
      console.log(err.message);
    };
  };

  /* ============================================================================= */
  
  /* =========================Pop Up buttons================================ */
  const[button, setButton] = useState(false);
  const[button1, setButton1] = useState(false);
  const[button2, setButton2] = useState(false);
  const[button3, setButton3] = useState(false);
  /* ================================================================ */

  /* =========================Add New Members================================ */
  const[searchUsername, setUsername] = useState("");

  const addNewMembers = async (userName) => {
    let groupname = sessionStorage.getItem("groupname");
    
    try {
      await axios.post(
        'http://127.0.0.1:5000/add_members', {groupName: groupname, username: userName},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        setUsername("");
        setButton(false);
        window.location.reload(false)
      });
    } catch (err) {
      console.log(err.message);
    };
  };
  /* ============================================================================= */
  
  /* =========================Delete Members================================ */
  const removeMembers = async (userName) => {
    let groupname = sessionStorage.getItem("groupname");
    
    try {
      await axios.post(
        'http://127.0.0.1:5000/remove_user', {groupName: groupname, username: userName},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        setUsername("");
        setButton1(false);
        window.location.reload(false)
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  /* ============================================================================= */

  /* =========================Add New Genre================================ */
  const addNewGenre = async (genreName) => {
    let groupname = sessionStorage.getItem("groupname");
    
    try {
      await axios.post(
        'http://127.0.0.1:5000/add_group_genre', {groupName: groupname, genre: genreName},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        setButton2(false);
        window.location.reload(false)
      });
    }catch (err)  {
      console.log(err.message);
    }
  };
  /* ============================================================================= */

  /* =========================Remove Genre================================ */
  const removeGenre = async (genreName) => {
    let groupname = sessionStorage.getItem("groupname");
    
    try {
      await axios.post(
        'http://127.0.0.1:5000/remove_group_genre', {groupName: groupname, genre: genreName},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        setButton3(false);
        window.location.reload(false)
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  /* ============================================================================= */
  
  let c = <Navbar />
  const p = React.cloneElement(c, 
  { username: currentUser.username, email: currentUser.email, groups: currentUser.groups });
    
  return (
    sessionStorage.getItem("id") !== null ?
    (<div className="groupSettingPage">
      { p }
      <div className='groupSetting-Container'>
        <div className='groupSetting-groupNavbar'><GroupNavbar /></div>
        <div className='groupSetting-navbar'>
            <Link to='/Swipe' id="backbtn">
            <KeyboardBackspaceIcon id='backicon'/>
            </Link>
        </div>
        <div className='groupSetting-details'>
            <div className='groupSetting-membertitle'>
                <h2 id='title'>Members:</h2>
                <button className="groupSetting-editbtn" onClick={() => setButton(true)}>
                  <EditIcon id='editicon'/>
                </button>
                <button className="groupSetting-deletebtn" onClick={() => setButton1(true)}>
                  <DeleteIcon id='deleteicon'/>
                </button>
            </div>
            <div ref={ref} className='groupMemberlist'>
              {currentGroup.groupmembers.map((val, key) =>{
                return (
                <div key={key} className='memberInfo'>
                  <img alt="member Profile" src={'images/profile.jpg'} id='memberImage'/>
                  <div id='memberUsername'>{ val }</div>
                </div>)
                })
              }
            </div>
            <div className='groupSetting-genre'>
                <div className='groupSetting-genretitle'>
                  <h2 id='title'>Genre:</h2>
                  <button className="groupSetting-editbtn" onClick={() => setButton2(true)}>
                    <EditIcon id='editicon'/>
                  </button>
                  <button className="groupSetting-deletebtn" onClick={() => setButton3(true)}>
                    <DeleteIcon id='deleteicon'/>
                  </button>
                </div>
                <ul className='genre-list'>
                    {currentGroup.groupgenres.map((val, key) =>{
                    return (
                    <li key={key} className='genreInfo'>
                      <button id='genrename'>{ val }</button>
                    </li>)
                    })
                    }
                </ul>
            </div>
            <div className='groupSetting-delete'>
                <button id="deleteBtn" onClick={() => deleteGroup(sessionStorage.getItem("groupname")) }>Delete Group</ button>
            </div>

            <Popup trigger = {button} setTrigger= {setButton}>
              <div className = "popup-addNewMember">
              <input placeholder="Search Username" type="text" 
                className="groupSetting-searchAllUser" onChange={e => {setUsername(e.target.value)}}></input>
                <div className='groupSetting-allUserList'>
                    {allUsers.filter((val) =>{
                      if (searchUsername === "" && !currentGroup.groupmembers.includes(val.username)){
                        return val
                      } else if (!currentGroup.groupmembers.includes(val.username) && val.username.toLowerCase().includes(searchUsername.toLowerCase())){
                        return val
                      } else return null
                    }).map((val, key) =>{
                      return (
                      <button key={key} className='groupSetting-userInfo' onClick={() => addNewMembers(val.username)}>
                        <img alt="groupSetting-user" src="images/profile.jpg" id='userImage'/>
                        <div id='userName'>{val.username}</div>
                      </button>)
                      })
                    }
                </div>
              </div>
            </Popup>  

            <Popup trigger = {button1} setTrigger= {setButton1}>
              <div className = "popup-addNewMember">
              <input placeholder="Search Username" type="text" 
                className="groupSetting-searchAllUser" onChange={e => {setUsername(e.target.value)}}></input>
                <div className='groupSetting-allUserList'>
                    {currentGroup.groupmembers.filter((val) =>{
                      if (searchUsername === ""){
                        return val
                      } else if (val.toLowerCase().includes(searchUsername.toLowerCase())){
                        return val
                      } else return null
                    }).map((val, key) =>{
                      return (
                      <button key={key} className='groupSetting-userInfo' onClick={() => removeMembers( val )}>
                        <img alt="groupSetting-user" src="images/profile.jpg" id='userImage'/>
                        <div id='userName'>{ val }</div>
                      </button>)
                      })
                    }
                </div>
              </div>
            </Popup>  

            <Popup trigger = {button2} setTrigger= {setButton2}>
              <div className='groupSetting-selectingGenre'>
              <h2 id='title'>Add New Genre</h2>
                <ul className='groupSetting-genreList'>
                  {allgenre
                  .filter((val) =>{
                    if (!currentGroup.groupgenres.includes(val.name)){
                      return val
                    } else return null
                  }).map((val, key) =>{
                      return (
                      <li key={key} className='groupSetting-genreRow'>
                      <button onClick={() => addNewGenre( val.name )}
                      className="groupSetting-genreButton">{val.name}</button>
                      </li>)
                      })
                  }
                </ul>
              </div>
            </Popup>

            <Popup trigger = {button3} setTrigger= {setButton3}>
              <div className='groupSetting-selectingGenre'>
                <h2 id='title'>Remove Existing Genre</h2>
                <ul className='groupSetting-genreList'>
                  {currentGroup.groupgenres.map((val, key) =>{
                      return (
                      <li key={key} className='groupSetting-genreRow'>
                      <button onClick={() => removeGenre( val )}
                      className="groupSetting-genreButton">{ val }</button>
                      </li>)
                      })
                  }
                </ul>
              </div>
            </Popup>

        </div>
      </div>
    </div>) : (<Neverlogin />)
    );
}

export default Groupsetting