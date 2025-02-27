// js/casillas.js
// aquí se cargará el contenido de la celda.

const Casilla = (function() {

/**
 * loadCellContent:
 * Carga el contenido de la celda en el panel central.
 * @param {Object} params - Parámetros adicionales, :
 *    { cellId: Ide de lacelda } indica que solo se permite seleccionar la celda del pueblo.
 */
function loadCellContent(params){
	//cogemos la celda:
	let [row, col] = params.cellId.split('-').map(Number);
	let casilla_ = window.gameState.map[row][col];
	//Cargar imagen de la casilla.
	loadCellImage(casilla_);
	//cargar eventos de la casillla.
	loadCellEvents(casilla_, params)
}

function loadCellImage(casilla_){
	const centerPanel = document.getElementById('center-panel');
	// Establecer el fondo del panel central 
	centerPanel.style.backgroundImage = "url('" + casilla_.backgroundImage +"')";
	centerPanel.style.backgroundSize = "cover";
	centerPanel.style.backgroundPosition = "center";
	centerPanel.innerHTML = ``;
}

function loadCellEvents(casilla_, params){
	//Comprobar si aún estamos en el tutorial
	if (params && params.tutorial){
		window.gameState.currentTutorialSecene = 3
		console.log("Cambiando");
		Tutorial.startTutorial(3);
		/*
		loardTutorialEscen(casilla_);
		let tutorialEvent = casilla_.events["tutorial"];
		console.log(tutorialEvent);
		const keys = Object.keys(tutorialEvent);
		console.log("Tamaño del objeto: ", keys.length);
		*/
	}
	else{
		
	}
}
function loardTutorialEscen(casilla_){
	//aún está el tutorial activo Cogemos los eventos del tutorial
	let tutorialEvent = casilla_.events["tutorial"];
	console.log(window.gameState.currentTutorialSecene);
	//Comprobar por cuál tutorial vamos.
	switch(window.gameState.currentTutorialSecene){
		case 2: //Tutorial de: Guardar partida -> abir inventarios -> habilidades -> equipo -> combate
			//Tutorial abrir inventario y usar objeto:
			let tutorialunlockInventory = tutorialEvent.tutorialunlockInventory;
			procesarEventoText(tutorialunlockInventory.content);

			//Tutorial guardar partida:

		break;
	}
}
// Función para procesar el evento de forma asíncrona
function procesarEventoText(evento, callback) {
	let indice = 0;
  
	function procesarAccion() {
	  if (indice >= evento.dialogos.length) {
		// Final del evento, llamar al callback (por ejemplo, cambiar de escena)
		if (callback) callback();
		return;
	  }
	  const accion = evento.dialogos[indice];
	  const centerPanel = document.getElementById('center-panel');
	  switch(accion.type){
		case "dialogue":
			centerPanel.innerHTML = `
			<div id="dialogoTutorial" style="padding:20px; background: rgba(230,230,230,0.9);">
				${accion.content}
			</div>
			`;
			indice++;
			// Procesar la siguiente acción de forma inmediata
			procesarAccion();
			break;
		case "waitclick":
			const dialogoTutorial = document.getElementById('dialogoTutorial');
			dialogoTutorial.innerHTML += `
				<div class="boton-container" style="text-align: center; padding: 5px;">
				<button id="evento-next-btn">${accion.content}</button>
				</div>
			</div>
			`;
			document.getElementById('evento-next-btn').addEventListener('click', function() {
			indice++;
			procesarAccion();});
			break;
		case "function":
			//limpiar html
			centerPanel.innerHTML = ``; 
			HUD.inicializaHUD();
			break;
	  };
	  
	}
	procesarAccion();
}

return {
	loadCellContent: loadCellContent
};
	
})();