import React from 'react'
import GroupNavbar from '../../components/GroupNavbar';
import Navbar from '../../components/Navbar';
import './Matches.css';
import {Matcheslist} from './Matcheslist';

const Matches = () => {
  return (
    <div className='matches'>
      <Navbar />
      <div className='groupMatches'>
        <div className='groupNav-bar'><GroupNavbar /></div>
        <div className="groupMatches-content">
          {Matcheslist.map((val, key) =>{
              return (
                <div className="movie">
                  <img className='matchesMoviePoster' alt='movie poster' src={'images/' + val.image}></img>
                  <p>{val.title}</p>
                </div>
              )
            })
          }
        </div>
        </div>
    </div>
  )
}

export default Matches