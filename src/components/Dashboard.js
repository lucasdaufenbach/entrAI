import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Estados para controlar os dados do formulário
  const [school, setSchool] = useState('');
  const [classroom, setClassroom] = useState('');
  const [person, setPerson] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEntry = { school, classroom, person };
    
    // Recuperar os dados anteriores, se houver
    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    
    // Adicionar o novo cadastro à lista de relatórios
    reports.push(newEntry);
    
    // Salvar no localStorage
    localStorage.setItem('reports', JSON.stringify(reports));
    
    console.log('Cadastro realizado com sucesso!', newEntry);

    // Limpar os campos após o envio
    setSchool('');
    setClassroom('');
    setPerson('');

    // Navegar para a página de Relatório
    navigate('/report');
  };

  const handleLogout = () => {
    // Realiza logout e redireciona para a tela de login
    navigate('/');
  };

  return (
    <div>
      <div className="center">
        <div className="container">
          <h2>Cadastro de Escolas/Turmas/Pessoas</h2>
          <form onSubmit={handleSubmit}>
            {/* Campo para cadastro de escola */}
            <input
              type="text"
              placeholder="Nome da Escola"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            />

            {/* Campo para cadastro de turma */}
            <input
              type="text"
              placeholder="Nome da Turma"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              required
            />

            {/* Campo para cadastro de pessoa */}
            <input
              type="text"
              placeholder="Nome da Pessoa"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              required
            />

            {/* Botão de envio */}
            <button type="submit">Cadastrar</button>
          </form>

          {/* Botão para retornar ao login */}
          <button onClick={handleLogout} className="logout-btn">Sair</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
