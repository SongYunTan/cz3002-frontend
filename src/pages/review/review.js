import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar';
import {reviewcontent} from './reviewcontent';
import './review.css'
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import Popup from '../../components/Popup';
import { StarRatingInput, css } from 'react-star-rating-input';
import insertCss from 'insert-css'
import { useGlobalState } from '../../state';

insertCss(css)

const Review = () => {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [star, setStar] = useState(0);
  const [review, setReview] = useState('');
  const [username] = sessionStorage.getItem("username"); 
  const [addReviewButton, setAddReviewButton] = useState(false);
  const [movieChosen, setMovieChosen] = useState('');

  function handleMovieChange(e) {
    setMovieName(e.target.value);
  }

  const handleSearchMovie = async (e) => {
    e.preventDefault()
    console.log(movieName)
    await axios.post(
      'http://127.0.0.1:5000/search_movie',
      {movie: movieName},
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
      setMovies(response.data);
    });
  };


  function handleAddReviewBtn(movieTitle) {
    setAddReviewButton(true);
    setMovieChosen(movieTitle);
  }

  function handleStarChange(value) {
    setStar(value);
  }

  function handleReviewChange(e) {
    setReview(e.target.value);
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    console.log(username, movieChosen, star, review)
    await axios.post(
      'http://127.0.0.1:5000/add_review',
      {username, title: movieChosen, star, review},
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
    });
  };

  return (
    <div className='review'>
      <Navbar />
      <div className="reviewpage">
        <div className='review-navbar'>
          <Link to='/' className="review-backbtn">
            <KeyboardBackspaceIcon className='review-backicon'/>
          </Link>
          <div className='review-header'>Add Review</div>        
        </div>
        <form>
          <div className="searchbox">
            <input type="movename" placeholder="Search Movies" id="input-box" value={movieName} onChange={handleMovieChange}/>
            <input type='submit' value='Search' id='submit-box' onClick={handleSearchMovie}/>
          </div>
        </form>
        <div className="movie-content">
          {movies.map((val, key) =>{
              return (
                <div className="movie">
                  <img className='matchesMoviePoster' alt='movie poster' src={val.url}></img>
                  <p>{val.title}</p>
                  <button className='addReviewBtn'
                    onClick={() => handleAddReviewBtn(val.title)}>
                    Add Review
                  </button>
                </div>)
            })
          }
        </div>
        <Popup trigger = {addReviewButton} setTrigger= {setAddReviewButton}>
          <div className = "popup-addReview">
            <h3 id='title'>Add Review:</h3>
            <form className="addReviewPage-form">
              <StarRatingInput
                size={5}
                value={star}
                onChange={handleStarChange} />

              <div id='userInput'>
                <textarea placeholder='Review' id = "inputs" type='text' value={review} onChange={handleReviewChange} ></textarea>
              </div>

              <br></br>
              <button type="submit" id="submitReviewButton" onClick={handleSubmitReview}>
                SUBMIT
              </button>
            </form>
          </div>
        </Popup>
      </div>
    </div>
    
  );
}

export default Review;