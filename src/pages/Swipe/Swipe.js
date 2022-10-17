import React, {useState, useEffect} from 'react'
import { Rating } from 'react-simple-star-rating'

import axios from 'axios';
import Neverlogin from '../Neverlogin/Neverlogin';
import GroupNavbar from '../../components/GroupNavbar';
import Navbar from '../../components/Navbar';
import {Reviewlist} from './Reviewlist';
import './Swipe.css';

const Swipe = () => {

  /*=============================get User Info===================================== */  
  const [currentUser, setCurrentUser] = useState(
  {"username":"",
    "email":"",
    "groups":[]
  });

  useEffect(() => {
    let userid = sessionStorage.getItem("id");
    let groupname = sessionStorage.getItem("groupname");

    const getData = async () => {

      try{
        const response1 = await axios.get( 'http://127.0.0.1:5000/profile',
        {
        params: { id: userid },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        });

        const response2 = await axios.get( 'http://127.0.0.1:5000/get_title',
        {
        params:  {id: userid, groupName: groupname},
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        });

        axios.all([response1, response2])
        .then(axios.spread((...responses) => {

          const responseOne = responses[0].data;
          const responseTwo = responses[1].data;

          setCurrentUser(responseOne);
          setMovie(responseTwo);
        }))
      } catch (err) {
        console.log(err.message);
      };
    };
    getData();
  }, []);

  /*============================================================================= */

  /*=============================Indicating Interest===================================== */  
  const [movie, setMovie] = useState([{
    "title" :"",
    "movie_id": "",
    "url" : ""
  }]);
  
  const handleInterestClick = async (e) => {
    let groupname = sessionStorage.getItem("groupname");

    try{
      await axios.post(
        'http://127.0.0.1:5000/indicate_interest',
        {username: currentUser.username, groupName: groupname, title: movie.random_title, interest: e.target.value, movie_id: movie.movie_id },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        getNextMovie();
      })
    }
    catch(err) {
      console.log(err.message);
    };
  };
  
  const getNextMovie = async () => {
    let userid = sessionStorage.getItem("id");
    let groupname = sessionStorage.getItem("groupname");
    try{
      await axios.get( 'http://127.0.0.1:5000/get_title',
        {
        params:  {id: userid, groupName: groupname},
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          },
        }).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        setMovie(response);
      })
    }
    catch(err) {
      console.log(err.message);
    };
  }
  
  /*============================================================================= */
  
  let c = <Navbar />
  const p = React.cloneElement(c, 
  { username: currentUser.username, email: currentUser.email, groups: currentUser.groups });

  return (
    sessionStorage.getItem("id") !== null ?
      (<div className='Swipe'>
      { p }
      <div className='Swipe-Container'>
        <div className='Swipe-groupNavbar'><GroupNavbar /></div>
        <div className="SwipeContent">
          <img id='moviePoster' alt='movie poster' src={movie.image_url}></img>
          <div className='buttons'>
            <input id="no" type="button" value="no" onClick={handleInterestClick}/>
            <input id="yes" type="button" value="yes" onClick={handleInterestClick}/>
          </div>
          <a href="/" id='skip'>Skip</a>
          <div className='reviewSection'>
            <span id='reviewPart'>REVIEWS</span>
            <ul className='reviews'>
            {movie.review.map((val, key) =>{
                  return (
                  <li key={key} className='reviewRow'>
                  <div className='userInfo'>
                  <img id='profile' alt="profile" src={ 'images/profile.jpg' }/>
                  <div id='username'>{val[0]}</div>
                  </div>
                  <div className= 'userReview'>
                  <Rating id='star' initialValue={val[2]} allowHover={false} size={25}></Rating>
                  <div id='review'>{val[1]}</div>
                  </div>
                  </li>)
                })
            }
            </ul>
          </div>
        </div>
        </div>
    </div>) : (<Neverlogin />)
    );
}

export default Swipe
