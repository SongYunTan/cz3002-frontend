import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Group from './pages/Group';
import CreateGroup from './pages/CreateGroup';
import AddReview from './pages/AddReview';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<Login/>}></Route>
      <Route exact path='/signup' element={<Signup/>}></Route>
      <Route exact path='/dashboard' element={<Dashboard/>}></Route>
      <Route exact path='/group' element={<Group/>}></Route>
      <Route exact path='/create-group' element={<CreateGroup/>}></Route>
      <Route exact path='/add-review' element={<AddReview/>}></Route>
    </Routes>
  );
}

export default Main;