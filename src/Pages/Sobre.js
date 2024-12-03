import React from 'react';
import joanaFoto from '../images/joana.jpeg';
import joyceFoto from '../images/joyce.jpeg';
import isabelaFoto from '../images/isabela.jpeg';
import enioFoto from '../images/enio.jpeg';
import andreyFoto from '../images/andrey.jpeg';
import lucasFoto from '../images/lucas.jpeg';
import ProfilePhoto from '../Components/ProfilePhoto';
import './Sobre.css';

const teamMembers = [
  {
    name: 'Joana Falcão',
    img: joanaFoto,
    github: 'https://github.com/joanafalcaos',
    linkedin: 'https://www.linkedin.com/in/joana-falc%C3%A3o-05990a287/'
  },
  {
    name: 'Joyce Barbosa',
    img: joyceFoto,
    github: 'https://github.com/joycebarbosag',
    linkedin: 'https://www.linkedin.com/in/joycebarbosagomes/'
  },
  {
    name: 'Isabela Araujo',
    img: isabelaFoto,
    github: 'https://github.com/isacarvalho20',
    linkedin: 'https://www.linkedin.com/in/isabela-araujo-s/'
  },
  {
    name: 'Ênio Ramos',
    img: enioFoto,
    github: 'https://github.com/enio',
    linkedin: 'https://www.linkedin.com/in/enio'
  },
  {
    name: 'Andrey Kaiky',
    img: andreyFoto,
    github: 'https://github.com/JovemKA',
    linkedin: 'https://www.linkedin.com/in/andrey-kaiky/'
  },
  {
    name: 'Lucas Gabriel',
    img: lucasFoto,
    github: 'https://github.com/LucasGdSToledo',
    linkedin: 'https://www.linkedin.com/in/lucas'
  },
];

function Sobre() {
  return (
    <div className="sobre-container">
      <div className="sobre-description">
        <h1>Sobre o CHAMA</h1>
        <p>O Chama é uma aplicação digital e sem fins lucrativos que objetiva o suporte e automação na denúncia de focos de incêndio.
          <br />A ideia é permitir que usuários possam reportar rapidamente incêndios e, assim, ajudar no seu combate!</p>
        <br /><p className="bold-text">Conheça abaixo nossos desenvolvedores!</p>
      </div>
      {teamMembers.map((member, index) => (
        <ProfilePhoto
          key={index}
          img={member.img}
          name={member.name}
          alt={member.name}
          github={member.github}
          linkedin={member.linkedin}
        />
      ))}
    </div>
  );
}

export default Sobre;