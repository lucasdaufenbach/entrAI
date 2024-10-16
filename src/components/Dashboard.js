import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Estados para controle do formulário de escola
  const [school, setSchool] = useState({
    name: '',
    address: '',
    number: '',
    cnpj: '',
    studentCount: '',
    foundationYear: '',
    classroomCount: '',
    courses: []
  });

  const [newCourse, setNewCourse] = useState(''); // Novo curso a ser adicionado
  const [classroom, setClassroom] = useState({
    number: '',
    studentCount: '',
    location: '',
    course: '',
    selectedSchool: ''
  });

  // Estado para pessoa (aluno)
  const [person, setPerson] = useState({
    name: '',
    email: '',
    birthDate: '',
    school: '',
    course: '',
    classroom: ''
  });

  const [schools, setSchools] = useState([]); // Lista de escolas cadastradas
  const [courses, setCourses] = useState([]); // Lista de cursos filtrada pela escola selecionada

  // Carregar as escolas cadastradas ao iniciar
  useEffect(() => {
    const savedSchools = JSON.parse(localStorage.getItem('reports')) || [];
    setSchools(savedSchools.map((report) => report.school).filter(Boolean));
  }, []);

  // Função para lidar com mudanças nos campos da escola
  const handleSchoolChange = (e) => {
    setSchool({ ...school, [e.target.name]: e.target.value });
  };

  // Função para adicionar um novo curso à lista de cursos da escola
  const handleAddCourse = () => {
    if (newCourse && !school.courses.includes(newCourse)) {
      setSchool({ ...school, courses: [...school.courses, newCourse] });
      setNewCourse(''); // Limpar o campo do curso
    }
  };

  // Função para cadastrar a escola
  const handleSchoolSubmit = (e) => {
    e.preventDefault();

    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push({ school });

    // Atualiza o localStorage e o estado de escolas
    localStorage.setItem('reports', JSON.stringify(reports));
    setSchools([...schools, school]); // Adiciona a nova escola à lista de escolas

    console.log('Escola cadastrada com sucesso!', school);

    // Limpar campos da escola
    setSchool({
      name: '',
      address: '',
      number: '',
      cnpj: '',
      studentCount: '',
      foundationYear: '',
      classroomCount: '',
      courses: []
    });
  };

  // Função para lidar com mudanças nos campos da turma
  const handleClassroomChange = (e) => {
    setClassroom({ ...classroom, [e.target.name]: e.target.value });
  };

  // Função para lidar com a seleção de uma escola
  const handleSchoolSelect = (e) => {
    const selectedSchool = e.target.value;
    setClassroom({ ...classroom, selectedSchool });
    setPerson({ ...person, school: selectedSchool });

    // Filtrar os cursos da escola selecionada
    const schoolData = schools.find((school) => school.name === selectedSchool);
    if (schoolData) {
      setCourses(schoolData.courses); // Atualiza os cursos com base na escola selecionada
    }
  };

  // Função para cadastrar a turma
  const handleClassroomSubmit = (e) => {
    e.preventDefault();

    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push({ classroom });

    // Atualiza o localStorage e limpa os campos de turma
    localStorage.setItem('reports', JSON.stringify(reports));
    console.log('Turma cadastrada com sucesso!', classroom);
    setClassroom({
      number: '',
      studentCount: '',
      location: '',
      course: '',
      selectedSchool: ''
    });
  };

  // Função para lidar com mudanças nos campos de aluno
  const handlePersonChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  // Função para cadastrar o aluno
  const handlePersonSubmit = (e) => {
    e.preventDefault();

    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push({ person });

    // Atualiza o localStorage e limpa os campos de aluno
    localStorage.setItem('reports', JSON.stringify(reports));
    console.log('Aluno cadastrado com sucesso!', person);
    setPerson({
      name: '',
      email: '',
      birthDate: '',
      school: '',
      course: '',
      classroom: ''
    });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="center">
        <div className="container">
          <h2>Cadastro de Escolas, Turmas e Alunos</h2>

          {/* Box de cadastro de escola */}
          <div className="box">
            <h3>Cadastro de Escola</h3>
            <form onSubmit={handleSchoolSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nome da Escola"
                value={school.name}
                onChange={handleSchoolChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Endereço"
                value={school.address}
                onChange={handleSchoolChange}
                required
              />
              <input
                type="text"
                name="number"
                placeholder="Número"
                value={school.number}
                onChange={handleSchoolChange}
                required
              />
              <input
                type="text"
                name="cnpj"
                placeholder="CNPJ"
                value={school.cnpj}
                onChange={handleSchoolChange}
                required
              />
              <input
                type="number"
                name="studentCount"
                placeholder="Quantidade de Alunos"
                value={school.studentCount}
                onChange={handleSchoolChange}
                required
              />
              <input
                type="number"
                name="foundationYear"
                placeholder="Ano de Fundação"
                value={school.foundationYear}
                onChange={handleSchoolChange}
                required
              />
              <input
                type="number"
                name="classroomCount"
                placeholder="Quantidade de Turmas"
                value={school.classroomCount}
                onChange={handleSchoolChange}
                required
              />

              {/* Campo para adicionar cursos */}
              <div className="courses">
                <h4>Cursos</h4>
                <input
                  type="text"
                  placeholder="Nome do Curso"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                />
                <button type="button" onClick={handleAddCourse}>Adicionar Curso</button>

                <ul>
                  {school.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>

              <button type="submit">Cadastrar Escola</button>
            </form>
          </div>

          {/* Box de cadastro de turma */}
          <div className="box">
            <h3>Cadastro de Turma</h3>
            <form onSubmit={handleClassroomSubmit}>
              <input
                type="text"
                name="number"
                placeholder="Número da Turma"
                value={classroom.number}
                onChange={handleClassroomChange}
                required
              />
              <input
                type="number"
                name="studentCount"
                placeholder="Quantidade de Alunos"
                value={classroom.studentCount}
                onChange={handleClassroomChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Local"
                value={classroom.location}
                onChange={handleClassroomChange}
                required
              />

              {/* Seleção de escola via dropdown */}
              <div className="school-selection">
                <h4>Selecionar Escola</h4>
                <select
                  name="selectedSchool"
                  value={classroom.selectedSchool}
                  onChange={handleSchoolSelect}
                  required
                >
                  <option value="">Selecione uma escola</option>
                  {schools.map((school, index) => (
                    <option key={index} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seleção de cursos dependente da escola */}
              <div className="course-selection">
                <h4>Selecionar Curso</h4>
                <select
                  name="course"
                  value={classroom.course}
                  onChange={handleClassroomChange}
                  required
                  disabled={!classroom.selectedSchool}
                >
                  <option value="">Selecione um curso</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit">Cadastrar Turma</button>
            </form>
          </div>

          {/* Box de cadastro de aluno */}
          <div className="box">
            <h3>Cadastro de Aluno</h3>
            <form onSubmit={handlePersonSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nome do Aluno"
                value={person.name}
                onChange={handlePersonChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail do Aluno"
                value={person.email}
                onChange={handlePersonChange}
                required
              />
              <input
                type="date"
                name="birthDate"
                placeholder="Data de Nascimento"
                value={person.birthDate}
                onChange={handlePersonChange}
                required
              />

              {/* Seleção de escola */}
              <div className="school-selection">
                <h4>Selecionar Escola</h4>
                <select
                  name="school"
                  value={person.school}
                  onChange={handleSchoolSelect}
                  required
                >
                  <option value="">Selecione uma escola</option>
                  {schools.map((school, index) => (
                    <option key={index} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seleção de curso dependente da escola */}
              <div className="course-selection">
                <h4>Selecionar Curso</h4>
                <select
                  name="course"
                  value={person.course}
                  onChange={handlePersonChange}
                  required
                  disabled={!person.school}
                >
                  <option value="">Selecione um curso</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seleção de número da turma */}
              <input
                type="text"
                name="classroom"
                placeholder="Número da Turma"
                value={person.classroom}
                onChange={handlePersonChange}
                required
              />

              <button type="submit">Cadastrar Aluno</button>
            </form>
          </div>

          {/* Botão de logout */}
          <div className="box">
            <button onClick={handleLogout}>Sair</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
