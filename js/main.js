// main.js
document.addEventListener('DOMContentLoaded', function() {
  // Inicia mostrando el menú principal
  Menu.showMainMenu();
  
  /**
   * changeGameState:
   * Cambia el estado global del juego.
   * Parámetros:
   *   state: String que indica el nuevo estado ('menu', 'intro', 'map', 'combat', etc.)
   *   account (opcional): Objeto de cuenta que contiene el estado del juego.
   */
  function changeGameState(state, account) {
    switch(state) {
      case 'menu':
        Menu.showMainMenu();
        break;
      case 'intro':
        // Aquí se llamaría al módulo de introducción (intro.js)
        // Pasamos el objeto account para que la introducción pueda inicializarse con el estado del juego
        Intro.startIntro(account);
        break;
      // Otros casos para 'map', 'combat', etc.
      default:
        console.log('Estado no reconocido:', state);
    }
  }
  
  // Hacer global la función para que otros módulos puedan llamarla
  window.changeGameState = changeGameState;
});
