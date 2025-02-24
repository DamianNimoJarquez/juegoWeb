// intro.js
// Módulo que gestiona la narrativa de introducción

const Intro = (function() {
  let screens = [];
  let currentScreenIndex = 0;
  let previousScreenIndex = -1;
  let account;
  let imageLoaded = false;
  let centerPanel;
  let npcActual;
  
  function createNPCIntro(){
	  //Primero crear el npc narrador:
	  const narrador = new NPC(
		0,
		"Narrador",
		window.dialogues.narrador);
	  window.gameState.npcs['Narrador'] = narrador;
	  window.gameState.npcs['Maestro'] = new NPC(
	  0,
	  "Maestro Hiroshi",
	  window.dialogues.maestro);
	  startTutorial(0);
  }
  
  function startTutorial(scene){
	  centerPanel = document.getElementById('center-panel');
	  if(scene == 0){
		  currentScreenIndex = 0;
		  //llamamos al npc narrador primero para sus textos
		  npcActual = window.gameState.npcs['Narrador'];
		  showNextDialogue(centerPanel, npcActual, 'story', scene);
	  }
	  if(scene == 1){
		  //creamos el npc del maestro;
		  currentScreenIndex = 1;
		  npcActual = window.gameState.npcs['Maestro'];
		  //Imagen del Maestro
		  centerPanel.style.backgroundImage = "url('assets/images/img1.png')";
		  showNextDialogue(centerPanel, npcActual, 'story', scene);
	  }
	  if(scene == 2){
		  //cargamos el mapa
		  //document.getElementById('next-screen-btn').addEventListener('click',  () => showNextDialogue(centerPanel, npcActual, type, scene));
		  window.changeGameState('map', { tutorial: true });
	  }
}
  function showNextDialogue(centerPanel, npcActual, type, scene){
	  let dialogo = npcActual.getDialogue(type);
	  if( dialogo != null){
		  //mientras haya diálgo los ponemos
		  centerPanel.innerHTML = `
			<div id="intro-master"  style=" background-color: rgb(90.2%, 90.2%, 90.2%, 0.9); padding: 20px;">
			${dialogo}
			  <div class="boton-container" style="text-align: center;">
				  <button id="next-screen-btn">Siguiente</button>
			  </div>
		    </div>
		  `;
		  document.getElementById('next-screen-btn').addEventListener('click',  () => showNextDialogue(centerPanel, npcActual, type, scene));
	  }
	  else{
		  //el npc no tiene más diálogos de la historia, habría que continuar aquí
		  startTutorial(scene+1)
	  }
}


  /**
   * startIntro:
   * Inicia la introducción con el objeto de cuenta.
   * @param {Object} acc - Estado inicial de la partida.
   */
  function startIntro() {
    //account = acc;
    currentScreenIndex = 0;

    // Definición de las pantallas del tutorial
    screens = [
      {
        // Pantalla 1: Teleportación
        html: `
          <div id="dialogo-narrador" style="padding: 40px;">
            <p>De repente, todo se vuelve oscuro...</p>
            <p>Cuando recuperas la visión, te encuentras en un mundo completamente distinto: un Japón feudal con magia en cada rincón.</p>
			<div class="boton-container" style="text-align: center;">
				<button id="next-screen-btn">Siguiente</button>
		    </div>
          </div>
        `
      },
      {
        // Pantalla 2: El maestro aparece y habla en japonés.
        // Se carga la imagen de fondo del templo.
        html: `
          <div id="intro-master"  style=" background-color: rgb(90.2%, 90.2%, 90.2%, 0.9); padding: 20px;">
            <p><strong>Maestro Hiroshi (en japonés):</strong> こんにちは、旅人.</p>
            <div class="boton-container" style="text-align: center;">
				<button id="no-entender-btn">No entiendo, habla en castellano</button>
			</div>
          </div>
        `
      },
      {
        // Pantalla 3: Tras pulsar "No entiendo", el maestro cambia a castellano y presenta al loro.
        html: `
          <div id="intro-master"  style=" background-color: rgb(90.2%, 90.2%, 90.2%, 0.9); padding: 20px;">
            <p><strong>Maestro Hiroshi (ahora en castellano):</strong> Perdona, pensé que lo entenderías. Mira, este es Kiiro, mi pequeño loro que también habla castellano.</p>
            <div class="boton-container" style="text-align: center;">
				<button id="next-screen-btn">Siguiente</button>
			</div>
          </div>
        `
      },
      {
        // Pantalla 4: Instrucciones finales: el maestro anuncia su destino y ordena ir al pueblo.
        html: `
          <div id="intro-master"  style=" background-color: rgb(90.2%, 90.2%, 90.2%, 0.9); padding: 20px;">
            <p><strong>Maestro Hiroshi:</strong> Pronto enfrentarás al enemigo final y yo pereceré. Pero no temas, Kiiro te guiará.</p>
            <p>Ahora, debes dirigirte al pueblo para resguardarte. El pueblo se encuentra justo debajo de donde te encuentras.</p>
            <div class="boton-container" style="text-align: center;">
				<button id="go-to-town-btn">Ir al Pueblo</button>
			</div>
          </div>
        `
      }
    ];

    showCurrentScreen();
  }

  // Muestra la pantalla actual en el área central
  function showCurrentScreen() {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = screens[currentScreenIndex].html;
    attachButtonEvents();
  }

  // Asigna eventos a los botones de la pantalla actual
  function attachButtonEvents() {
    // Botón "Siguiente"
    const nextBtn = document.getElementById('next-screen-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentScreenIndex++;
		if(currentScreenIndex == 1 && !imageLoaded){
			document.getElementById('center-panel').style.backgroundImage = "url('assets/images/img1.png')";
			imageLoaded = true;
		}
        if (currentScreenIndex < screens.length) {
          showCurrentScreen();
        }
      });
    }
    // Botón "No entiendo, habla en castellano"
    const noEntenderBtn = document.getElementById('no-entender-btn');
    if (noEntenderBtn) {
      noEntenderBtn.addEventListener('click', function() {
        // Avanza a la pantalla de cambio a castellano
        currentScreenIndex++;
        showCurrentScreen();
      });
    }
    // Botón "Ir al Pueblo"
    const goTownBtn = document.getElementById('go-to-town-btn');
    if (goTownBtn) {
      goTownBtn.addEventListener('click', function() {
        // Se cambia al estado del mapa con parámetros para restringir a la celda del pueblo
        //window.changeGameState('map', { tutorial: true, townCell: { row: 2, col: 8 } });
		
		window.changeGameState('map', { tutorial: true });
      });
    }
  }

  return {
    startIntro: startIntro,
	createNPCIntro: createNPCIntro,
	startTutorial: startTutorial
  };
})();
