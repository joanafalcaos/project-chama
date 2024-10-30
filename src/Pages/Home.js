import React from 'react';
import logo from '../chama2.png'; 
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="logo chama" className="home-logo" />
      <h1 className="home-title">Bem-vindo ao Chama</h1>
      <p className="home-text">Sua ferramenta de denúncia de focos de incêndio.</p>
      <button className="home-button">Reportar foco de incêndio</button>
    </div>
  );
};

export default Home;
