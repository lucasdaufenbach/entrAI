import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../authServices';
import './Report.css';

const Report = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  // Carregar os dados do localStorage quando o componente for montado
  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
    setReports(savedReports);
  }, []);

  return (
    <div className="center">
      <div className="container">
        <h2>Relatório</h2>
        {reports.length > 0 ? (
          <ul>
            {reports.map((report, index) => (
              <li key={index}>
                <strong>Escola:</strong> {report.school},
                <strong> Turma:</strong> {report.classroom},
                <strong> Pessoa:</strong> {report.person}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum dado cadastrado ainda.</p>
        )}

        <button class="buttonPrimario" onClick={() => navigate('/dashboard')}>Voltar</button>
      </div>
    </div>
  );
};

export default Report;
