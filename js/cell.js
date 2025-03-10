// js/Cell.js
// Clase que representa una celda del mapa.
class Cell {
  /**
   * Crea una nueva celda.
   * @param {number} id - Identificador único de la celda.
   * @param {string} backgroundImage - Ruta de la imagen de fondo para la celda.
   * @param {string} [type='normal'] - Tipo de celda ('normal', 'town', etc.).
   */
  constructor(id, backgroundImage, type = 'normal', name = '', levelEnemys = '1-3') {
    this.id = id;
	this.name = name;
    this.visited = false;
    this.backgroundImage = backgroundImage;
    this.type = type; // 'normal', 'town', etc.
    this.content = {}; // Aquí se almacenarán datos adicionales (tiendas, puntos de guardado, etc.)
    this.events = {};
    this.levelEnemys = levelEnemys;
  }
  
  /**
   * Genera el HTML para mostrar la celda en el mapa.
   * @param {boolean} tutorial - Si true, solo se habilitará la celda del pueblo.
   * @returns {string} - HTML de la celda.
   */
	generateHTML(tutorial) {
		let classes = 'map-cell';
		if (this.visited) {
		  classes += ' visited';
		}
		if (tutorial && this.type !== 'town') {
		  classes += ' disabled';
		}
		return `<div class="${classes}" data-cell-id="${this.id}" data-type="${this.type}">
				  <span>${this.type === 'town' ? 'Pueblo' : `Celda ${this.id}`}</span>
				</div>`;
  }
  updateTopPanel(){
    let topPanel = document.getElementById('top-info');
    const [minLevel, maxLevel] = this.levelEnemys.split('-').map(Number);
    let status, difference;
    const umbralMenor = 5; // el enemigo es 5 niveles o más por encima del nivel del usuario
    const umbralMayor = 5; // El jugador es 5 niveles mayor que los enemigos de la zona
    if(minLevel === 0 && !maxLevel){
      status = 'Zona segura';
    }
    else if (window.gameState.player.level + umbralMenor < minLevel) {
        status = 'Zona extremadamente peligrosa';
    } else if (window.gameState.player.level < minLevel) {
        status = 'Zona peligrosa';
    } else if (window.gameState.player.level > maxLevel + umbralMayor) {
        status = 'Zona trivial';
    } else if (window.gameState.player.level > maxLevel) {
        status = 'Zona fácil';
    } else {
        status = 'Zona equilibrada';
    }
    topPanel.innerHTML = `
              <span id="zone-name">Zona: ${this.name}</span> | 
              <span id="zone-level">Nivel de Zona: (${this.levelEnemys}) ${status}</span> | 
              <span id="player-level">Tu Nivel: ${window.gameState.player.level}</span>
    `;

  }
};

// Hacemos la clase accesible globalmente
window.Cell = Cell;
