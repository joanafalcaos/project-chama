import React from 'react';
import logo from '../chama2.png'; 
import joanaFoto from '../images/joana.jpeg'; 
import joyceFoto from '../images/joyce.jpeg'; 
import isabelaFoto from '../images/isabela.jpeg';
import enioFoto from '../images/enio.jpeg';
import andreyFoto from '../images/andrey.jpeg';
import lucasFoto from '../images/lucas.jpeg';
import './Sobre.css';

const Sobre = () => {
  const teamMembers = [
    { name: 'Joana Falcão', image: joanaFoto },
    { name: 'Joyce Barbosa', image: joyceFoto },
    { name: 'Isabela Araujo', image: isabelaFoto },
    { name: 'Ênio Ramos', image: enioFoto },
    { name: 'Andrey Kaiky', image: andreyFoto },
    { name: 'Lucas Gabriel', image: lucasFoto },
  ];

  return (
    <div className="sobre-container">
      <img src={logo} alt="logo chama" className="sobre-logo" />
      <h1 className="sobre-title">Sobre o Chama</h1>
      <p className="sobre-text">
        O Chama é uma aplicação para ajudar na denúncia de focos de incêndio. A ideia é permitir que 
        usuários possam reportar rapidamente incêndios e ajudar no combate ao fogo em áreas de risco.
      </p>

      <div className="sobre-teamContainer">
        <h2 className="sobre-teamTitle">Nossa Equipe</h2>
        <div className="sobre-teamGrid">
          {teamMembers.map((member, index) => (
            <div key={index} className="sobre-teamMember">
              <img src={member.image} alt={member.name} className="sobre-memberImage" />
              <h3 className="sobre-memberName">{member.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sobre;
