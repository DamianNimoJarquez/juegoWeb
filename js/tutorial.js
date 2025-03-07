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
    1: (centerPanel) => {console.log("1");
        currentScreenIndex = window.gameState.currentTutorialSecene = 1;
        npcActual = window.gameState.npcs['Maestro'];
        centerPanel.style.backgroundImage = "url('assets/images/img1.png')";
        showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
    },
    2: (centerPanel) => {console.log("2");
		currentScreenIndex = window.gameState.currentTutorialSecene = 2;
		//window.gameState.currentTutorialSecene = 3;
		//cargar el mapa
        window.changeGameState('map', { tutorial: true });
    },
	3: (centerPanel) => {//Empieza el tutorial en el pueblo
		currentScreenIndex = window.gameState.currentTutorialSecene;
		npcActual = window.gameState.npcs['Maestro'];
		//se mostrará el diálogo para decir que va a enseñarle el interface
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	4: (centerPanel) =>{//Se muestra el interfaz y tutorial de atributos
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		//Se muestra el interface
		mostrarInterfaceTutorial('Armas');
		//se deshabilita el botón inventario para que no se pueda pulsar por ahora
		deshabilitarInventario(true);
		//se mostrarán los comentarios explicando los atributos
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
		//se indica que explicará como usar el inventario
	},
	5: (centerPanel) =>{//se pide q abra el inventario
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		//mostrar diálogos
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	6: (centerPanel) =>{//se limpia el interface y se habilita el botón del inventario
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		//Limpiamos el pane
		centerPanel.innerHTML = ``;
		//habilitar el botón
		deshabilitarInventario(false);
		
	},
	7: (centerPanel) =>{//se muestra el tutorial sobre el interface del inventario
		currentScreenIndex = window.gameState.currentTutorialSecene;
		//showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex,true);
	},
	8: (centerPanel) =>{//Se explica los beneficios de equipar el item
		currentScreenIndex = window.gameState.currentTutorialSecene;
		//deshabilitar de nuevo inventario.
		deshabilitarInventario(true);
		//dialgo de atributos y objetos claves
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	9: (centerPanel) =>{//Se habilita el inventario de nuevo para que lo abra con objetos claves
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		console.log("Estamos en 9");
		//Limpiamos el pane
		centerPanel.innerHTML = ``;
		//objetos claves
		mostrarInterfaceTutorial('Ojetos Claves');
	},
	10: (centerPanel) =>{//se muestra el texto sobre el inventario
		currentScreenIndex = window.gameState.currentTutorialSecene;
		//mostrar texto usar objeto
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex,true);
	},
	11: (centerPanel) =>{//se muestra el interfaz de habilidades y se explican
		currentScreenIndex = window.gameState.currentTutorialSecene;
		//deshabilitar de nuevo inventario.
		deshabilitarInventario(true);
		//Crear el panel de habilidades
		document.getElementById("left-panel").insertAdjacentHTML("afterbegin", "<h3>Habilidades</h3>");
		//deshabilitar las skills
		const listaSkillsPanel = document.querySelector('.abilities-list');
		listaSkillsPanel.classList.add('disabled');
		//listaSkillsPanel.classList.remove('disabled'); habilitarlo
		//diálogo habilidades:
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	12: (centerPanel) =>{ // equipar hablidad
		const listaSkillsPanel = document.querySelector('.abilities-list');
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		//Limpiamos el pane
		centerPanel.innerHTML = ``;
		//cambiar el listener de la skill para cambiar de escena
		const skillElements = listaSkillsPanel.querySelectorAll('.ability');
		skillElements.forEach(skill => {
			// Remover el listener anterior si existía
			skill.removeEventListener('click', cambiarEscenaListener);
			// Añadir el listener directamente, sin envolverlo en otra función
			skill.addEventListener('click', cambiarEscenaListener);
		});
		//habilitar el panel de skills
		listaSkillsPanel.classList.remove('disabled');
	},
	13: (centerPanel) =>{
		currentScreenIndex = window.gameState.currentTutorialSecene;
		const listaSkillsPanel = document.querySelector('.abilities-list');
		//deshabilitar de nuevo el panel de skills
		listaSkillsPanel.classList.add('disabled');
		//cambiar el listener de nuevo:
		// Eliminar el listener de la acción que cambia la escena
		listaSkillsPanel.querySelectorAll('.ability').forEach(skill => {
			// Eliminar el listener anterior
			skill.removeEventListener('click', cambiarEscenaListener);
		});
		listaSkillsPanel.querySelectorAll('.ability').forEach(skill => {
			// Añadir el listener que maneja el cambio de habilidad (equipada / no equipada)
			skill.dataset.equipped = 'true';

			skill.addEventListener('click', toggleEquiparHabilidad);
		});
		//mostrar diálogos misiones
		showNextDialogue(centerPanel, npcActual, 'story', currentScreenIndex);
	},
	14: (centerPanel) =>{
		currentScreenIndex = ++window.gameState.currentTutorialSecene;
		//Limpiamos el pane
		centerPanel.innerHTML = ``;
		console.log('en 14');
	},
	
	
};
// Función que alterna entre equipada / no equipada
function toggleEquiparHabilidad(event) {
    const skill = event.target;
    const isEquipped = skill.dataset.equipped === 'true'; // Comprueba si está equipada
    skill.dataset.equipped = isEquipped ? 'false' : 'true'; // Alterna el estado de equipado
    // Actualiza las clases según el nuevo estado
    skill.classList.toggle('equipped', !isEquipped); // 'equipped' es la clase para habilidades equipadas
    skill.classList.toggle('locked', isEquipped); // 'locked' es la clase para habilidades no equipadas
}
// Este es el listener que solo cambiará de escena una vez
function cambiarEscenaListener(event) {
    const skill = event.currentTarget; // o event.target, según convenga
    // Alternar estado, cambiar escena, etc.
    window.gameState.currentTutorialSecene++;
    tutorialScenes[window.gameState.currentTutorialSecene](centerPanel);
    // Y eliminar el listener para que se ejecute solo una vez, si es lo deseado
    skill.removeEventListener('click', cambiarEscenaListener);
}

function deshabilitarInventario(value){
	//deshabilitar de nuevo inventario.
	inventarioBtn = document.getElementsByClassName('inventario-btn')[0]
	inventarioBtn.disabled  = value;
}
function mostrarInterfaceTutorial(categoria){
	HUD.inicializaHUD();
	HUD.setActivetab(categoria);
}

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
