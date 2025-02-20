// map.js
// Este módulo se encarga de cargar y gestionar la vista del mapa

const Map = (function() {
  // Carga la vista del mapa en el área central
  function loadWorldMap() {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = `
      <div id="world-map-view">
        <p>Mapa: Selecciona una celda ya visitada para viajar rápido.</p>
        <div id="map-grid">
          <div class="map-cell visited" data-zone="1">Celda 1</div>
          <div class="map-cell visited" data-zone="2">Celda 2</div>
          <div class="map-cell" data-zone="3">Celda 3</div>
          <!-- Más celdas... -->
        </div>
      </div>
    `;
    // Asignar eventos a las celdas del mapa
    const mapCells = document.querySelectorAll('.map-cell');
    mapCells.forEach(cell => {
      cell.addEventListener('click', function() {
        if (cell.classList.contains('visited')) {
          alert('Viaje rápido a ' + cell.textContent);
          // Aquí se actualizaría la información contextual de la zona
        } else {
          alert('Zona no visitada. Debes explorarla de forma normal.');
        }
      });
    });
  }
  
  return {
    loadWorldMap: loadWorldMap
  };
})();
