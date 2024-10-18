import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReconhecimentoFacial.css';

const ReconhecimentoFacial = () => {
  const [status, setStatus] = useState('Posicione seu rosto no círculo...');
  const [recognitionSuccess, setRecognitionSuccess] = useState(false); // Variável booleana para controle
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Simula a IA de reconhecimento facial (colocar lógica real aqui no futuro)
  const recognizeFace = () => {
    const faceDetected = Math.random() > 0.5;
    const recognitionResult = faceDetected && Math.random() > 0.5;

    if (!faceDetected) {
      setStatus('Posicione seu rosto no círculo...');
    } else if (faceDetected && !recognitionResult) {
      setStatus('Rosto detectado. Verificando...');
    } else if (recognitionResult) {
      setStatus('Rosto reconhecido! Bem-vindo, João Silva.');

      setRecognitionSuccess(true); // Habilita a variável booleana
      // Aqui vai a lógica para abrir a catraca, etc.

      setTimeout(() => {
        resetVerification();
      }, 3000);
    } else {
      setStatus('Erro no reconhecimento. Tente novamente.');
      setTimeout(() => {
        resetVerification();
      }, 3000);
    }
  };

  //inicia o feed de vídeo
  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          setStatus('Erro ao acessar a câmera.');
        });
    };
    startVideo();
  }, []);

  // reiniciar o processo de verificação
  const resetVerification = () => {
    setRecognitionSuccess(false); // Reseta a variável de sucesso
    setStatus('Posicione seu rosto no círculo...');
  };

  // inicia o loop de verificação
  useEffect(() => {
    const verificationInterval = setInterval(() => {
      recognizeFace(); // Chama a função de reconhecimento facial
    }, 5000); // Verifica a cada 5s

    return () => clearInterval(verificationInterval); // Limpa o intervalo ao desmontar
  }, []);

  // lida com o logout ou navegação para outra tela
  const handleLogout = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container">
      {/* Status do reconhecimento */}
      <div className="paiStatus">
        <div className="status">
          {status}
        </div>
      </div>

      {/* Feed do vídeo */}
      <div className="video-container">
        <video ref={videoRef} autoPlay className="video-element"></video>
        <div className="circle-overlay"></div>
      </div>

      {/* Foto de referência e nome do aluno */}
      {recognitionSuccess && (
        <div className="info-section">
          <div className="photo-reference">
            <img src="photo-placeholder.jpg" alt="Foto Cadastrada" />
          </div>
          <div className="student-info">
            <p>Nome: João Silva</p>
            <p>Matrícula: 123456789</p>
          </div>
        </div>
      )}

      {/* Sair */}
      <div className="btCadastroEscola">
        <button className="buttonSair" onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
};

export default ReconhecimentoFacial;
