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
  constructor(id, name, type, priceBuy, priceSell) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.priceBuy = priceBuy;
    this.priceSell = priceSell;
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
  constructor(id, name, priceBuy, priceSell, atk) {
    super(id, name, 'weapon', priceBuy, priceSell);
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
  constructor(id, name, priceBuy, priceSell, def) {
    super(id, name, 'armor', priceBuy, priceSell);
    this.def = def;
  }

  getDescription() {
    return `${super.getDescription()}, DEF: ${this.def}`;
  }
}

/**
 * Clase para representar consumibles.
 * @param {number} hpRecovered - Cantidad de HP recuperado.
 * @param {number} mpRecovered - Cantidad de MP recuperado.
 */
class Consumable extends Item {
  constructor(id, name, priceBuy, priceSell, hpRecovered, mpRecovered) {
    super(id, name, 'consumable', priceBuy, priceSell);
    this.hpRecovered = hpRecovered;
    this.mpRecovered = mpRecovered;
  }

  getDescription() {
    return `${super.getDescription()}, Recupera HP: ${this.hpRecovered}, MP: ${this.mpRecovered}`;
  }
}

// Hacer las clases accesibles globalmente
window.Item = Item;
window.Weapon = Weapon;
window.Armor = Armor;
window.Consumable = Consumable;
