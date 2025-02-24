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
		//aún está el tutorial activo
		window.changeGameState('tutorial');
	}
	else{
		
	}
}

return {
	loadCellContent: loadCellContent
};
	
})();