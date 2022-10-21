import React, {useEffect, useState} from 'react'

import axios from 'axios'; 
import GroupNavbar from '../../components/GroupNavbar';
import Navbar from '../../components/Navbar';
import Neverlogin from '../Neverlogin/Neverlogin';
import './Matches.css';

const Matches = () => {

  const [currentUser, setCurrentUser] = useState(
  {
  "username":"",
  "email":"",
  "groups":[],
  });

  const [matchedMovies, setMatchedMovies] = useState([]);

  /* =========================API Calls================================ */
  
  useEffect(() => {
    let userid = sessionStorage.getItem("id");
    let groupname = sessionStorage.getItem("groupname");

    const getData = async () => {

      try{
        const response1 = await axios.get( 'http://127.0.0.1:5000/match_movie',
        {
        params: { groupName: groupname },
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

        axios.all([response1, response2])
        .then(axios.spread((...responses) => {

          const responseOne = responses[0].data;
          const responseTwo = responses[1].data;
          console.log(JSON.stringify(responseOne, null, 4));
          console.log(JSON.stringify(responseTwo, null, 4));
          setMatchedMovies(responseOne);
          setCurrentUser(responseTwo);
        }))
      } catch (err) {
        console.log(err.message);
      };
    };
    getData();
  }, []);

  /* ============================================================================= */
  
  let c = <Navbar />
  const p = React.cloneElement(c, 
  { username: currentUser.username, email: currentUser.email, groups: currentUser.groups });
  
  return (
    sessionStorage.getItem("id") !== null ?
    (<div className='matches'>
      { p }
      <div className='groupMatches'>
        <div className='groupNav-bar'><GroupNavbar /></div>
        <div className="groupMatches-content">
          {matchedMovies.map((val, key) =>{
              return (
                <div data-testid="matchedmovieitem" key={key} className="movie">
                  <img className='matchesMoviePoster' alt='movie poster' src={val.url}></img>
                  <p>{val.title}</p>
                </div>
              )
            })
          }
        </div>
        </div>
    </div>) : (<Neverlogin />)
  );
}

export default Matches