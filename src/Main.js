import React from 'react';
import  {Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Swipe from './pages/Swipe/Swipe';
import Matches from './pages/Matches/Matches';
import Create  from './pages/GroupCreation/Create';
import Groupsetting from './pages/GroupSetting/Groupsetting';
import Uprofile  from './pages/Uprofile/Uprofile';
import Homepage from './pages/Home/Home';
import Review from './pages/Review/Review';


import { Home } from '@mui/icons-material';

const Main = () => {
  return (
    <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/SignUp" element={ <SignUp/> } />
        <Route path="/Swipe" element={ <Swipe/> } />
        <Route path="/Matches" element={ <Matches/> } />
        <Route path="/Groupsetting" element={ <Groupsetting/> } />
        <Route path="/Create" element={ <Create/> } />
        <Route path="/profile" element={ <Uprofile/> } />
        <Route path="/home" element={ <Homepage/> } />
        <Route path="/review" element={ <Review/> } />

    </ Routes>
  )
}

export default Main