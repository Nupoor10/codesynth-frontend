import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Features from './pages/Features/Features';
import Resources from './pages/Resources/Resources';
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
        </Routes>
      </Router>
    </>
  )
}

export default App
