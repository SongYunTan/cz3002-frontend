import React from 'react'
import Navbar from '../../components/Navbar';
import {reviewcontent} from './reviewcontent';
import './review.css'
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const review = () => {
    return (
        <div className='review'>
        <Navbar />
        <div class="reviewpage">
        <div className='review-navbar'>
        <Link to='/' className="review-backbtn">
          <KeyboardBackspaceIcon className='review-backicon'/>
          </Link>
          <div className='review-header'>Add Review</div>        
        </div>
        <form>
			  <div class="searchbox">
				<input type="movename" placeholder="Search Movies Here" id="input-box"/>
        <input type='submit' value='Search' id='submit-box'/>
		  	</div>
        </form>
        <div className='matchgroup'>
            <div><p id='title'>My movie reviews:</p></div>
            {reviewcontent.map((val, key) =>{
                return (
                  <div className="movies">
                    <img className='moviesicon' alt='group pic' src={'images/' + val.image}></img>
                    <p className='reviewcontent'>{val.name}</p>
                    <p className='reviewcontent'>{val.review}</p>
                  </div>
                )
              })
            } 
        </div>
        </div>
     </div>
      
    )
  }

  export default review