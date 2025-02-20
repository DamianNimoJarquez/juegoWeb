// menu.js
// Este módulo contiene funciones para mostrar y gestionar el menú principal

const Menu = (function() {
  // Muestra el menú principal
  function showMainMenu() {
    // Se accede a la plantilla base para mostrar el menú en el área central
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = `
      <div id="main-menu">
        <h1>Menú Principal</h1>
        <button id="new-game-btn">Nueva Partida</button>
        <button id="load-game-btn">Cargar Partida</button>
      </div>
    `;
    // Asignar evento al botón de "Nueva Partida"
    document.getElementById('new-game-btn').addEventListener('click', function() {
      // Llama al cambio de estado para iniciar la introducción
      window.changeGameState('intro');
    });
  }
  
  return {
    showMainMenu: showMainMenu
  };
})();
