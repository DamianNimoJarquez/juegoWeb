// js/quests.js
class Quest{
    constructor(id, name, description, shortDesc, type, requisitos){
        //Atributos
        this.id = id;
        this.name = name;
        this.description = description;
        this.shortDesc = shortDesc;
        this.type = type;
        this.requisitos = requisitos;
        this.active = false;
        this.steps = 0;
        this.currentStep = 0;
        this.objetivo = {};
        this.reward = {};
    }
    getDescription(){return this.description;}
}


window.questList ={
    story:{
        story_01:{
            id: 'story_01',
            name: 'Pueblo Inicial',
            description: 'Familiarizarse con el pueblo',
            shortDesc: 'Sigue las instrucciones del Maestro',
            type: 'Historia',
            requisitos: {level: 1, fuerza: null, defense: null, agility: null, concentration: null},
            steps:[
                {objectiveType: "dialogo", target: "id_npcA", progress: 0, completed: false},
                {objectiveType: "dialogo", target: "id_npcB", progress: 0, completed: false},
                {objectiveType: "dialogo", target: "id_npcC", progress: 0, completed: false},
                {objectiveType: "multi",
                    objetives:{"id_Objeto1": {required: 5, type: "objeto"}, "id_Objeto2": {required: 5, type: "objeto"},},
                    progress: {"id_Objeto1": 0, "id_Objeto2": 0,},//aquí se debería comprobar los que tiene el jugador al crearse la quest
                    completed: false
                },
                {objectiveType: "multi",
                    objetives:{"id_enemigo1": {required: 5, type: "enemigo"}, "id_Objeto2": {required: 5, type: "objeto"},},
                    progress: {"id_enemigo1": 0, "id_Objeto2": 0,},
                    completed: false
                }
            ],
            reward:{
                xp: 50,
                coin: 100,
            }
        }
    },
    side:{

    }
};