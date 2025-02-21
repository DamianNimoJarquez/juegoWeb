// globalState.js
// Define un objeto global para almacenar el estado del juego
window.gameState = {
  map: [],          // Aquí se almacenará el modelo global del mapa (por ejemplo, gameMap)
  currentCellId: null, // La celda en la que se encuentra el jugador
  player: {
    level: 1,
    xp: 0,
    attributes: {
      hp: 100,
      mana: 50,
      attack: 10,
      defense: 5,
      agility: 5,
      concentration: 5
    },
    coins: 0,
    // Otras propiedades del jugador...
  },
  
  // Otros estados globales (por ejemplo, progreso de la historia)
  
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
		//definir el pueblo. 0 tam/2
		gameState.map[0][Math.floor(tamMapa/2)].visited = true;
		gameState.map[0][Math.floor(tamMapa/2)].type = "town";
		gameState.map[0][Math.floor(tamMapa/2)].backgroundImage ="assets/images/img2.png";
	}

function iniciarPueblo(){
	//definir el pueblo. 0 tam/2
	gameState.map[0][tamMapa/2].visited = true;
	gameState.map[0][tamMapa/2].type = "town";
	gameState.map[0][tamMapa/2].backgroundImage ="assets/images/img2.png";
	//console.log(gameState.map);
	//console.log(gameState.map[0][5]);
}

	// Llamar a la función al inicio
	initializeMap(tamMapa, tamMapa);
	//iniciarPueblo();