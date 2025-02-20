// map.js
// Este módulo gestiona la vista del mapa.
const Map = (function() {
  /**
   * loadWorldMap:
   * Carga la vista del mapa en el área central.
   * @param {Object} params - Parámetros adicionales, por ejemplo:
   *    { restricted: true, townCell: { row: 2, col: 8 } }
   */
  function loadWorldMap(params) {
    const centerPanel = document.getElementById('center-panel');
    // Se crea una vista del mapa con fondo de mapa (puede ser una imagen de fondo)
	document.getElementById('center-panel').style.backgroundImage = "url('assets/images/img3.png')";
    centerPanel.innerHTML = `
      <div id="intro-master" padding: 20px; style=" background-color: rgb(90.2%, 90.2%, 90.2%, 0.7); min-height: 300px;">
        <p>Mapa: Selecciona una celda para viajar rápido.</p>
        <div id="map-grid">
          <!-- Ejemplo: Generamos una cuadrícula 15x15, pero aquí mostraremos un ejemplo simple -->
          ${generateMapCells(params)}
        </div>
        ${params && params.restricted ? '' : '<button id="back-to-cell-btn">Volver a la celda</button>'}
      </div>
    `;
    attachMapCellEvents(params);
    // Si existe el botón "Volver a la celda", asignar su evento para volver al estado anterior.
    const backBtn = document.getElementById('back-to-cell-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        // Se llama a una función (a definir en otro módulo) para restaurar el estado de la celda actual
        // Por ahora, simulamos la acción con un alert.
        alert('Volviendo a la celda actual.');
        window.changeGameState('cell'); // Este estado se definiría en el módulo correspondiente.
      });
    }
  }
  
  /**
   * generateMapCells:
   * Genera el HTML para las celdas del mapa.
   * @param {Object} params - Parámetros de restricción.
   * @returns {string} - HTML de las celdas.
   */
  function generateMapCells(params) {
    let html = '';
    // Para simplificar, generamos una cuadrícula 3x3 de ejemplo.
    for (let i = 1; i <= 9; i++) {
      // Si hay restricción, solo la celda del pueblo (por ejemplo, celda 5) estará habilitada.
      let classes = 'map-cell';
      if (i === 5) classes += ' visited';
      if (params && params.restricted && i !== 5) {
        classes += ' disabled';
      }
      html += `<div class="${classes}" data-zone="${i}">Celda ${i}</div>`;
    }
    return html;
  }
  
  /**
   * attachMapCellEvents:
   * Asigna eventos a las celdas del mapa.
   * @param {Object} params - Parámetros de restricción.
   */
  function attachMapCellEvents(params) {
    const mapCells = document.querySelectorAll('.map-cell');
    mapCells.forEach(cell => {
      cell.addEventListener('click', function() {
        // Si el mapa está restringido, solo se permite seleccionar la celda designada (pueblo, en este ejemplo, celda 5)
        if (params && params.restricted) {
          if (cell.getAttribute('data-zone') === '5') {
            alert('Cargando el pueblo...');
            // Cambiar al estado "cell" con la celda del pueblo
            window.changeGameState('cell', { cellId: 'celda_5' });
          } else {
            alert('Solo puedes seleccionar el pueblo en este momento.');
          }
        } else {
          // En un mapa sin restricción, se permite seleccionar cualquier celda (para viaje rápido)
          if (cell.classList.contains('visited')) {
            alert('Viajando rápido a ' + cell.textContent);
            // Aquí se actualizaría la información contextual de la celda
          } else {
            alert('Esta zona no ha sido visitada. Explórala de forma normal.');
          }
        }
      });
    });
  }
  
  return {
    loadWorldMap: loadWorldMap
  };
})();
