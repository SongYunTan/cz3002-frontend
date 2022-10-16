import React, {useState,useRef,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import axios from 'axios';
import Popup from '../../components/Popup';
import Navbar from '../../components/Navbar';
import Neverlogin from '../Neverlogin/Neverlogin';
import './Create.css';

const Create = () => {

  /* =========================Horizontal Sliding================================ */
  const ref = useRef(null);

  useEffect(() => {
    const slider = document.querySelector('.createGroup-memberImage');
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

  /* =========================API Calls================================ */
  const [currentUser, setCurrentUser] = useState(
  {
  "username":"",
  "email":"",
  "groups":[],
  });

  const [allUsers, setAllUsers] = useState([]);

  const [allgenre, setAllgenre] = useState([
    {"name" : ""}
  ]);

  useEffect(() => {
    let userid = sessionStorage.getItem("id");

    const createGroup = async () =>{

      try {
        const response1 = await axios.get('http://127.0.0.1:5000/profile',
        {
        params: { id: userid },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        });
  
        const response2 = await axios.get('http://127.0.0.1:5000/get_users',
        {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        });
  
        const response3 = await axios.get('http://127.0.0.1:5000/get_genres',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
  
        axios.all([response1, response2, response3])
        .then(axios.spread((...responses) => {
  
          const responseOne = responses[0].data;
          const responseTwo = responses[1].data;
          const responseThree = responses[2].data;
  
          setCurrentUser(responseOne);
          setAllUsers(responseTwo);
          setAllgenre(responseThree);
        }))
      } catch (err) {
        console.log(err.message);
      }
    };
    createGroup();
  }, []);

  /* =========================Get Genre================================ */
  const [genreState, changeState] = useState([]);

  useEffect(() => {
    const res = async () => {
      const result = [...allgenre.map((e) => {
        e.toggled = false
        e.updated = false
        return e;
      })];
      console.log(result);
      changeState(result);
    };
    res();
  }, [allgenre]);

  const toggleGenreActive = (index) => {
    let array = [...genreState];
    array[index].toggled? array[index].toggled = false: array[index].toggled = true;
    changeState(array);
  }

  const toggleGenreSelectedActive = (index) => {
    let array = [...genreState];
    array[index].updated? array[index].updated = false: array[index].updated = true;
    changeState(array);
  }

  const toggleGenreSelected = (index) => {

    return genreState[index].updated ? 
      "genreSelected-active" : "genreSelected-inactive";
  }

  const toggleGenreCancel = (index) => {

    return genreState[index].updated ? 
    "genreSelected-cancel-active" : "genreSelected-cancel-inactive";
  }

  const toggleGenreButton = (index) => {

    return genreState[index].toggled ? 
    "createGroup-genreSelectName genreSelect-active" : "createGroup-genreSelectName genreSelect-inactive";
  }

  const applyGenreUpdate = () => {

    setButton1(true)
    const newState = genreState.map(obj => {
      return obj.updated ? {...obj, toggled: true} : {...obj, toggled: false};
    });
    changeState(newState);
  };

  const applyGenre = () => {
    const newState = genreState.map(obj => {
      return obj.toggled ? {...obj, updated: true} : {...obj, updated: false};
    });

    setTimeout(() => {
      setButton1(false)
      changeState(newState);
    }, 2000)
  };
  /* ================================================================ */

  /* =========================Pop Up buttons================================ */
  const[button, setButton] = useState(false);
  const[button1, setButton1] = useState(false);
  const[button2, setButton2] = useState(false);
  /* ================================================================ */

  /* =========================Group UserName================================ */
  const[GroupName, setGName] = useState("");
  const[CurrentName, setCName] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    setTimeout(() => {
      setCName(GroupName)
      setButton(false)
    }, 2000)
  }
  /* ================================================================ */

  /* =========================Group Members================================ */
  const[memberarray, setMemberArray] = useState([]);
  const[searchUsername, setUsername] = useState("");

  const checkItemExist = (arr,username) => {
    let find = arr.find(
      (object) => object.username === username
    );

    return find? false : true;
  }

  const addedMember = (userName) => {
    const item = allUsers.find(
      (item) => item.username === userName
    );
    
    if(checkItemExist(memberarray, item.username)){
      setMemberArray(prev => prev.concat(item))
    }
    setUsername("");
    setButton2(false);
  }
  /* ================================================================ */

  /* =========================Create Group================================ */
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/Home'; 
    navigate(path);
  }

  const creatingGroup = async (owner, groupname, genres, members) => {
    try {
      await axios.post( 'http://127.0.0.1:5000/new_group',
      {"Username of owner": owner,
      "groupName": groupname,
      "genre": genres,
      "members": members
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        routeChange();
      });
    } catch(err) {
      console.log(err.message);
    }
  };
  /* ========================================================================= */
  
  let c = <Navbar />
  const p = React.cloneElement(c, 
  { username: currentUser.username, email: currentUser.email, groups: currentUser.groups });
    
  return (
    sessionStorage.getItem("id") !== null ?
      (<div className="createGroupPage">
      { p }
      <div className='createGroup-Container'>
        <div className='createGroup-navbar'>
          <Link to='/Home' id="backbtn">
          <KeyboardBackspaceIcon id='backicon'/>
          </Link>
          <div id='header'>Create New Group</div>
        </div>
        <div className='createGroup-details'>
          <div className='createGroup-groupname'>
            <Link to='/' id="backbtn-mobile">
            <KeyboardBackspaceIcon id='backicon-mobile'/>
            </Link>
            <div className='createGroup-groupname-heading' >
              <h2 id='title'>Group Name:</h2>
              <h2 id='newGroupName'>{CurrentName}</h2>
              <button className='createEditBtn'
                onClick={() => setButton(true)}>
                <EditIcon id='editicon'/>
              </button>
            </div>
            <Popup trigger = {button} setTrigger= {setButton}>
              <div className = "popup-enterNewName">
                <h3 id='title'>Enter Group Name:</h3>
                <form onSubmit={handleSubmit}>
                  <input id="input" value={GroupName} placeholder="Group Name" onChange={e => setGName(e.target.value)} type="text"></input>
                  <button value="Submit" className='submitButton'>
                    <CheckCircleIcon id='circleIcon'/>
                  </button>
                </form>
              </div>
            </Popup>
          </div>

          <div className='createGroup-members'>
            <h2 id='header'>Members:</h2>
            <div className='createGroup-memberList'>
              <div ref={ref} className='createGroup-memberImage'>
                {memberarray.map((val, key) =>{
                  return (
                  <button key={key} className='createGroup-memberInfo'>
                  <img alt="member Profile" src="images/profile.jpg" id='memberImage'/>
                  <div id='userName'>{val.username}</div>
                  </button>)
                  })
                }
              </div>
              <button className='createGroup-addMember' onClick={() => setButton2(true)}>
                <AddCircleIcon id='addMember-btn'/>
              </button>
            </div>
            <Popup trigger = {button2} setTrigger= {setButton2}>
              <div className='popup-AddMember'>
                <input placeholder="Search Username" type="text" 
                className="createGroup-searchAllUser" onChange={e => {setUsername(e.target.value)}}></input>
                <div className='createGroup-allUserList'>
                    {allUsers.filter((val) =>{
                      if (searchUsername === "" && val.username !== currentUser.username){
                        return val
                      } else if (val.username !== currentUser.username && val.username.toLowerCase().includes(searchUsername.toLowerCase())){
                        return val
                      } else return null
                    }).map((val, key) =>{
                      return (
                      <button key={key} className='createGroup-userInfo' onClick={() => addedMember(val.username)}>
                      <img alt="createGroup-user" src="images/profile.jpg" id='userImage'/>
                      <div id='userName'>{val.username}</div>
                      </button>)
                      })
                    }
                </div>
              </div>
            </Popup>
          </div>

          <div className='createGroup-genreInput'>
            <h2 id='title'>Genre:</h2>
            <button className="createGroup-genreEditBtn"
              onClick={applyGenreUpdate}>
              <EditIcon id='editicon'/>
            </button>
            <Popup trigger = {button1} setTrigger= {setButton1}>
              <div className='createGroup-selectingGenre'>
                <button id='addGenre' onClick={applyGenre}>Apply Changes</button>
                <ul className='createGroup-genreList'>
                  {genreState.map((val, key) =>{
                      return (
                      <li key={key} className='createGroup-genreRow'>
                      <button
                      className={toggleGenreButton(key)} 
                      onClick={() => toggleGenreActive(key)}>{val.name}</button>
                      </li>)
                      })
                  }
                </ul>
              </div>
            </Popup>
          </div>

          <div className='createGroup-selectedGenre'>
            {genreState.map((val, key) =>{
              return (
                <div key={key} className='createGroup-genreSelected-row'>
                <button
                className ={toggleGenreSelected(key)}>{val.name}</button>
                <button className={toggleGenreCancel(key)} onClick={() => toggleGenreSelectedActive(key)}>
                  <CancelIcon className='genreSelected-cancelActive'/>
                </button>
                </div>)
                })
            }
          </div>

          <div className='createGroup-buttons'>
            <button id="cancelbtn" onClick={ routeChange }>Cancel</button>
            <button id="createbtn" onClick={ () => 
              creatingGroup(
              currentUser.username,
              GroupName,
              [...genreState.filter((val) => val.updated === true).map((e) => {return e.name})],
              [...memberarray.map((val) => {return val.username})])
            }>Create Group</button>
          </div>
        </div>
      </div>
    </div>) : (<Neverlogin />)
    );
}

export default Create
