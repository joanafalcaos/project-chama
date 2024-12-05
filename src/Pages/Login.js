import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../chama2.png'; 
import './Login.css';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para mostrar feedback enquanto carrega
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Usuário ou senha inválidos');
      }

      const data = await response.json();

      // Armazena os dados do usuário
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('user', JSON.stringify(data));

      setAuthenticated(true); // Atualiza o estado de autenticação
      navigate('/'); 
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

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
      <button onClick={handleLogin} className="login-button" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      <p className="login-registerText">Não tem conta?</p>
      <button onClick={handleSignup} className="login-link-button">Cadastre-se</button>
    </div>
  );
};

export default Login;
