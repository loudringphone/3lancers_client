import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyRequests from '../pages/MyRequests';
import MyOffers from '../pages/MyOffers';
import BrowseRequests from '../pages/BrowseRequests';
import Header from './Header';
import Login from '../pages/Login';
import Home from '../pages/Home';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/my-requests" element={<MyRequests/>} />
        <Route path="/my-offers" element={<MyOffers/>} />
        <Route path="/requests" element={<BrowseRequests/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
