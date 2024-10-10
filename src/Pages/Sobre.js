import React from 'react';
import logo from '../chama.png'; 
import joanaFoto from '../images/joana.jpeg'; 
import joyceFoto from '../images/joyce.jpeg'; 
import isabelaFoto from '../images/isabela.jpeg';
import enioFoto from '../images/enio.jpeg';
import andreyFoto from '../images/andrey.jpeg';
import lucasFoto from '../images/lucas.jpeg';

const Sobre = () => {
  const teamMembers = [
    {
      name: 'Joana Falcão',
      image: joanaFoto 
    },
    {
      name: 'Joyce Barbosa',
      image: joyceFoto 
    },
    {
      name: 'Isabela Araujo',
      image: isabelaFoto 
    },
    {
      name: 'Ênio Ramos',
      image: enioFoto 
    },
    {
      name: 'Andrey Kaiky',
      image: andreyFoto 
    },
    {
      name: 'Lucas Gabriel',
      image: lucasFoto 
    },

  ];

  return (
    <div style={styles.container}>
      <img src={logo} alt="logo chama" style={styles.logo} />
      <h1 style={styles.title}>Sobre o Chama</h1>
      <p style={styles.text}>
        O Chama é uma aplicação para ajudar na denúncia de focos de incêndio. A ideia é permitir que 
        usuários possam reportar rapidamente incêndios e ajudar no combate ao fogo em áreas de risco.
      </p>

      {/* Seção da equipe */}
      <div style={styles.teamContainer}>
        <h2 style={styles.teamTitle}>Nossa Equipe</h2>
        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.teamMember}>
              <img src={member.image} alt={member.name} style={styles.memberImage} />
              <h3 style={styles.memberName}>{member.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#0d0b3f',
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    width: '100px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '32px',
    margin: '20px 0',
  },
  text: {
    fontSize: '18px',
    marginBottom: '40px',
    padding: '0 20px',
    lineHeight: '1.5',
  },
  teamContainer: {
    marginTop: '40px',
    textAlign: 'center',
  },
  teamTitle: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  teamGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  teamMember: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  memberImage: {
    width: '100px',    
    height: '100px',    
    borderRadius: '50%', 
    marginBottom: '10px',
    objectFit: 'cover',    
  },
  memberName: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
};

export default Sobre;
