import React from 'react'
import GroupNavbar from '../../components/GroupNavbar';
import Navbar from '../../components/Navbar';
import {Reviewlist} from './Reviewlist';
import { Rating } from 'react-simple-star-rating'
import './Swipe.css';

const Swipe = () => {
  return (
    <div className='swipe'>
      <Navbar />
      <div className='groupSwipe'>
        <div className='groupNav-bar'><GroupNavbar /></div>
        <div className="groupSwipe-content">
          <img className='moviePoster' alt='movie poster' src='images/movie.jpg'></img>
          <div className='buttons'>
            <input className="noButton" type="button" value="Nope"/>
            <input className="yesButton" type="button" value="Yesss!!"/>
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