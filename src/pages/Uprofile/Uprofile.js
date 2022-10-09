import React, {useState,useRef,useEffect} from 'react'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Popup from '../../components/Popup';
import './Uprofile.css';


const Uprofile = () => {

    const[Username, setCName] = useState("default");
    const[button, setButton] = useState(false);
    const[UserName1, setGName] = useState("");
    const UsernameSubmit = event => {
        event.preventDefault();
    
        setTimeout(() => {
          setCName(UserName1)
          setButton(false)
        }, 2000)
      };
      const[Email, setEmail] = useState("default");
      const[button1, setButton1] = useState(false);
      const[Email1, setEmail1] = useState("");
      const EmailSubmit = event => {
          event.preventDefault();
      
          setTimeout(() => {
            setEmail(Email1)
            setButton1(false)
          }, 2000)
        };
        const[Birth, setBirth] = useState("default");
        const[button2, setButton2] = useState(false);
        const[Birth1, setBirth1] = useState("");
        const BirthSubmit = event => {
          event.preventDefault();
      
          setTimeout(() => {
            setBirth(Birth1)
            setButton2(false)
          }, 2000)
        };

    return (
        <div className='profile'>
        <Navbar />
        <div className='profile-container'>
        <div className='profile-navbar'>
        <Link to='/' className="profile-backbtn">
          <KeyboardBackspaceIcon className='profile-backicon'/>
          </Link>
          <div className='profile-header'>My Profile</div>
        </div>
       <div class='profile-content'>
        <div class="picture" >
        <img class='profilepic' alt='profile' src={'images/profile.png'}></img>
		   </div>
          <div class='info'>
           <div className='infocontent'>
            <div className='infoline' >
              <h2 className='infotitle'>Username:</h2>
              <h2 className='titlecontent'>{Username}</h2>
              <button class="info-editbtn"
                onClick={() => setButton(true)}>
                <EditIcon className='editgnicon'/>
              </button>
            </div>
            <Popup trigger = {button} setTrigger= {setButton} >
              <div className = "popupwindow">
                <h3 className='popuptitle'>Enter Username:</h3>
                <form onSubmit={UsernameSubmit}>
                  <input value={UserName1} placeholder="UserName" onChange={e => setGName(e.target.value)} type="text" className="inputbox"></input>
                  <button value="Submit" className="submitButton">
                    <CheckCircleIcon className='submit'/>
                  </button>
                </form>
              </div>
            </Popup>
          </div>
          <div className='infocontent'>
            <div className='infoline' >
              <h2 className='infotitle'>Email:</h2>
              <h2 className='titlecontent'>{Email}</h2>
              <button class="info-editbtn"
                onClick={() => setButton1(true)}>
                <EditIcon className='editgnicon'/>
              </button>
            </div>
            <Popup trigger = {button1} setTrigger= {setButton1}>
              <div className = "popupwindow">
                <h3 className='popuptitle'>Enter Email:</h3>
                <form onSubmit={EmailSubmit}>
                  <input value={Email1} placeholder="Email" onChange={e => setEmail1(e.target.value)} type="text" className="inputbox"></input>
                  <button value="Submit" className="submitButton">
                    <CheckCircleIcon className='submit'/>
                  </button>
                </form>
              </div>
            </Popup>
          </div>
          <div className='infocontent'>
            <div className='infoline' >
              <h2 className='infotitle'>Date of Birth:</h2>
              <h2 className='titlecontent'>{Birth}</h2>
              <button class="info-editbtn"
                onClick={() => setButton2(true)}>
                <EditIcon className='editgnicon'/>
              </button>
            </div>
            <Popup trigger = {button2} setTrigger= {setButton2}>
              <div className = "popupwinbdow">
                <h3 className='popuptitle'>Enter Birthday:</h3>
                <form onSubmit={BirthSubmit}>
                  <input value={Birth1} placeholder="dd/mm/yyyy" onChange={e => setBirth1(e.target.value)} type="text" className="inputbox"></input>
                  <button value="Submit" className="submitButton">
                    <CheckCircleIcon className='submit'/>
                  </button>
                </form>
              </div>
            </Popup>
          </div>
          </div>
          </div>
          </div>
     </div>
      
    )
  }
  export default Uprofile