
class Skill{
    constructor(id, name, description, type){
        //Atributos
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.active = false;
    }
    getDescription(){
        return this.description;
      }
      
}
function crearSkill(id) {
    const skill_ = window.skillList[id];
    if (!skill_) {
      console.error(`No se encontró skillList con id "${id}".`);
      return null;
    }
    return new Skill(skill_.id, skill_.name, skill_.description, skill_.type);
}

window.crearSkill = crearSkill;

window.skillList ={
    furigana:{
        id: "furigana",
        name: "Furigana",
        description: "Permite ver furigana en los kanjis",
        type: "Pasiva"
    },

};
