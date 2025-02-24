// js/Cell.js
// Clase que representa una celda del mapa.
class Cell {
  /**
   * Crea una nueva celda.
   * @param {number} id - Identificador único de la celda.
   * @param {string} backgroundImage - Ruta de la imagen de fondo para la celda.
   * @param {string} [type='normal'] - Tipo de celda ('normal', 'town', etc.).
   */
  constructor(id, backgroundImage, type = 'normal', name = '') {
    this.id = id;
	this.name = name;
    this.visited = false;
    this.backgroundImage = backgroundImage;
    this.type = type; // 'normal', 'town', etc.
    this.content = {}; // Aquí se almacenarán datos adicionales (tiendas, puntos de guardado, etc.)
    this.events = {};
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
};

// Hacemos la clase accesible globalmente
window.Cell = Cell;
