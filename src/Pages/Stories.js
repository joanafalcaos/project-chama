import React from 'react';
import logo from '../chama2.png'; 
import CustomCard from '../Components/Card';
import './Stories.css';

const Stories = () => {
    return (
      <div className="stories-container">
        <h1 className="home-title">Registro de relatos</h1>
        <div className="cards-container">
          <CustomCard title="Relatar queimada" content="Clique aqui para relatar uma queimada!" />
          <CustomCard title="Relatos ativos" content="Clique aqui para ver seus relatos ativos" />
          <CustomCard title="Relatos encerrados" content="Clique aqui para ver seus relatos encerrados" />
        </div>
      </div>
    );
  };  

export default Stories;