import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/signup' component={Signup}></Route>
    </Routes>
  );
}

export default Main;