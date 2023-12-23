import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Features from './pages/Features/Features';
import Resources from './pages/Resources/Resources';
import UserCodes from './pages/UserCodes/UserCodes';
import Playground from './pages/Playground/Playground';
import Community from './pages/Community/Community';
import Notes from './pages/Notes/Notes';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/features' element={<Features />}/>
          <Route path='/resources' element={<Resources />}/>
          <Route path='/mycodes' element={<UserCodes />}/>
          <Route path='/code/:id' element={<Playground />}/>
          <Route path='/community' element={<Community />}/>
          <Route path='/notes/:id' element={<Notes />}/>
        </Routes>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </Router>
    </>
  )
}

export default App
