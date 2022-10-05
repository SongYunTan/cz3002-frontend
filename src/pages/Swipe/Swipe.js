import React, {useEffect, useState} from 'react'
import GroupNavbar from '../../components/GroupNavbar';
import Navbar from '../../components/Navbar';
import {Reviewlist} from './Reviewlist';
import { Rating } from 'react-simple-star-rating';
import { useGlobalState } from '../../state';
import './Swipe.css';
import axios from 'axios';

const Swipe = () => {
  const [movie, setMovie] = useState([]);
  const [username] = useGlobalState("globalUsername"); 

  const getData = async () => {

    await axios.post(
      'http://127.0.0.1:5000/get_title',
      {username, groupName: "test"},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    ).catch((err) => {
      console.log(err.message);
    }).then((response)=> {
      console.log(JSON.stringify(response.data, null, 4));
      setMovie(response.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);


  const handleInterestClick = async (e) => {
    await axios.post(
      'http://127.0.0.1:5000/indicate_interest',
      {username, groupName: "test", title: movie.random_title, interest:e.target.value, movie_id:movie.movie_id},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    ).catch((err) => {
      console.log(err.message);
    }).then((response)=> {
      console.log(JSON.stringify(response.data, null, 4));
      getData();
    });
  };

  return (
    <div className='swipe'>
      <Navbar />
      <div className='groupSwipe'>
        <div className='groupNav-bar'><GroupNavbar /></div>
        <div className="groupSwipe-content">
          <img className='moviePoster' alt='movie poster' src={movie.image_url}></img>
          <div className='buttons'>
            <input className="noButton" type="button" value="no" onClick={handleInterestClick}/>
            <input className="yesButton" type="button" value="yes" onClick={handleInterestClick}/>
          </div>
          <a href="/" className='skipMovie'>Skip</a>
          <div className='reviewSection'>
            <span id='reviewPart'>REVIEWS</span>
            <ul className='reviews'>
            {Reviewlist.map((val, key) =>{
                  return (
                  <li key={key} className='reviewRow'>
                  <div className='userInfo'>
                  <img alt="profile" src={val.image} id='profileImg'/>
                  <div id='username'>{val.username}</div>
                  </div>
                  <div className= 'userReview'>
                  <Rating id='star' initialValue={val.star} allowHover={false} size={25}></Rating>
                  <div id='review'>{val.review}</div>
                  </div>
                  </li>)
                })
            }
            </ul>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Swipe