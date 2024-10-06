import React from 'react';
import logo from '../chama.png'; // Caminho para sua logo

const Sobre = () => {
  return (
    <div style={styles.container}>
      <img src={logo} alt="logo chama" style={styles.logo} />
      <h1 style={styles.title}>Sobre o Chama</h1>
      <p style={styles.text}>
        O Chama é uma aplicação para ajudar na denúncia de focos de incêndio. A ideia é permitir que 
        usuários possam reportar rapidamente incêndios e ajudar no combate ao fogo em áreas de risco.
      </p>
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
};

export default Sobre;
