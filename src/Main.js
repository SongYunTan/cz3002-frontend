import React from 'react';
import  {Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Swipe from './pages/Swipe/Swipe';
import Matches from './pages/Matches/Matches';
import Create  from './pages/GroupCreation/Create';
import Groupsetting from './pages/GroupSetting/Groupsetting';
import Homepage from  './pages/home/home';
import Addreview from  './pages/review/review';
import Profile from  './pages/profile/profile';
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
        <Route path="/home" element={ <Homepage/> } />
        <Route path="/profile" element={ <Profile/> } />
        <Route path="/review" element={ <Addreview/> } />
    </ Routes>
  )
}

export default Main