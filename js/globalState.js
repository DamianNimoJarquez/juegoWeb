// globalState.js
// Define un objeto global para almacenar el estado del juego
window.gameState = {
  map: [],          // Aquí se almacenará el modelo global del mapa (por ejemplo, gameMap)
  currentCellId: null, // La celda en la que se encuentra el jugador
  player: {
	name: null,
    level: 1,
    xp: 0,
	xpNextLevl: 100,
    attributes: {
      hp: 100,
	  hpMax: 100,
      mana: 50,
	  manaMax: 50,
      attack: 10,
      defense: 5,
      agility: 5,
      concentration: 5
    },
    coins: 0,
	inventory: [],       // Array para almacenar objetos (instancias de Item o sus subclases)
    equipment: {
      weapon: '',
      armor: '',
      accessory: ''
    },
	activeQuests: [
		// Array con las misiones activas y su progreso.
		// Ejemplo:
		// { id: "quest_001", description: "Consigue 10 hierbas", progress: 3, total: 10 }
	],
  
    // Otras propiedades del jugador...
  },
	npcs: {},
  
  // Otros estados globales (por ejemplo, progreso de la historia)
  currentScene: 'intro',  // Ejemplo: 'intro', 'tutorial', 'pueblo', etc.
  currentTutorialSecene: 0,
};
let tamMapa = 5;
// Inicializar el mapa con celdas vacías de prueba
	function initializeMap(rows, cols) {
		for (let i = 0; i < rows; i++) {
		let row = [];
			for (let j = 0; j < cols; j++) {
			  row.push(new Cell(`${i}-${j}`, "empty", "assets/images/celda.jpg"));
			}
		gameState.map.push(row);
		}
		iniciarPueblo();
		
	}

function iniciarPueblo(){
	//definir el pueblo. 0 tam/2
	gameState.map[0][Math.floor(tamMapa/2)].visited = true;
	gameState.map[0][Math.floor(tamMapa/2)].type = "town";
	gameState.map[0][Math.floor(tamMapa/2)].name = "Pueblo Inicial";
	gameState.map[0][Math.floor(tamMapa/2)].backgroundImage ="assets/images/img2.png";
	gameState.map[0][Math.floor(tamMapa/2)].events = window.Events["town"];
	//Añadir el contenido al pueblo
}

	// Llamar a la función al inicio
	initializeMap(tamMapa, tamMapa);
	//iniciarPueblo();