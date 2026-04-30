import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import TeacherLogin from './pages/Auth/TeacherLogin/TeacherLogin';
import TeacherRegister from './pages/Auth/TeacherRegister/TeacherRegister';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
return (
  <div className='page_background'>

  <Router>
    <Routes>
      <Route path='/' element={<TeacherLogin/>}/>
      <Route path="/login" element={<TeacherLogin/>}/>
      <Route path="/register" element={<TeacherRegister/>}/>
      <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
    </Routes>
  </Router>
  </div>
); 
}

export default App;