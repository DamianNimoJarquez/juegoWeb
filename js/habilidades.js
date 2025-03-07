
class Skill{
    constructor(id, name, description, shortDesc, type, requisitos){
        //Atributos
        this.id = id;
        this.name = name;
        this.description = description;
        this.shortDesc = shortDesc;
        this.type = type;
        this.requisitos = requisitos;
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
    return new Skill(skill_.id, skill_.name, skill_.description, skill_.shortDesc, skill_.type, skill_.requisitos);
}

function addSkill(skill){
    //comprobar que si ya tiene la skill
    const skills = window.gameState.player.skills;
    if(skills[skill.id]){
        console.log("SKill ya estaba aprendida");
    }
    else{
        //si no la tiene se añade
        skills[skill.id] = skill;
        //Comprobar si la skill estaría o no desbloqueada:
        skill.active = desblquear(skill);
        addSkillTree(skill);
        console.log("Skill Agregada");
    }
}
function addSkillTree(skill){
    listaSkillsPanel = document.getElementsByClassName('abilities-list')[0];
    const newLi = document.createElement('li'); // Crear un nuevo elemento <li>
    newLi.classList.add('ability');
    newLi.classList.add(skill.active ? 'unlocked' : 'locked');
    if(skill.active) newLi.classList.add('activated');
    // Generamos el contenido del tooltip.
    // Usamos la descripción corta para la vista principal.
    let tooltipContent = skill.description || skill.shortDesc;
    // Si la habilidad está bloqueada, añadimos la sección de requisitos.
    if(!skill.active){
        tooltipContent += `<br><strong>Requisitos:</strong><br>`;
        // Iteramos sobre las propiedades de skill.requisitos y mostramos sólo las que no sean null.
        for (const [clave, valor] of Object.entries(skill.requisitos)) 
            if (valor != null) 
                tooltipContent += `${clave}: ${valor}<br>`;
    }
    newLi.innerHTML = `
      <div class="ability-header">${skill.name}</div>
      <div class="ability-short-desc">${skill.shortDesc}</div>
      <div class="ability-tooltip">${tooltipContent}</div>
    `;
    // Aquí puedes agregar un event listener para seleccionar la habilidad, etc.
    listaSkillsPanel.appendChild(newLi);
}
function desblquear(skill){
    player = window.gameState.player;
    // Recorremos cada requisito (clave y valor) del objeto de requisitos
    for (const [key, valorRequerido] of Object.entries(skill.requisitos)) {
        // Si el requisito no es null o undefined, lo comparamos
        if (valorRequerido != null) { // != null comprueba tanto null como undefined
            // Suponemos que el requisito "level" está en player.level
            if (key === 'level') {
                if (player.level < valorRequerido) return false;
            } else {
                // Para el resto, asumimos que los atributos están en player.attributes
                // Si el atributo no existe o no alcanza el requisito, retornamos false
                if (!player.attributes.hasOwnProperty(key) || player.attributes[key] < valorRequerido) {
                return false;
                }
            }
        }
    }
    return true;
}

window.crearSkill = crearSkill;
window.addSkill = addSkill;

window.skillList ={
    furigana:{
        id: "furigana",
        name: "Furigana",
        description: "Permite ver furigana en los kanjis",
        shortDesc: "Ver Furigana",
        type: "Pasiva",
        requisitos: {level: 1, fuerza: null, defense: null, agility: null, concentration: null}
    },

};
