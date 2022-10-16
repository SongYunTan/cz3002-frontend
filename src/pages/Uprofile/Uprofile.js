import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';


import axios from 'axios';
import Popup from '../../components/Popup';
import './Uprofile.css';
import Neverlogin from '../Neverlogin/Neverlogin';

const Uprofile = () => {
  /*======================Change Username============================================ */  
  const[Username, setUserName] = useState("");
  const[button, setButton] = useState(false);

  const UsernameSubmit = async (e) => {  
    e.preventDefault();
    let userid = sessionStorage.getItem("id");

    try {
      await axios.post(
        'http://127.0.0.1:5000/changeUserName',
        { id: userid, new_username: Username },
      {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
      },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        window.location.reload(false)
      });
    } catch(err) {
      console.log(err.message);
    } 
  };
  /*================================================================== */
    
  /*======================Change Email============================================ */    
    const[Email, setEmail] = useState("");
    const[button1, setButton1] = useState(false);
    const EmailSubmit = async (e) => {
        e.preventDefault();
        let userid = sessionStorage.getItem("id");

        try {
          await axios.post(
            'http://127.0.0.1:5000/changeEmail',
            { id: userid, new_email: Email },
          {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            },
          },
          ).then((response)=> {
            console.log(JSON.stringify(response.data, null, 4));
            window.location.reload(false)
          });
        } catch(err) {
          console.log(err.message);
        } 
    };
  /*================================================================== */  
  
  /*======================Change Password============================================ */  
    const[Password, setPassword] = useState("*********");
    const[button2, setButton2] = useState(false);
    const PasswordSubmit = async (e) => {
      e.preventDefault();
      let userid = sessionStorage.getItem("id");

      try {
        await axios.post(
          'http://127.0.0.1:5000/changePassword',
          { id: userid, new_password: Password },
        {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        },
        ).then((response)=> {
          console.log(JSON.stringify(response.data, null, 4));
          window.location.reload(false)
        });
      } catch(err) {
        console.log(err.message);
      } 
  };
  /*================================================================== */  

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
      sessionStorage.getItem("id") !== null? 
        (<div className='profilePage'>
          { p }
          <div className='profilePage-container'>
            <div className='profilePage-navbar'>
              <div className='profilePage-navbarContent'>
              <Link to='/Home' id="backbtn">
              <KeyboardBackspaceIcon id='backicon'/>
              </Link>
              <div id='header'>My Profile Page</div>
              </div>
              <div className='profilePage-navbarLogout'>
              <div id='header'>Logout</div>
              <Link data-testid="profilelogout-web" to='/' id="logoutbtn" onClick={() => {
                sessionStorage.removeItem("groupname");
                sessionStorage.removeItem("id");
              }}>
              <LogoutIcon id='logouticon'/>
              </Link>
              </div>
            </div>
            <div className='profilePage-content'>
              <div className='profilePage-picture'>
                <img id='profilepic' alt='profile' src={'images/profile.jpg'}></img>
              </div>
              <div className='profilePage-userInfo'>
                  <div className='profilePage-userInfoContent'>
                    <h2 id='infotitle'>Username:</h2>
                    <h2 data-testid="profileuser-web" id='titlecontent'>{currentUser.username}</h2>
                    <button data-testid="edit-username" className="profilePage-editButton"
                      onClick={() => setButton(true)}>
                      <EditIcon id='editicon'/>
                    </button>
                  </div>
                  <div className='profilePage-userInfoContent'>
                    <h2 id='infotitle'>Email:</h2>
                    <h2 data-testid="profileemail-web" id='titlecontent'>{currentUser.email}</h2>
                    <button data-testid="edit-email" className="profilePage-editButton"
                      onClick={() => setButton1(true)}>
                      <EditIcon id='editicon'/>
                    </button>
                  </div>
                  <div className='profilePage-userInfoContent'>
                    <h2 id='infotitle'>Password:</h2>
                    <h2 data-testid="profilepassword-web" id='titlecontent'>{Password}</h2>
                    <button data-testid="edit-password" className="profilePage-editButton"
                      onClick={() => setButton2(true)}>
                      <EditIcon id='editicon'/>
                    </button>
                  </div>
              </div>
              <Popup trigger = {button} setTrigger= {setButton} >
                <div className = "popupwindow">
                  <h3 id='title'>Enter New Username:</h3>
                  <form onSubmit={UsernameSubmit}>
                    <input value={ Username } placeholder="New Username" onChange={e => setUserName(e.target.value)} type="text" id="inputbox"></input>
                    <button value="Submit" className="profilePage-submitButton">
                      <CheckCircleIcon id='circleIcon'/>
                    </button>
                  </form>
                </div>
              </Popup>
              <Popup trigger = {button1} setTrigger= {setButton1} >
                <div className = "popupwindow">
                  <h3 id='title'>Enter New Email:</h3>
                  <form onSubmit={EmailSubmit}>
                  <input value={Email} placeholder="Email" onChange={e => setEmail(e.target.value)} type="text" id="inputbox"></input>
                    <button value="Submit" className="profilePage-submitButton">
                      <CheckCircleIcon id='circleIcon'/>
                    </button>
                  </form>
                </div>
              </Popup>
              <Popup trigger = {button2} setTrigger= {setButton2} >
                <div className = "popupwindow">
                  <h3 id='title'>Enter New Password:</h3>
                  <form onSubmit={PasswordSubmit}>
                    <input placeholder="Password" onChange={e => setPassword(e.target.value)} type="text" id="inputbox"></input>
                    <button value="Submit" className="profilePage-submitButton">
                      <CheckCircleIcon id='circleIcon'/>
                    </button>
                  </form>
                </div>
              </Popup>
            </div>
          </div>
        </div>) : (<Neverlogin />)
    );
  }
  export default Uprofile