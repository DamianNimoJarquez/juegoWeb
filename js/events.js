// events.js
window.Events = {
  cell1: {
    tree: {
      description: "Un gran árbol cerca del arroyo.",
      content: { /* datos del puzzle */ },
      completed: false
    },
    // Otros eventos en la celda 1
  },
  // Otros eventos en otras celdas
  town: {
	  tutorial: {
		  tutorialunlockInventory :{
        description: "Desbloquea el inventario",
        content: {
          //Diálogos iniciales de cuando se activa el evento
          dialogos: [
            {
              type: "dialogue", content: "<p><strong>Maestro Hiroshi:</strong><p>Bienvenido al pueblo tal</p>"
            },
            {
              type: "waitclick", content: "Siguiente"
            },
            {
              type: "dialogue", content: "<p><strong>Maestro Hiroshi:</strong><p>Antes de nada permíteme una cosa...</p>"
            },
            {
              type: "waitclick", content: "Siguiente"
            },
            {
              type: "function", content: "inicializaHUD()"
            },
            {
              type: "dialogue", content: "<p><strong>Maestro Hiroshi:</strong><p>Ahora puedes consultar tus atributos abajo de la pantalla</p>"
            },
            {
              type: "waitclick", content: "Siguiente"
            },
           
          ],
        },
        complete: false
      },
      tutorialActivarSkill :{
        description: "Enseña a usar las skills"
        //Diálogos iniciales de cuando se activa el evento
      },
	  },
	  normal: {
		  
	  },
	  
  },
};