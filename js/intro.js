// intro.js
// Este módulo gestiona la narrativa de introducción

const Intro = (function() {
  // Función para iniciar la introducción
  function startIntro() {
    const centerPanel = document.getElementById('center-panel');
    // Se muestra un texto introductorio; se puede hacer más complejo con varias escenas
    centerPanel.innerHTML = `
      <div id="intro-screen">
        <p>Un día, mientras caminabas por la ciudad, algo extraño sucedió...</p>
        <button id="continue-intro-btn">Continuar</button>
      </div>
    `;
    // Al pulsar "Continuar", se muestra la siguiente parte (por ejemplo, encuentro con el mentor)
    document.getElementById('continue-intro-btn').addEventListener('click', function() {
      showMentorScene();
    });
  }
  
  // Función para mostrar la escena del mentor
  function showMentorScene() {
    const centerPanel = document.getElementById('center-panel');
    centerPanel.innerHTML = `
      <div id="mentor-scene">
        <p>Maestro Hiroshi: "Bienvenido a este mundo, donde el lenguaje es poder."</p>
        <button id="start-tutorial-btn">Empezar Tutorial</button>
      </div>
    `;
    document.getElementById('start-tutorial-btn').addEventListener('click', function() {
      // Cuando se termine la introducción, se carga el mapa (por ejemplo, la vista del pueblo)
      window.changeGameState('map');
    });
  }
  
  return {
    startIntro: startIntro
  };
})();
