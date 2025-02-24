// events.js
window.events = {
  cell1: {
    tree: {
      description: "Un gran árbol cerca del arroyo.",
      content: { /* datos del puzzle */ },
      completed: false
    },
    // Otros eventos en la celda 1
  },
  // Otros eventos en otras celdas
  tutorialunlockInventory :{
	  description: "Desbloquea el inventario",
	  content: {
		  //Diálogos iniciales de cuando se activa el evento
		  dialogos: [
			"<p>Bienvenido al pueblo tal</p> <p>Antes de nada permíteme una cosa...</p>"
		  ],
	  },
	  complete: false
  },
  town: {
	  tutorial: {
		  
	  },
	  normal: {
		  
	  },
	  
  },
};
