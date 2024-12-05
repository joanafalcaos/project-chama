import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';
import incendioFumaca from '../images/incendio_fumaca.jpg';
import incendioApagando from '../images/incendio_apagando.jpg'
import extintor from '../images/extintor.jpg'
import './Stories.css';

const Stories = () => {
    return (
      <div className="stories-container">
        <h1 className="home-title">Registro de relatos</h1>
        <p className='home-subtitle'>Iclua, aqui, novos relatos de queimadas, ou verifique seus relatos ativos e encerrados!</p>
        <div className="cards-container">
          <Link to="/stories/add" className="stories-link"><Card image={incendioFumaca} title="Relatar queimada" subtitle="Clique aqui para relatar uma queimada" /></Link>
          <Link to="/stories/list" className="stories-link"><Card image={incendioApagando} title="Relatos ativos" subtitle="Clique aqui para ver seus relatos ativos" /></Link>
          <Link to="/stories/closed" className="stories-link"><Card image={extintor} title="Relatos encerrados" subtitle="Clique aqui para ver seus relatos encerrados" /></Link>
        </div>
      </div>
    );
};

export default Stories;