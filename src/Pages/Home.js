import React from 'react';
import logo from '../chama.png'; 

const Home = () => {
  return (
    <div style={styles.container}>
      <img src={logo} alt="logo chama" style={styles.logo} />
      <h1 style={styles.title}>Bem-vindo ao Chama</h1>
      <p style={styles.text}>Sua ferramenta de denúncia de focos de incêndio.</p>
      <button style={styles.button}>Reportar foco de incêndio</button>
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
  },
  button: {
    backgroundColor: 'white',
    color: '#0d0b3f',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Home;
