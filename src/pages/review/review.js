import React, {useState, useEffect, useRef} from 'react'
import Navbar from '../../components/Navbar';
import './Review.css'
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import Popup from '../../components/Popup';
import { Rating } from 'react-simple-star-rating'

const Review = () => {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [star, setStar] = useState(0);
  const [review, setReview] = useState('');
  const [addReviewButton, setAddReviewButton] = useState(false);
  const [movieChosen, setMovieChosen] = useState('');

  /* =========================Horizontal Sliding================================ */
  const ref = useRef(null);

  useEffect(() => {
    const slider = document.querySelector('.reviewPage-movieContent');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    if (sessionStorage.getItem("id") !== null){
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
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
        console.log(walk);
      });
    }
  })
  /* ============================================================================= */


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

  function handleMovieChange(e) {
    setMovieName(e.target.value);
  }

  const handleSearchMovie = async (e) => {
    e.preventDefault()
    console.log(movieName)
    try {
      await axios.post(
        'http://127.0.0.1:5000/search_movie',
        {movie: movieName},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
        setMovies(response.data);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  function handleAddReviewBtn(movieTitle) {
    setAddReviewButton(true);
    setMovieChosen(movieTitle);
  }

  function handleStarChange(value) {
    setStar(value / 20);
  }

  function handleReviewChange(e) {
    setReview(e.target.value);
  }

  const handleSubmitReview = async (e) => {
    let username = sessionStorage.getItem("username");
    e.preventDefault()
    console.log(username, movieChosen, star, review)
    try{
      await axios.post(
        'http://127.0.0.1:5000/add_review',
        {username, title: movieChosen, star, review},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      ).then((response)=> {
        console.log(JSON.stringify(response.data, null, 4));
      });
    } catch (err) {
      console.log(err.message);
    }
    setAddReviewButton(false);
    setReview('');
    setStar(0);
  };

  let c = <Navbar />
  const p = React.cloneElement(c, 
  { username: currentUser.username, email: currentUser.email, groups: currentUser.groups });

  return (
    <div className='reviewPage'>
      { p }
      <div className="reviewPage-container">
        <div className='reviewPage-navbar'>
          <Link to='/Home' className="review-backbtn">
            <KeyboardBackspaceIcon id='backicon'/>
          </Link>
          <div id='header'>Add Review</div>        
        </div>
        <form className="reviewPage-searchbox">
            <input type="movename" placeholder="Search Movies" id="input-box" data-testid="search-bar" value={movieName} onChange={handleMovieChange}/>
            <input type='submit' value='Search' id='submit-box' data-testid="search-movies-btn" onClick={handleSearchMovie}/>
        </form>
        <div ref={ref} className="reviewPage-movieContent">
          {movies.map((val, key) =>{
              return (
                <div key={key} className="movieItem" data-testid="movieItem">
                  <img className='matchesMoviePoster' alt='movie poster' src={val.url}></img>
                  <p id="title">{val.title}</p>
                  <button className='addReviewBtn' data-testid="addReviewBtn"
                    onClick={() => handleAddReviewBtn(val.title)}>
                    Add Review
                  </button>
                </div>)
            })
          }
        </div>
        <Popup trigger = {addReviewButton} setTrigger= {setAddReviewButton} data-testid="review-popup">
          <div className = "popup-addNewReview">
            <h3 id='title'>Add Review:</h3>
            <form className="addReviewPage-form">
              <div id='userInput'>
                <textarea placeholder='Review' id = "inputs" type='text' value={review} onChange={handleReviewChange} ></textarea>
              </div>
              <div id='inputstar'>
              <Rating size={40} onClick={handleStarChange} data-testid="star-rating"></Rating>
              </div>
              <button type="submit" id="submitReviewButton" data-testid="submitReviewButton" onClick={handleSubmitReview}>
                SUBMIT
              </button>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default Review;