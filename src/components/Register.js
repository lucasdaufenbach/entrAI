import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação
import authService from '../authServices';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // useNavigate para redirecionar

  const handleRegister = () => {
    // Simulação de chamada ao authService
    authService.register(email, password);

    // Salvando os dados no localStorage
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    setSuccess('Cadastro realizado com sucesso!');
    setEmail('');
    setPassword('');
  };

  // redirecionar para a página de login
  const handleGoToLogin = () => {
    navigate('/'); // Altera o caminho da rota para a tela de login
  };

  return (
    <div className="center">
      <div className="container">
        <h2>Cadastro</h2>
        <input
          class="cadastroInput"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          class="cadastroInput"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {success && <p className="alert" style={{ color: 'green' }}>{success}</p>}
        <button class="buttonPrimario" onClick={handleRegister}>Cadastrar</button>

        <button class="buttonSecundario" onClick={handleGoToLogin} style={{ marginTop: '10px' }}>
          Voltar para Login
        </button>
      </div>
    </div>
  );
};

export default Register;
