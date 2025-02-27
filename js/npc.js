// js/NPC.js

/**
 * Clase que representa un NPC del juego.
 * @param {string|number} id - Identificador único.
 * @param {string} name - Nombre del NPC.
 * @param {Array} dialogues - Array de diálogos (pueden ser strings o objetos).
 * @param {string} dialogueType - Tipo de diálogo: "story" o "generic".
 */
class NPC {
  constructor(id, name, dialogues) {
    this.id = id;
    this.name = name;
    this.dialogues = dialogues; // Ej: [ "Hola, bienvenido", "¿Cómo estás?" ]
    // Índices para cada tipo de diálogo
    this.currentDialogueIndex = {
		beforeIndiceDialogos : 0,
      story: {i:0,j:0},
      generic: 0,
      quest: {}
    };
  }

	/**
   * getDialogue:
   * Devuelve el siguiente diálogo según el tipo.
   * @param {string} tipo - "story", "generic" o "quest".
   * @param {string} [questId] - ID de la quest, si tipo es "quest".
   * @returns {string} - El diálogo correspondiente.
   */
  getDialogue(tipo, questId){
	  let dialoguesArray, index, dialogue =''; 
	  switch(tipo ){
		  case 'quest':
			if(!questId){
				console.error("Se requiere questId para diálogos de quest.");
				return "";
			}
			if (this.currentDialogueIndex.quest[questId] === undefined) {
				this.currentDialogueIndex.quest[questId] = 0;
			}
			dialoguesArray = this.dialogues.quest[questId];
			if (!dialoguesArray) {
				console.error("No hay diálogos para la quest:", questId);
				return "";
			}
			index = this.currentDialogueIndex.quest[questId];
			dialogue = dialoguesArray[index];
			// Avanza el índice, o lo mantiene si ya se llegó al final.
			if (index < dialoguesArray.length - 1) {
				this.currentDialogueIndex.quest[questId]++;
			}
			break;
		case 'story':
			dialoguesArray = this.dialogues.story;
			index = this.currentDialogueIndex.story.i;
			//console.log("index = ", index);
			//console.log("current = ", this.currentDialogueIndex.beforeIndiceDialogos);
			//console.log("j = ", this.currentDialogueIndex.story.j);
			//console.log("array = ", dialoguesArray);
			if (index > this.currentDialogueIndex.beforeIndiceDialogos) {
				// Ya no quedan diálogos de story en este índice
				//console.log("Se ha terminado los dialogos en index. Cambiando current");
				this.currentDialogueIndex.story.j = 0;
				this.currentDialogueIndex.beforeIndiceDialogos = index;
			//console.log("Salgo con:");
				//console.log("index = ", index);
				//console.log("curren = ", this.currentDialogueIndex.beforeIndiceDialogos);
				//console.log("j = ", this.currentDialogueIndex.story.j);

				return null; // o podrías devolver un mensaje especial
			}
			dialogue = dialoguesArray[index][this.currentDialogueIndex.story.j];
			this.currentDialogueIndex.story.j++;
			if(this.currentDialogueIndex.story.j >= dialoguesArray[index].length ){
				this.currentDialogueIndex.story.i++;
				this.currentDialogueIndex.story.j = 0;
			}
				//console.log("Salgo con:");
				//console.log("index = ", index);
				//console.log("curren = ", this.currentDialogueIndex.beforeIndiceDialogos);
				//console.log("j = ", this.currentDialogueIndex.story.j);
				//this.currentDialogueIndex.beforeIndiceDialogos = this.currentDialogueIndex.story.i;
			break;
		case 'generic':
			dialoguesArray = this.dialogues.generic;
			index = this.currentDialogueIndex.generic;
			dialogue = dialoguesArray[index];
			// Para diálogos genéricos, podemos rotar continuamente.
			this.currentDialogueIndex.generic = (index + 1) % dialoguesArray.length;
			break;
		}
		return ("<strong>" + this.name + ":</strong> " + dialogue);
  }





  /**
   * getNextDialogue:
   * Devuelve el siguiente diálogo del NPC y avanza el índice.
   * Si se llega al final, se reinicia el índice (o se puede mantener en el último).
   * @returns {string|Object} - El diálogo actual.
   */
  getNextDialogue() {
    if (this.currentDialogueIndex >= this.dialogues.length) {
      this.currentDialogueIndex = 0; // Reinicia o ajusta según la lógica deseada
    }
    return this.dialogues[this.currentDialogueIndex++];
  }
  
  changeDialgoe(dialogues){
	  this.dialogues = dialogues;
	  this.currentDialogueIndex = {
		  story: 0,
		  generic: 0,
		  quest: {}
		};
  }

  /**
   * resetDialogue:
   * Reinicia el índice de diálogos.
   */
  resetDialogue() {
    this.currentDialogueIndex = {
      story: 0,
      generic: 0,
      quest: {}
    };
  }
}

// Hacer la clase accesible globalmente
window.NPC = NPC;
