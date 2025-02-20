// combat.js
// Este módulo gestiona la interfaz y la lógica básica de combates

const Combat = (function() {
  // Inicia un combate predefinido
  function startCombat() {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = `
      <div id="combat-screen">
        <h2>Combate</h2>
        <p>Enemigo: Bandido del Valle (Nivel 3)</p>
        <div id="enemy-health">Salud Enemigo: 100</div>
        <div id="challenge">
          <p>Desafío: Traduce "¡Alto!" al japonés.</p>
          <button class="combat-option" data-option="a">止まれ</button>
          <button class="combat-option" data-option="b">走れ</button>
          <button class="combat-option" data-option="c">食べろ</button>
        </div>
        <div id="combat-feedback"></div>
      </div>
    `;
    // Asignar eventos a las opciones del combate
    const options = document.querySelectorAll('.combat-option');
    options.forEach(option => {
      option.addEventListener('click', function() {
        const selected = option.getAttribute('data-option');
        processCombatOption(selected);
      });
    });
  }
  
  // Procesa la opción seleccionada en combate
  // Parámetros:
  //    selectedOption: String que indica la opción elegida ('a', 'b', 'c', etc.)
  function processCombatOption(selectedOption) {
    const feedbackDiv = document.getElementById('combat-feedback');
    // Ejemplo simple: la opción 'a' es correcta
    if (selectedOption === 'a') {
      feedbackDiv.textContent = '¡Correcto! Has contraatacado.';
    } else {
      feedbackDiv.textContent = 'Incorrecto, recibes daño.';
    }
  }
  
  return {
    startCombat: startCombat
  };
})();
