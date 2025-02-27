// js/Item.js

/**
 * Clase base para todos los objetos del juego.
 * @param {string} id - Identificador único del objeto.
 * @param {string} name - Nombre del objeto.
 * @param {string} type - Tipo de objeto ('weapon', 'armor', 'consumable', etc.).
 * @param {number} priceBuy - Precio de compra.
 * @param {number} priceSell - Precio de venta.
 */
class Item {
  constructor(id, name, type, priceBuy, priceSell, info) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.priceBuy = priceBuy;
    this.priceSell = priceSell;
    this.info = info;
    this.equiped = false;
    this.func = null;
  }

  getInfo(){
    return this.info;
  }

  getDescription() {
    return `${this.name} (${this.type}) - Compra: ${this.priceBuy}, Venta: ${this.priceSell}`;
  }
}

/**
 * Clase para representar armas.
 * @param {number} atk - Valor de ataque de la arma.
 */
class Weapon extends Item {
  constructor(id, name, priceBuy, priceSell, atk, info) {
    super(id, name, 'Armas', priceBuy, priceSell, info);
    this.atk = atk;
  }

  getDescription() {
    return `${super.getDescription()}, ATK: ${this.atk}`;
  }
}

/**
 * Clase para representar armaduras.
 * @param {number} def - Valor de defensa de la armadura.
 */
class Armor extends Item {
  constructor(id, name, priceBuy, priceSell, def, info) {
    super(id, name, 'Armaduras', priceBuy, priceSell, info);
    this.def = def;
  }

  getDescription() {
    return `${super.getDescription()}, DEF: ${this.def}`;
  }
}

/**
 * Clase para representar Accesorios.
 * @param {number} value - Valor de defensa de la armadura o de ataque o los dos, value.def y value.atk
 */
class Accessory extends Item {
  constructor(id, name, priceBuy, priceSell, value, info) {
    super(id, name, 'Accesorios', priceBuy, priceSell, info);
    this.def = value.def;
    this.atk = value.atk;
  }

  getDescription() {
    return `${super.getDescription()}, DEF: + ${this.def}, ATK: + ${this.atk}`;
  }
}

/**
 * Clase para representar consumibles.
 * @param {number} hpRecovered - Cantidad de HP recuperado.
 * @param {number} mpRecovered - Cantidad de MP recuperado.
 */
class Consumable extends Item {
  constructor(id, name, priceBuy, priceSell, hpRecovered, mpRecovered, info) {
    super(id, name, 'Consumibles', priceBuy, priceSell, info);
    this.hpRecovered = hpRecovered;
    this.mpRecovered = mpRecovered;
  }

  getDescription() {
    return `${super.getDescription()}, Recupera HP: ${this.hpRecovered}, MP: ${this.mpRecovered}`;
  }
}

function crearItem(categoria, id) {
  const itemDef = window.ListItems[categoria][id];
  if (!itemDef) {
    console.error(`No se encontró el item con id "${id}" en la categoría "${categoria}".`);
    return null;
  }
  
  // Según la categoría, instanciar la clase adecuada
  switch(categoria) {
    case "armas":
      return new Weapon(itemDef.id, itemDef.name, itemDef.priceBuy, itemDef.priceSell, itemDef.atk, itemDef.info);
    case "armaduras":
      return new Armor(itemDef.id, itemDef.name, itemDef.priceBuy, itemDef.priceSell, itemDef.def, itemDef.info);
    case "accesorios":
      return new Accessory(itemDef.id, itemDef.name, itemDef.priceBuy, itemDef.priceSell, { atk: itemDef.atk, def: itemDef.def }, itemDef.info);
    case "consumible":
      return new Consumable(itemDef.id, itemDef.name, itemDef.priceBuy, itemDef.priceSell, itemDef.hpRecovered, itemDef.mpRecovered, itemDef.info);
    case "key":
      return new Item(itemDef.id, itemDef.name, "Key", itemDef.priceBuy, itemDef.priceSell, itemDef.info);
    default:
      console.error("Categoría desconocida:", categoria);
      return null;
  }
}

// Hacer las clases accesibles globalmente
window.Item = Item;
window.Weapon = Weapon;
window.Armor = Armor;
window.Consumable = Consumable;
window.Accessory = Accessory;
// Exponer la función globalmente
window.crearItem = crearItem;

window.ListItems = {
  armas: {
    espada_corta: {
      id: "espada_corta",
      name: "Espada Corta",
      priceBuy: 100,
      priceSell: 50,
      atk: 5,
      info: "Una espada corta y afilada."
    },
    espada_larga: {
      id: "espada_larga",
      name: "Espada Larga",
      priceBuy: 200,
      priceSell: 100,
      atk: 7,
      info: "Una espada larga que inflige más daño."
    }
  },
  armaduras: {
    armadura_cuero: {
      id: "armadura_cuero",
      name: "Armadura de Cuero",
      priceBuy: 150,
      priceSell: 75,
      def: 5,
      info: "Protección básica de cuero."
    },
    armadura_plata: {
      id: "armadura_plata",
      name: "Armadura de Plata",
      priceBuy: 350,
      priceSell: 175,
      def: 15,
      info: "Protección básica de Plata."
    },
  },
  accesorios: {
    anillo_fuerza: {
      id: "anillo_fuerza",
      name: "Anillo de Fuerza",
      priceBuy: 120,
      priceSell: 60,
      atk: 3,
      def: 1,
      info: "Aumenta levemente el ataque."
    }
  },
  consumible: {
    pocion_salud: {
      id: "pocion_salud",
      name: "Poción de Salud",
      priceBuy: 50,
      priceSell: 25,
      hpRecovered: 50,
      mpRecovered: 0,
      info: "Recupera 50 puntos de vida."
    }
  },
  key: {
    piedra_misteriosa: {
      id: "piedra_misteriosa",
      name: "Piedra Misteriosa",
      priceBuy: 0,
      priceSell: 0,
      info: "Una Piedra misteriosa que parece albergar un poder en su interior.",
      func: new Function("id_skill", "window.crearSkill(d_skill);")
    }
  }
};

