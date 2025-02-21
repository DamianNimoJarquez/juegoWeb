// menu.js
// Este módulo gestiona el menú principal y la validación/creación de cuentas usando localStorage.
// Además, al crear una nueva partida, inicializa el estado global del juego en window.gameState.

const Menu = (function() {
  /**
   * showMainMenu:
   * Muestra el menú principal en el área central.
   */
  function showMainMenu() {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = `
      <div id="main-menu">
        <h1>Menú Principal</h1>
        <button id="new-game-btn">Nueva Partida</button>
        <button id="load-game-btn">Cargar Partida</button>
      </div>
    `;
    // Asignar eventos a los botones del menú principal
    document.getElementById('new-game-btn').addEventListener('click', showNewGameForm);
    document.getElementById('load-game-btn').addEventListener('click', showLoadGameForm);
  }

  /**
   * showNewGameForm:
   * Muestra el formulario para crear una nueva partida.
   */
  function showNewGameForm() {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = `
      <div id="new-game-form">
        <h2>Nueva Partida</h2>
        <form id="register-form">
          <label for="username">Usuario:</label>
          <input type="text" id="username" required>
          <br>
          <label for="password">Contraseña:</label>
          <input placeholder="kk" type="password" id="password" required>
          <br>
          <button type="submit">Crear Cuenta</button>
          <button type="button" id="cancel-btn">Cancelar</button>
        </form>
      </div>
    `;
    // Asignar eventos al formulario de registro y al botón de cancelar
    document.getElementById('register-form').addEventListener('submit', handleNewGame);
    document.getElementById('cancel-btn').addEventListener('click', showMainMenu);
  }

  /**
   * handleNewGame:
   * Maneja el registro de un nuevo usuario.
   * Extrae usuario y contraseña, verifica si ya existe y, en caso contrario, crea la cuenta.
   * Además, inicializa el estado global del juego en window.gameState.
   * @param {Event} event - Evento del formulario.
   */
  function handleNewGame(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    
    // Verificar si el usuario ya existe en localStorage
    if (localStorage.getItem('account_' + username)) {
      alert('El usuario ya existe. Intenta con otro nombre o carga la partida.');
      return;
    }
    
    // Crear la cuenta con datos iniciales
    const account = {
      username: username,
      password: password, // Nota: En producción, no se deben guardar contraseñas en texto plano.
      gameState: window.gameState
    };
    
    // Guardar la cuenta en localStorage
    localStorage.setItem('account_' + username, JSON.stringify(account));
    
    alert('Cuenta creada exitosamente. Iniciando la partida...');
    // Iniciar la introducción pasando el objeto account (opcional)
    window.changeGameState('intro', account);
  }

  /**
   * showLoadGameForm:
   * Muestra el formulario para cargar una partida existente.
   */
  function showLoadGameForm() {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = `
      <div id="load-game-form">
        <h2>Cargar Partida</h2>
        <form id="login-form">
          <label for="login-username">Usuario:</label>
          <input type="text" id="login-username" required>
          <br>
          <label for="login-password">Contraseña:</label>
          <input type="password" id="login-password" required>
          <br>
          <button type="submit">Cargar</button>
          <button type="button" id="cancel-load-btn">Cancelar</button>
        </form>
      </div>
    `;
    document.getElementById('login-form').addEventListener('submit', handleLoadGame);
    document.getElementById('cancel-load-btn').addEventListener('click', showMainMenu);
  }

  /**
   * handleLoadGame:
   * Maneja la carga de una partida existente.
   * Verifica el usuario y la contraseña, y carga el estado guardado.
   * @param {Event} event - Evento del formulario.
   */
  function handleLoadGame(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    const storedAccount = localStorage.getItem('account_' + username);
    if (!storedAccount) {
      alert('No existe una cuenta con ese usuario.');
      return;
    }
    
    const account = JSON.parse(storedAccount);
    if (account.password !== password) {
      alert('Contraseña incorrecta.');
      return;
    }
    
    alert('Cuenta cargada exitosamente. Continuando la partida...');
    
    // Inicializar el estado global del juego con los datos cargados
    window.gameState = account.gameState;
    
    // Inicia la partida cargando el estado guardado
    window.changeGameState('intro', account);
  }

  // Exponer las funciones públicas del módulo
  return {
    showMainMenu: showMainMenu
  };
})();
