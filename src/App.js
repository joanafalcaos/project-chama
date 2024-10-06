import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Sobre from './Pages/Sobre';
import './App.css'; 

function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/" className="link">Home</Link>
        <Link to="/sobre" className="link">Sobre</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
}

export default App;
