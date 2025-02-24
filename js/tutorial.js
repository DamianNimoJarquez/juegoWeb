// tutorial.js
// Módulo que gestiona la narrativa de introducción

const Tutorial = (function() {
  let screens = [];
  let currentScreenIndex = 0;
  let previousScreenIndex = -1;
  let account;
  let imageLoaded = false;
  let centerPanel;
  let npcActual;
  const tutorialScenes = {
    0: (centerPanel) => {
        npcActual = window.gameState.npcs['Narrador'];
        showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
    },
    1: (centerPanel) => {
        currentScreenIndex = window.gameState.currentTutorialSecene = 1;
        npcActual = window.gameState.npcs['Maestro'];
        centerPanel.style.backgroundImage = "url('assets/images/img1.png')";
        showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
    },
    2: () => {
		currentScreenIndex = window.gameState.currentTutorialSecene = 2;
		//cambiar diálogos al Maestro
		window.gameState.npcs['Maestro'].changeDialgoe(window.dialogues.maestroTutorial2);
		//window.gameState.currentTutorialSecene = 3;
		//cargar el mapa
        window.changeGameState('map', { tutorial: true });
    },
	3: () => {
		currentScreenIndex = window.gameState.currentTutorialSecene = 3;
		npcActual = window.gameState.npcs['Maestro'];
		//Activar Eventos:
		//showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	
};
  
  function createNPCIntro(){
	  //Primero crear el npc narrador:
	  window.gameState.npcs['Narrador'] = new NPC(0,"Narrador",window.dialogues.narrador);
	  //creamos el npc del maestro;
	  window.gameState.npcs['Maestro'] = new NPC(0,"Maestro Hiroshi",window.dialogues.maestroTutorial1);
	  startTutorial(window.gameState.currentTutorialSecene);
  }
  
  function startTutorial(scene){
	  centerPanel = document.getElementById('center-panel');
	  if (tutorialScenes[scene]) {
        tutorialScenes[scene](centerPanel);
	  } else {
			console.warn("Escena desconocida:", scene);
	  }
}
  function showNextDialogue(centerPanel, npcActual, type, scene){
	  let dialogo = npcActual.getDialogue(type);
	  if( dialogo != null){
		  //mientras haya diálgo los ponemos
		  centerPanel.innerHTML = `
			<div id="intro-master"  style=" background-color: rgb(90.2%, 90.2%, 90.2%, 0.9); padding: 20px;">
			${dialogo}
			  <div class="boton-container" style="text-align: center; padding: 5px;">
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

  return {
	createNPCIntro: createNPCIntro,
	startTutorial: startTutorial
  };
})();
