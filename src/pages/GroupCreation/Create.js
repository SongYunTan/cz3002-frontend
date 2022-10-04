import React, {useState,useRef,useEffect} from 'react'
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Create.css';
import Popup from '../../components/Popup';
import Navbar from '../../components/Navbar';
import {listOfGenre} from './listOfGenre';
import {AddedMember} from './AddedMember';

const Create = () => {

  const ref = useRef(null);

  useEffect(() => {
    const slider = document.querySelector('.createGroup-memberImage-list');
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

  const Objects = [...listOfGenre];
  const [genreState, changeState] = useState({
    Objects
  })

  const[memberarray, setMemberArray] = useState([]);
  const[button, setButton] = useState(false);
  const[button1, setButton1] = useState(false);
  const[button2, setButton2] = useState(false);
  const[searchUsername, setUsername] = useState("");
  const[GroupName, setGName] = useState("");
  const[CurrentName, setCName] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    setTimeout(() => {
      setCName(GroupName)
      setButton(false)
    }, 2000)
  }

  const checkItemExist = (arr,username) => {
    let find = arr.find(
      (object) => object.username === username
    );

    if(find){
      return false;
    }
    else{
      return true;
    }
  }

  const addedMember = (userName) => {
    const item = AddedMember.find(
      (item) => item.username === userName
    );
    
    if(checkItemExist(memberarray, item.username)){
      setMemberArray(prev => prev.concat(item))
    }
    setUsername("");
    setButton2(false);
  }

  const toggleGenreActive = (index) => {
    let array = [...genreState.Objects];
    array[index].toggled? array[index].toggled = false: array[index].toggled = true;
    changeState({...genreState, Objects: array});
  }

  const toggleGenreSelectedActive = (index) => {
    let array = [...genreState.Objects];
    array[index].updated? array[index].updated = false: array[index].updated = true;
    changeState({...genreState, Objects: array});
  }

  const toggleGenreSelected = (index) => {

    return genreState.Objects[index].updated ? 
      "genreSelected-active" : "genreSelected-inactive";
  }

  const toggleGenreCancel = (index) => {

    return genreState.Objects[index].updated ? 
    "genreSelected-cancel-active" : "genreSelected-cancel-inactive";
  }

  const toggleGenreButton = (index) => {

    return genreState.Objects[index].toggled ? 
    "createGroup-genreSelectName genreSelect-active" : "createGroup-genreSelectName genreSelect-inactive";
  }

  const applyGenreUpdate = () => {

    setButton1(true)
    const newState = genreState.Objects.map(obj => {
      return obj.updated ? {...obj, toggled: true} : {...obj, toggled: false};
    });

    changeState({...genreState, Objects: newState});
  };

  const applyGenre = () => {
    const newState = genreState.Objects.map(obj => {

      return obj.toggled ? {...obj, updated: true} : {...obj, updated: false};
    });

    setTimeout(() => {
      setButton1(false)
      changeState({...genreState, Objects: newState});
    }, 2000)
  };

  return (
    <div className="createGroup-page">
      <Navbar />
      <div className='createGroup-container'>
        <div className='createGroup-navbar'>
          <Link to='/' className="createGroup-backbtn">
          <KeyboardBackspaceIcon className='createGroup-backicon'/>
          </Link>
          <div className='createGroup-header'>Create New Group</div>
        </div>
        <div className='createGroup-details'>
          <div className='createGroup-groupname'>
            <Link to='/' className="createGroup-backbtn-mobile">
            <KeyboardBackspaceIcon className='createGroup-backicon-mobile'/>
            </Link>
            <div className='createGroup-groupname-heading' >
              <h2 className='createGroup-grouptitle'>Group Name:</h2>
              <h2 className='createGroup-typedName'>{CurrentName}</h2>
              <button class="createGroup-editbtn"
                onClick={() => setButton(true)}>
                <EditIcon className='editgnicon'/>
              </button>
            </div>
            <Popup trigger = {button} setTrigger= {setButton}>
              <div className = "popup-enterGname">
                <h3 className='groupName-title'>Enter Group Name:</h3>
                <form onSubmit={handleSubmit}>
                  <input value={GroupName} placeholder="Group Name" onChange={e => setGName(e.target.value)} type="text" className="groupname_inputbox"></input>
                  <button value="Submit" className="groupName-submitButton">
                    <CheckCircleIcon className='groupName-submit'/>
                  </button>
                </form>
              </div>
            </Popup>
          </div>

          <div className='createGroup-member-title'>
            <h2 className='createGroup-member-titleheader'>Members:</h2>
            <div className='createGroup-member-list'>
              <div ref={ref} className='createGroup-memberImage-list'>
                {memberarray.map((val, key) =>{
                  return (
                  <button key={key} className='createGroup-memberInfo'>
                  <img alt="createGroup-memberprofile" src={val.image} id='createGroup-memberImg'/>
                  <div id='createGroup-memberusername'>{val.username}</div>
                  </button>)
                  })
                }
              </div>
              <button className='createGroup-member-addMember' onClick={() => setButton2(true)}>
                <AddCircleIcon className='createGroup-addMember-btn'/>
              </button>
            </div>
            <Popup trigger = {button2} setTrigger= {setButton2}>
              <div ClassName='popup-AddMember'>
                <input placeholder="Search Username" type="text" 
                className="createGroup-searchAllUser" onChange={e => {setUsername(e.target.value)}}></input>
                <div className='createGroup-alluser-list'>
                    {AddedMember.filter((val) =>{
                      if (searchUsername === ""){
                        return val
                      } else if (val.username.toLowerCase().includes(searchUsername.toLowerCase())){
                        return val
                      } else return null
                    }).map((val, key) =>{
                      return (
                      <button key={key} className='createGroup-userInfo' onClick={() => addedMember(val.username)}>
                      <img alt="createGroup-user" src={val.image} id='createGroup-userImg'/>
                      <div id='createGroup-username'>{val.username}</div>
                      </button>)
                      })
                    }
                </div>
              </div>
            </Popup>
          </div>

          <div className='createGroup-genre-input'>
            <h2 className='createGroup-genre-title'>Genre:</h2>
            <button class="createGroup-genre-editbtn"
              onClick={applyGenreUpdate}>
              <EditIcon className='editgenreicon'/>
            </button>
            <Popup trigger = {button1} setTrigger= {setButton1}>
              <div className='createGroup-genre-selectingGenre'>
                <button className='createGroup-addGenre' onClick={applyGenre}>Apply Changes</button>
                <ul className='createGroup-genre-list'>
                  {genreState.Objects.map((val, key) =>{
                      return (
                      <li className='createGroup-genre-row'>
                      <button key={key} 
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
            {genreState.Objects.map((val, key) =>{
              return (
                <div className='createGroup-genreSelected-row'>
                <button key={key} 
                className ={toggleGenreSelected(key)}>{val.name}</button>
                <button className={toggleGenreCancel(key)} onClick={() => toggleGenreSelectedActive(key)}>
                  <CancelIcon className='genreSelected-cancelActive'/>
                </button>
                </div>)
                })
            }
          </div>

          <div className='createGroup-buttons'>
            <button class="createGroup-cancelbtn">Cancel</button>
            <button class="createGroup-createbtn">Create Group</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Create