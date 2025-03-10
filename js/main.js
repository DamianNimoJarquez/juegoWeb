// main.js

document.addEventListener('DOMContentLoaded', function() {
  //Menu.showMainMenu();
  //const storedAccount = localStorage.getItem('account_' + "fulano");
  //const account = JSON.parse(storedAccount);
  //Intro.startIntro( );
  params2 = {
    cellId: "0-2",
    tutorial: true
  }
  Tutorial.createNPCIntro();
  window.gameState.npcs['Maestro'].currentDialogueIndex.beforeIndiceDialogos = 1;
  window.gameState.npcs['Maestro'].currentDialogueIndex.story.i=1;
  changeGameState('inside', params2 )
  //HUD.setActivetab('Armas');
  //HUD.inicializaHUD();
  /*
  inventarioBtn = document.getElementsByClassName('inventario-btn')[0];
  let nuevoInventarioBtn = inventarioBtn.cloneNode(true);
  inventarioBtn.parentNode.replaceChild(nuevoInventarioBtn, inventarioBtn);
  nuevoInventarioBtn.addEventListener("click", () => HUD.abrirIventarioTutorial('Armas'));
  */

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
