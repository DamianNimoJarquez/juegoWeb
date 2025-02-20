// menu.js
// Este módulo gestiona el menú principal y la validación/creación de cuentas usando localStorage

const Menu = (function() {
  // Muestra el menú principal en el área central
  function showMainMenu() {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = `
      <div id="main-menu">
        <h1>Menú Principal2</h1>
        <button id="new-game-btn">Nueva Partida</button>
        <button id="load-game-btn">Cargar Partida</button>
      </div>
    `;
    // Asignar eventos a los botones
    document.getElementById('new-game-btn').addEventListener('click', showNewGameForm);
    document.getElementById('load-game-btn').addEventListener('click', showLoadGameForm);
  }

  // Muestra el formulario para crear una nueva partida
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
    // Asignar eventos al formulario
    document.getElementById('register-form').addEventListener('submit', handleNewGame);
    document.getElementById('cancel-btn').addEventListener('click', showMainMenu);
  }

  // Maneja el registro de un nuevo usuario
  // Recibe el evento del formulario y extrae usuario/contraseña
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
    
    // Crear la cuenta guardando un objeto JSON con datos iniciales
    const account = {
      username: username,
      password: password, // Nota: En un entorno real, nunca guardar contraseñas en texto plano.
      gameState: {
        // Estado inicial del juego (mapa, personaje, narrativa, etc.)
        playerLevel: 1,
        xp: 0,
        attributes: { hp: 100, mana: 50, attack: 10, defense: 5, agility: 5, concentration: 5 },
        coins: 0,
        mapState: {},  // Aquí se almacenarán los datos del mapa, celdas, etc.
        currentScene: 'intro'
      }
    };
    
    // Guardar la cuenta en localStorage
    localStorage.setItem('account_' + username, JSON.stringify(account));
    alert('Cuenta creada exitosamente. Iniciando la partida...');
    // Una vez creada la cuenta, iniciar la introducción o cargar el estado del juego
    // Por ejemplo, llamar a la función que cambia el estado del juego:
    window.changeGameState('intro', account);
  }

  // Muestra el formulario para cargar una partida existente
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

  // Maneja la carga de una partida existente
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
    // Inicia la partida cargando el estado guardado
    window.changeGameState('intro', account);
  }

  // Exponer las funciones públicas
  return {
    showMainMenu: showMainMenu
  };
})();
