// js/quests.js
// Clase abstract para cualquier objetivo:
class Objective {
    /**
     * @param {number} requiered - Cantidad requierida para completar el objetivo
     */
    constructor(requiered){
        this.requiered = requiered;
        this.progress = 0;
    }
    isComplete(){return this.progress >= this.requiered;}
    update(cantidad){this.progress += cantidad;}
}
// Clase para quest de hablar con NPCs
class DialogueObjective extends Objective{
    /**
     * @param {string} npcId - Identificador del npc con el que hay que hablar
     */
    constructor(npcId){
        super(1);//Sólo requiere 1 iteración, hablar con el npc, cuando se hable estaría completa.
        this.npcId = npcId;
    }
    // En lugar de update se marca como completada al hablar
    markComplete(){this.progress = this.requiered;}
}
//Clase para las quest de recolección de objetos
class CollectionObjective extends Objective{
    /**
     * @param {string} itemId - Identificador del item a recolectar
     * @param {number} required - Cantidad del objeto requerida
     */
    constructor(itemId, requiered){
        super(requiered);
        this.itemId = itemId;
    }
}
//Clase para las quest de matar enemigos
class KillObjective extends Objective {
    /**
     * @param {string} enemyId - Identificador del enemigo a matar
     * @param {number} requiered - Números de enemigos a matar
     */
    constructor(enemyId, requiered){
        super(requiered);
        this.enemyId = enemyId;
    }
}
//Clase para objetivos compuestos, agrupa varios objetivos simples
class CompositeObjective{
    /**
     * @param {Array<Objetcive>} objective - Array de objetivos (KillObjective, CollectionObjective, etc.)
     */
    constructor(objective = []){
        this.objective = objective;
    }
    isComplete(){return this.objective.every(obj => obj.isComplete());}
    /**
     * Actualizar el progreso de los objetivos que coincidan.
     * @param {Object} data - {type, id, cantidad}
     */
    update(data){
        this.objective.forEach(obj =>{
            switch(data.type){
                case 'kill':
                    if(obj instanceof KillObjective && obj.enemyId === data.id)
                        obj.update(data.cantidad);
                    break;
                case 'collection':
                    if(obj instanceof CollectionObjective && obj.itemId === data.id)
                        obj.update(data.cantidad);
                    break;
                case 'dialogue':
                    if(obj instanceof DialogueObjective && obj.npcId === data.id)
                        obj.markComplete();
                    break;
                default:
                    console.log('Tipo de mision incorrecto');
            }
        });
    }
}
//Clase para los pasos de misiones
class QuestStep{
    /**
     * @param {string} description - Descripción del paso
     * @param {Objective|CompositeObjective} objective - Objetivo o conjunto de objetivos para este paso.
     */
    constructor(description, objective){
        this.description = description;
        this.objective = objective;
        this.completed = false;
    }
    checkComplete(){return this.objective.isComplete();}
}

class Quest{
    /**
     * @param {string} id - Identificador de la misión.
     * @param {string} name - Nombre de la misión.
     * @param {string} description - Descripción completa.
     * @param {string} shortDesc - Descripción breve.
     * @param {string} type - Tipo de misión (por ejemplo, "Historia", "Secundaria").
     * @param {Object} requisitos - Requisitos para iniciar la misión.
     * @param {Array<QuestStep>} steps - Array de pasos (QuestStep).
     * @param {Object} reward - Recompensas al completar la misión.
     */
    constructor(id, name, description, shortDesc, type, requisitos, steps, reward){
        //Atributos
        this.id = id;
        this.name = name;
        this.description = description;
        this.shortDesc = shortDesc;
        this.type = type;
        this.requisitos = requisitos;
        this.steps = steps;
        this.currentStep = 0;
        this.reward = reward;
        //this.active = false;
        this.completed = false;
    }
    getCurrentStep(){return this.steps[this.currentStep];}
    completeQuest(){
        this.completed = true;
        //this.active = false;
        console.log('Mision completada: ', this.name);
    }
    advanceStep(){
        if(this.currentStep < this.steps.length -1)
            this.currentStep++;
        else
            this.completQuest();
    }
    updateProgress(data){
        const step = this.getCurrentStep();
        if(step && step.objective.update){
            step.objective.update(data);
            if(step.checkComplete())
                this.advanceStep();
        }
    }
    getDescription(){return this.description;}

    actualizarProgreso(id_objetivo, cantidad){
        //comprobar para la clase base
    }

    addQuestTree(){
        let listaQuestPanel = document.getElementById('missions-list');
        const newLi = document.createElement('li'); // Crear un nuevo elemento <li>
        newLi.classList.add('mission');
        newLi.classList.add(this.completed ? 'completed' : this.type);
        newLi.innerHTML = `
        <div class="mission-header">${this.name}</div>
        <div class="mission-short-desc">${this.steps[this.currentStep].description}</div>
        `;
        listaQuestPanel.appendChild(newLi);
    }
}
// Función factory para crear una Quest a partir de un objeto de datos
function crearQuest(datos) {
    const steps = datos.steps.map(stepData => {
      // Según el objectiveType, creamos la instancia adecuada de Objective
      let objective;
      switch(stepData.objectiveType){
        case 'dialogo':
            objective = new DialogueObjective(stepData.target);
            break;
        case 'multi':
            const objectivesArray = [];
            for (const key in stepData.objective) {
                const objData = stepData.objective[key];
                if (objData.type === "objeto")
                    objectivesArray.push(new CollectionObjective(key, objData.required));
                else 
                    if (objData.type === "enemigo")
                        objectivesArray.push(new KillObjective(key, objData.required));
            }
            objective = new CompositeObjective(objectivesArray);
            break;
        case 'objeto':
            objective = new CollectionObjective(stepData.target, stepData.required);
            break;
        case 'kill':
            objective = new KillObjective(stepData.target, stepData.required);
            break;
        default: 
            console.log('Fallo creando Quest');
      }
      // Creamos un QuestStep
      return new QuestStep(stepData.description, objective);
    });
  
    return new Quest(
      datos.id,
      datos.name,
      datos.description,
      datos.shortDesc,
      datos.type,
      datos.requisitos,
      steps,
      datos.reward
    );
  }

 // Ejemplo de datos para la misión "Pueblo Inicial"
const datosPuebloInicial = {
    id: 'story_01',
    name: 'Pueblo Inicial',
    description: 'Familiarizarse con el pueblo',
    shortDesc: 'Sigue las instrucciones del Maestro',
    type: 'main',
    requisitos: { level: 1, fuerza: null, defense: null, agility: null, concentration: null },
    steps: [
      { objectiveType: "dialogo", target: "id_npcA", description: "Habla con NPC_A" },//paso 1
      { objectiveType: "dialogo", target: "id_npcB", description: "Habla con NPC_B" },//paso 2
      { objectiveType: "dialogo", target: "id_npcC", description: "Habla con NPC_C" },//paso 3
      { objectiveType: "objeto", target: "id_objeto1", required: 1, description: "Consigue 1 poción roja"},
      { objectiveType: "multi",//paso 4
        description: "Recolecta 5 objetos A y 5 objetos B",
        objective: {
          "id_Objeto1": { required: 5, type: "objeto" },
          "id_Objeto2": { required: 5, type: "objeto" }
        }
      },
      { objectiveType: "multi",//paso 5
        description: "Derrota 5 enemigos y recolecta 5 objetos",
        objective: {
          "id_enemigo1": { required: 5, type: "enemigo" },
          "id_Objeto2": { required: 5, type: "objeto" }
        }
      }
    ],
    reward: { xp: 50, coin: 100 }
  }; 


window.questList ={
    story:{
        story_01: crearQuest(datosPuebloInicial)
    },
    side:{

    }
};