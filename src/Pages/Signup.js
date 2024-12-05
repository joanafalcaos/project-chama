import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../chama2.png';
import './Signup.css';

const Signup = () => {
  const [userType, setUserType] = useState('user'); // 'user' ou 'firefighter'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    zipCode: '',
    street: '',
    houseNumber: '',
    neighborhood: '',
    city: '',
    patent: '',
    fireHouse: '',
    firefighterRegister: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    const {
      name,
      email,
      password,
      confirmPassword,
      cpf,
      zipCode,
      street,
      houseNumber,
      neighborhood,
      city,
      patent,
      fireHouse,
      firefighterRegister,
    } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    const payload =
      userType === 'firefighter'
        ? {
          name,
          email,
          password,
          patent,
          fireHouse,
          firefighterRegister,
          address: {
            zipCode,
            street,
            houseNumber: Number(houseNumber),
            neighborhood,
            city,
          },
        }
        : {
          name,
          email,
          password,
          cpf,
          address: {
            zipCode,
            street,
            houseNumber: Number(houseNumber),
            neighborhood,
            city,
          },
        };

    const url =
      userType === 'firefighter'
        ? 'http://localhost:8080/api/firefighters/create'
        : 'http://localhost:8080/api/reporters/create';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        alert('Erro ao realizar o cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao realizar o cadastro. Verifique sua conexão.');
    }
  };

  return (
    <div className="signup-container">
          <select
      name="userType"
      value={userType}
      onChange={(e) => setUserType(e.target.value)}
      className="signup-select" 
    >
      <option value="user">Usuário</option>
      <option value="firefighter">Bombeiro</option>
    </select>
      <div className="signup-grid">
        <input
          type="text"
          placeholder="Nome *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="E-mail *"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Senha *"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Confirmar Senha *"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="signup-input"
        />

        {userType === 'user' && (
          <>
            <input
              type="text"
              placeholder="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="signup-input"
            />
          </>
        )}

        {userType === 'firefighter' && (
          <>
            <input
              type="text"
              placeholder="Patente"
              name="patent"
              value={formData.patent}
              onChange={handleChange}
              className="signup-input"
            />
            <input
              type="text"
              placeholder="Quartel"
              name="fireHouse"
              value={formData.fireHouse}
              onChange={handleChange}
              className="signup-input"
            />
            <input
              type="text"
              placeholder="Registro de Bombeiro"
              name="firefighterRegister"
              value={formData.firefighterRegister}
              onChange={handleChange}
              className="signup-input"
            />
          </>
        )}

        <input
          type="text"
          placeholder="CEP"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Rua"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Número"
          name="houseNumber"
          value={formData.houseNumber}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Bairro"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Cidade"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="signup-input"
        />
      </div>
      <button onClick={handleSignup} className="signup-button">
        Cadastrar
      </button>
      <div className="signup-footer">
        Já tem uma conta?
        <span
          className="signup-link"
          onClick={() => navigate('/login')}
        >
          Entrar
        </span>
      </div>
    </div>
  );
};

export default Signup;
