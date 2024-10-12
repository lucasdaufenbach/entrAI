import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importando o CSS específico da tela de Login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulação de verificação de login
    if (email === 'user@example.com' && password === 'password123') {
      navigate('/Dashboard'); // Redireciona para o Dashboard
    } else {
      setErrorMessage('Email ou senha inválidos.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redireciona para a tela de Cadastro
  };

  return (
    <div className="center">
      <div className="container">
        <h2>Login</h2>
        {errorMessage && <p className="alert">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        {/* Botão para redirecionar para a tela de cadastro */}
        <button className="register-btn" onClick={handleRegisterRedirect}>
          Cadastrar Email
        </button>
      </div>
    </div>
  );
};

export default Login;
