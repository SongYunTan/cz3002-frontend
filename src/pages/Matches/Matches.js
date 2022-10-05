import React from 'react'
import GroupNavbar from '../../components/GroupNavbar';
import Navbar from '../../components/Navbar';
import './Matches.css';
import {Matcheslist} from './Matcheslist';

const Matches = () => {
  const [matchedMovies, setMatchedMovies] = useState([]);

  const getData = async () => {

    await axios.post(
      'http://127.0.0.1:5000/match_movie',
      {groupName: "test"},
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
      setMatchedMovies(response.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='matches'>
      <Navbar />
      <div className='groupMatches'>
        <div className='groupNav-bar'><GroupNavbar /></div>
        <div className="groupMatches-content">
          {matchedMovies.map((val, key) =>{
              return (
                <div className="movie">
                  <img className='matchesMoviePoster' alt='movie poster' src={val.url}></img>
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