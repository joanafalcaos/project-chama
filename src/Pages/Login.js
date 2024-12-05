// login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../chama2.png'; 
import './Login.css';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('authenticated', 'true'); 
      setAuthenticated(true); // Atualiza o estado authenticated
      navigate('/'); // Redireciona para a página inicial (Home)
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  }

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <p className="login-link">Esqueci a senha</p>
      <button onClick={handleLogin} className="login-button">Entrar</button>
      <p className="login-registerText">Não tem conta?</p>
<button onClick={handleSignup} className="login-link-button">Cadastre-se</button>

    </div>
  );
};

export default Login;
