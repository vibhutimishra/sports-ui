import React from 'react'
import './App.css'
import Login from './components/login'
import EventList from './components/eventlist';
import SignUp from './components/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/private';
const  App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element = { <Login/> }/>
        <Route path="/signup" element={<SignUp />} />
        <Route
                    path="/:userId/events"
                    element={
                        <PrivateRoute>
                            <EventList />
                        </PrivateRoute>
                    }
                />
      </Routes>
    </Router>
  )
}

export default App;
