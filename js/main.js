// main.js

document.addEventListener('DOMContentLoaded', function() {
  //Menu.showMainMenu();
  //const storedAccount = localStorage.getItem('account_' + "fulano");
  //const account = JSON.parse(storedAccount);
  //Intro.startIntro( );
  //Tutorial.createNPCIntro();
  HUD.inicializaHUD();

  /**
   * changeGameState:
   * Cambia el estado global del juego.
   * @param {string} state - Estado al que se desea cambiar ('menu', 'tutorial', 'map', 'combat', etc.)
   * @param {Object} [params] - Parámetros adicionales, como restricción de celda.
   */
  function changeGameState(state, params) {
    switch(state) {
      case 'menu':
        Menu.showMainMenu();
        break;
      case 'tutorial':
        //Intro.startIntro(params && params.account);
		Tutorial.startTutorial(window.gameState.currentTutorialSecene);
        break;
      case 'map':
        // Se llama a la función del módulo de mapa
        Map.loadWorldMap(params);
        break;
      case 'combat':
        Combat.startCombat();
        break;
	  case 'inside':
	    Casilla.loadCellContent(params);
		break;
      default:
        console.log('Estado no reconocido:', state);
    }
  }
  
  window.changeGameState = changeGameState;
});
