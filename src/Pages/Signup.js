import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../chama2.png';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    alert('Cadastro realizado com sucesso!');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigate('/login'); // Redireciona para login após cadastro
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="Logo" className="signup-logo" />
      <input
        type="text"
        placeholder="Nome de Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="signup-input"
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="signup-input"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="signup-input"
      />
      <input
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="signup-input"
      />
      <button onClick={handleSignup} className="signup-button">Cadastrar</button>
      <p className="signup-link-text">
        Já tem uma conta?{' '}
        <button onClick={handleLoginRedirect} className="signup-link-button">
          Entrar
        </button>
      </p>
    </div>
  );
};

export default Signup;
