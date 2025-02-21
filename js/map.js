// js/map.js
// Este módulo gestiona la vista del mapa y utiliza window.gameState.map,
// que se inicializa con instancias de la clase Cell.

const Map = (function() {
	function kk(){
		console.log("kk");
	}
/**
 * loadWorldMap:
 * Carga la vista del mapa en el panel central.
 * @param {Object} params - Parámetros adicionales, por ejemplo:
 *    { restricted: true } indica que solo se permite seleccionar la celda del pueblo.
 */
function loadWorldMap(params) {
  // Inicializar el mapa si no existe en el estado global.
  if (!window.gameState.map) {
	  globalState.initializeMap(globalState.tamMapa, globalState.tamMapa);
  }
  const centerPanel = document.getElementById('center-panel');

  // Establecer el fondo del panel central (imagen general del mapa)
  centerPanel.style.backgroundImage = "url('assets/images/mapa.png')";
  centerPanel.style.backgroundSize = "cover";
  centerPanel.style.backgroundPosition = "center";
  
  // Generar el HTML del mapa usando el modelo global
  let html = `<div id="world-map-view" style=" background-color: rgb(90.2%, 90.2%, 90.2%, 0.9); padding: 20px;">
                <p>Mapa: Selecciona una celda para viajar rápido.</p>
                <div id="map-grid" style="--cols: ${window.gameState.map.length};">`;
  window.gameState.map.forEach(cell => {
	  cell.forEach(casilla =>{
		html += casilla.generateHTML(params && params.restricted);
	  });
  });
  html += `</div>`;
  // Si no estamos en modo restringido, mostramos el botón "Volver a la celda"
  if (!params || !params.restricted) {
    html += `<button id="back-to-cell-btn">Volver a la celda</button>`;
  }
  html += `</div>`;
  
  centerPanel.innerHTML = html;
  
  attachMapCellEvents(params);
  
  // Asignar el evento al botón "Volver a la celda" si existe.
  const backBtn = document.getElementById('back-to-cell-btn');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      alert('Volviendo a la celda actual.');
      window.changeGameState('inside', { cellId: window.gameState.currentCellId });
    });
  }
}

/**
 * attachMapCellEvents:
 * Asigna eventos de clic a cada celda generada.
 * @param {Object} params - Parámetros adicionales.
 */
function attachMapCellEvents(params) {
  const mapCells = document.querySelectorAll('.map-cell');
  mapCells.forEach(cellElem => {
    cellElem.addEventListener('click', function() {
      const cellId = parseInt(cellElem.getAttribute('data-cell-id'));
      // Si está en modo restringido, solo se permite la celda del pueblo.
      if (params && params.restricted) {
        if (cellId === 5) { // En este ejemplo, la celda con id 5 es la del pueblo.
          alert('Cargando la celda del Pueblo...');
          window.gameState.currentCellId = cellId;
          window.changeGameState('inside', { cellId: cellId });
        } else {
          alert('Solo puedes seleccionar la celda del pueblo en este momento.');
        }
      } else {
        // En modo normal, si la celda fue visitada, se permite viajar rápido.
        if (cellElem.classList.contains('visited')) {
          alert('Viajando rápido a la celda ' + cellId);
          window.gameState.currentCellId = cellId;
          window.changeGameState('cell', { cellId: cellId });
        } else {
          alert('Esta celda no ha sido visitada aún. Explora la zona para desbloquearla.');
        }
      }
    });
  });
}
// Exponer las funciones del módulo Map para que otros módulos puedan llamarlas.

return {
    loadWorldMap: loadWorldMap
  };
})();

