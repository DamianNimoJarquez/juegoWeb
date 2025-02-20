// main.js
// Este script orquesta el flujo del juego
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar la aplicación: mostrar el menú principal
  Menu.showMainMenu();
  
  // Ejemplo: función para cambiar de estado
  // El estado puede ser 'menu', 'intro', 'map', 'combat', etc.
  function changeGameState(state) {
    switch(state) {
      case 'menu':
        Menu.showMainMenu();
        break;
      case 'intro':
        Intro.startIntro();
        break;
      case 'map':
        Map.loadWorldMap();
        break;
      case 'combat':
        Combat.startCombat();
        break;
      default:
        console.log('Estado no reconocido:', state);
    }
  }
  
  // Exportamos la función si se desea usar en otros módulos (opcional)
  window.changeGameState = changeGameState;
});
