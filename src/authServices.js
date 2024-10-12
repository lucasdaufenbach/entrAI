const authService = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false, // Pega o estado do localStorage
  
  login(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', true); // Persistindo o estado de autenticação no localStorage
    }
    return this.isAuthenticated;
  },

  logout() {
    this.isAuthenticated = false;
    localStorage.setItem('isAuthenticated', false); // Atualiza o localStorage ao deslogar
  },

  register(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email });
    localStorage.setItem('users', JSON.stringify(users)); // Adiciona o novo usuário no localStorage
  },

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }
};

export default authService;
