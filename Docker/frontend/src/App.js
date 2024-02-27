import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPageWrapper from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPageWrapper from './pages/RegisterPage';
import User from './pages/User';
import Device from './pages/Device'; 
import Statistics from './pages/Statistics';
import Info from './pages/Info';
import DeviceMap from './pages/DeviceMap';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path="login" element={<LoginPageWrapper />} />
            <Route path="home" element={<HomePage />} />
            <Route path="register" element={<RegisterPageWrapper />} />
            <Route path="home/user" element={<User />} />
            <Route path="home/config" element={<Device />} />
            <Route path="home/message" element={<Info />} />
            <Route path="home/map" element={<DeviceMap />} />
            <Route path="home/chart" element={<Statistics />} /> 
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
