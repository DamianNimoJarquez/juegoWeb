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
        showNextDialogue(centerPanel, npcActual, 'story', window.gameState.currentTutorialSecene);
    },
    1: (centerPanel) => {
        currentScreenIndex = window.gameState.currentTutorialSecene = 1;
        npcActual = window.gameState.npcs['Maestro'];
        centerPanel.style.backgroundImage = "url('assets/images/img1.png')";
        showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
    },
    2: (centerPanel) => {
		currentScreenIndex = window.gameState.currentTutorialSecene = 2;
		//window.gameState.currentTutorialSecene = 3;
		//cargar el mapa
        window.changeGameState('map', { tutorial: true });
    },
	3: (centerPanel) => {
		currentScreenIndex = window.gameState.currentTutorialSecene;
		npcActual = window.gameState.npcs['Maestro'];
		//se mostrará el diálogo para decir que va a enseñarle el interface
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	4: (centerPanel) =>{
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		//Se muestra el interface
		HUD.inicializaHUD();
		HUD.setActivetab('Armas');
		//se deshabilita el botón inventario para que no se pueda pulsar por ahora
		inventarioBtn = document.getElementsByClassName('inventario-btn')[0]
		inventarioBtn.disabled  = true;
		//se mostrarán los comentarios explicando los atributos
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
		//se indica que explicará como usar el inventario
	},
	5: (centerPanel) =>{
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		//mostrar diálogos
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	6: (centerPanel) =>{
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		//Limpiamos el pane
		centerPanel.innerHTML = ``;
		//habilitar el botón
		inventarioBtn = document.getElementsByClassName('inventario-btn')[0]
		inventarioBtn.disabled  = false;
		
	},
	7: (centerPanel) =>{
		currentScreenIndex = window.gameState.currentTutorialSecene;
		//showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex,true);
	},
	8: (centerPanel) =>{
		currentScreenIndex = window.gameState.currentTutorialSecene;
		//deshabilitar de nuevo inventario.
		inventarioBtn = document.getElementsByClassName('inventario-btn')[0]
		inventarioBtn.disabled  = true;
		//dialgo de atributos y objetos claves
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	9: (centerPanel) =>{
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		console.log("Estamos en 9");
		//Limpiamos el pane
		centerPanel.innerHTML = ``;
		HUD.inicializaHUD();
		HUD.setActivetab('Ojetos Claves');
		//objetos claves
	},
	10: (centerPanel) =>{
		currentScreenIndex = window.gameState.currentTutorialSecene;
		//mostrar texto usar objeto
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex,true);
	},
	
	
};

function mostrarMensajeSobreInventario(mensaje, callback) {
	// Crear un overlay para el mensaje (z-index mayor que el inventario, por ejemplo, 3500)
	const messageOverlay = document.createElement('div');
	messageOverlay.id = 'mensaje-inventario-overlay';
	messageOverlay.style.position = 'fixed';
	messageOverlay.style.top = '0';
	messageOverlay.style.left = '0';
	messageOverlay.style.width = '100vw';
	messageOverlay.style.height = '100vh';
	messageOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
	messageOverlay.style.zIndex = '3500';
	messageOverlay.style.display = 'flex';
	messageOverlay.style.justifyContent = 'center';
	messageOverlay.style.alignItems = 'center';
  
	// Crear el modal de mensaje
	const messageModal = document.createElement('div');
	messageModal.id = 'mensaje-inventario-modal';
	messageModal.innerHTML = `
	  <p>${mensaje}</p>
	  <div class="boton-container" style="text-align: center; margin-top: 10px;">
		<button id="mensaje-inventario-btn">Aceptar</button>
	  </div>
	`;
	// Opcional: Puedes mover la mayor parte de estos estilos al CSS
	messageModal.style.backgroundColor = '#fff';
	messageModal.style.padding = '20px';
	messageModal.style.borderRadius = '10px';
	messageModal.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  
	messageOverlay.appendChild(messageModal);
	document.body.appendChild(messageOverlay);
  
	// Al hacer clic en el botón, se elimina el overlay de mensaje
	document.getElementById('mensaje-inventario-btn').addEventListener('click', function() {
	  messageOverlay.remove();
	  if(callback) callback();
	});
  }
  
  function createNPCIntro(){
	  //Primero crear el npc narrador:
	  window.gameState.npcs['Narrador'] = new NPC(0,"Narrador",window.dialogues.narrador);
	  //creamos el npc del maestro;
	  window.gameState.npcs['Maestro'] = new NPC(0,"Maestro Hiroshi",window.dialogues.maestroTutorial1);
	  /*
		HAY Q QUITAR EL COMENTARIO DE ABAJO
	  */
	  //startTutorial(window.gameState.currentTutorialSecene);
	  
  }
  
  function startTutorial(scene){
	  centerPanel = document.getElementById('center-panel');
	  if (tutorialScenes[scene]) {
        tutorialScenes[scene](centerPanel);
	  } else {
			console.warn("Escena desconocida:", scene);
	  }
}
  function showNextDialogue(centerPanel, npcActual, type, scene, overModal){
	//console.log("Llamando a coger dialogo");
	  let dialogo = npcActual.getDialogue(type);
	  //console.log(dialogo);
	  if( dialogo != null){
		  //mientras haya diálgo los ponemos
		   html = `
			<div id="intro-master"  style=" background-color: rgb(90.2%, 90.2%, 90.2%, 0.9); padding: 20px;">
			${dialogo}
			  ${overModal? "": `<div class="boton-container" style="text-align: center; padding: 5px;">
				  <button id="next-screen-btn">Siguiente</button>
			  </div>`}
		    </div>
		  `;
		  if(overModal){
			mostrarMensajeSobreInventario(html, () => showNextDialogue(centerPanel, npcActual, type, scene,true));
		  }
		  else{
			centerPanel.innerHTML = html;
			document.getElementById('next-screen-btn').addEventListener('click',  () => showNextDialogue(centerPanel, npcActual, type, scene));
		  }
		  
	  }
	  else{
		  //el npc no tiene más diálogos de la historia, habría que continuar aquí
		  if(!overModal)
		  	startTutorial(scene+1)
	  }
}

  return {
	createNPCIntro: createNPCIntro,
	startTutorial: startTutorial
  };
})();
