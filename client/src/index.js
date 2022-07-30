import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "bootstrap/dist/js/bootstrap.min"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from './Components/Navbar/Navbar.Component';
import About from './Components/About/About.Component';
import Contact from './Components/Contact/Contact.Component';
import Login from './Components/Login/Login.Component';
import Signup from './Components/Signup/Signup.Component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
    </Routes>
  </BrowserRouter>
  
);

