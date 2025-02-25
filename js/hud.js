//js/hud.js
const HUD = (function() {


    function actualizarHUD(){

    }

    function inicializaHUD() {
        personaje = window.gameState.player;
        const bottomContainer = document.getElementById("bottom-info");
        bottomContainer.innerHTML = ""; // Limpiar antes de actualizar

        // Contenedor principal del HUD
        const hudContainer = document.createElement("div");
        hudContainer.classList.add("hud-container");

        //  Barra de vida (HP)
        const hpContainer = document.createElement("div");
        hpContainer.classList.add("bar-container");
        hpContainer.innerHTML = `<span>HP:</span>
            <div class="bar">
                <div id="hp-fill" class="bar-fill" style="width: ${(personaje.attributes.hp / personaje.attributes.hpMax) * 100}%">
                    ${personaje.attributes.hp} / ${personaje.attributes.hpMax}
                </div>
            </div>`;

        //  Barra de maná (MP)
        const manaContainer = document.createElement("div");
        manaContainer.classList.add("bar-container");
        manaContainer.innerHTML = `<span>MP:</span>
            <div class="bar">
                <div id="mana-fill" class="bar-fill" style="width: ${(personaje.attributes.mana / personaje.attributes.manaMax) * 100}%">
                    ${personaje.attributes.mana} / ${personaje.attributes.manaMax}
                </div>
            </div>`;

        //  Barra de experiencia (XP)
        const xpContainer = document.createElement("div");
        xpContainer.classList.add("bar-container");
        xpContainer.innerHTML = `<span>XP:</span>
            <div class="bar">
                <div id="xp-fill" class="bar-fill" style="width: ${(personaje.xp / personaje.xpMax) * 100}%">
                    ${personaje.xp} / ${personaje.xpNextLevl}
                </div>
            </div>`;

        //  Atributos del personaje
        const atributosContainer = document.createElement("div");
        atributosContainer.classList.add("atributos-container");

        const atributos = `
            <p>Fuerza: ${personaje.attributes.attack}</p>
            <p>Defensa: ${personaje.attributes.defense}</p>
            <p>Agilidad: ${personaje.attributes.agility}</p>
            <p>Concentración: ${personaje.attributes.concentration}</p>
        `;

        atributosContainer.innerHTML = atributos;

        //  Icono para abrir el inventario
        const inventarioIcon = document.createElement("button");
        inventarioIcon.textContent = "📦 Inventario";
        inventarioIcon.classList.add("inventario-btn");
        inventarioIcon.addEventListener("click", () => abrirInventario());
        //icono para subir de nivel:
        const levelUpIcon = document.createElement("button");
        levelUpIcon.textContent = "📦 Subir de Nivel";
        levelUpIcon.classList.add("lvlup-btn");
        levelUpIcon.addEventListener("click", () => levelUP());
        levelUpIcon.disabled = true;
        levelUpIcon.style.display = "none";  // Oculto inicialmente
        //levelUpIcon.style.display = "block"; // Lo muestra


        //  Equipamiento equipado
        const equipamientoContainer = document.createElement("div");
        equipamientoContainer.classList.add("equipamiento-container");

        const equipamiento = `
            <p>Arma: ${personaje.equipment.weapon || "Ninguna"}</p>
            <p>Armadura: ${personaje.equipment.armor || "Ninguna"}</p>
            <p>accesorio: ${personaje.equipment.accessory || "Ninguna"}</p>
        `;

        equipamientoContainer.innerHTML = equipamiento;

        //  Añadir todos los elementos al HUD
        hudContainer.appendChild(hpContainer);
        hudContainer.appendChild(manaContainer);
        hudContainer.appendChild(xpContainer);
        hudContainer.appendChild(atributosContainer);
        const botonesContainer = document.createElement("div");
        botonesContainer.classList.add("botones-container");

        // Asumiendo que inventarioIcon ya está creado:
        botonesContainer.appendChild(inventarioIcon);
        botonesContainer.appendChild(levelUpIcon);

        hudContainer.appendChild(botonesContainer);
        hudContainer.appendChild(equipamientoContainer);

        bottomContainer.appendChild(hudContainer);

        
    }

    function abrirInventario() {
      // Crear el overlay que bloquea toda la interfaz
      const overlay = document.createElement('div');
      overlay.id = 'inventory-overlay';
    
      // Crear el contenedor modal para el inventario (se posicionará en el centro)
      const modal = document.createElement('div');
      modal.id = 'inventory-modal';
    
      // Botón para cerrar el inventario
      const closeBtn = document.createElement('button');
      closeBtn.id = 'close-inventory-btn';
      closeBtn.textContent = 'Cerrar Inventario';
      closeBtn.addEventListener('click', cerrarInventario);
    
      // Crear el contenedor para las pestañas (tab menú)
      const tabsContainer = document.createElement('div');
      tabsContainer.id = 'inventory-tabs';
      const categories = ['Consumibles', 'Armas', 'Armaduras', 'Accesorios', 'Ojetos Claves'];
      categories.forEach(category => {
        const tabBtn = document.createElement('button');
        tabBtn.classList.add('inventory-tab-btn');
        tabBtn.textContent = category;
        tabBtn.addEventListener('click', () => {
          // Marcar la pestaña actual como activa
          document.querySelectorAll('.inventory-tab-btn').forEach(btn => btn.classList.remove('active'));
          tabBtn.classList.add('active');
          mostrarInventarioCategoria(category);
        });
        tabsContainer.appendChild(tabBtn);
      });
      // Activar la primera pestaña por defecto
      tabsContainer.firstChild.classList.add('active');
    
      // Contenedor para los ítems del inventario
      const itemsContainer = document.createElement('div');
      itemsContainer.id = 'inventory-items';
    
      // Agregar elementos al modal
      modal.appendChild(closeBtn);
      modal.appendChild(tabsContainer);
      modal.appendChild(itemsContainer);
    
      // Agregar el modal al overlay
      overlay.appendChild(modal);
    
      // Agregar el overlay directamente al body para que cubra toda la pantalla
      document.body.appendChild(overlay);
    
      // Mostrar la categoría por defecto (por ejemplo, 'Consumibles')
      mostrarInventarioCategoria('Consumibles');
    }
    
    function cerrarInventario() {
      const overlay = document.getElementById('inventory-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
    
    function mostrarInventarioCategoria(category) {
      const itemsContainer = document.getElementById('inventory-items');
      itemsContainer.innerHTML = `<p>Inventario - ${category}</p>`;
      
      // Aquí obtendrías los ítems reales del inventario de window.gameState.player.inventory.
      // Para este ejemplo, usamos ítems de muestra:
      /*
      const sampleItems = [
        { id: 1, name: 'Espada corta', category: 'weapon', quantity: 1, description: 'Una espada corta y afilada.' },
        { id: 2, name: 'Armadura de Plata', category: 'armor', quantity: 2, description: 'Protección básica de Plata.' },
        { id: 3, name: 'Armadura de cuero', category: 'armor', quantity: 1, description: 'Protección básica de cuero.' },
        { id: 4, name: 'Poción de Salud', category: 'consumable', quantity: 5, description: 'Recupera 50 HP.' }
      ];
      */

      //const filtered = window.gameState.inventory.filter(item => item.type === category);
      const filtered = Object.values(window.gameState.player.inventory).filter(obj => category.includes(obj.item.type));
      
      if (filtered.length === 0) {
        itemsContainer.innerHTML += `<p>No hay elementos en esta categoría.</p>`;
      } else {
        filtered.forEach(obj => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('inventory-item');
          itemDiv.innerHTML = `
            <div class="item-info">
              <strong>${obj.item.name}</strong><br>
              <small>${obj.item.info}</small>
            </div>
            <div class="item-qty">x${obj.quantity}</div>
          `;
          // Al hacer clic, se pueden mostrar las opciones para ese ítem
          agregarEventListenerInventario(itemDiv, obj);
          itemsContainer.appendChild(itemDiv);
        });
      }
    }
    
    // Función para mostrar las opciones al lado del cursor
    function mostrarOpcionesItem(obj, event) {
      // Evitar que se propaguen otros eventos
      event.stopPropagation();

      // Si ya existe un popup de opciones, eliminarlo
      let existingPopup = document.getElementById('item-options-popup');
      if (existingPopup) {
        existingPopup.remove();
      }
      
      // Crear el popup de opciones
      const popup = document.createElement('div');
      popup.id = 'item-options-popup';
      
      // Ajustar la posición dinámica
      popup.style.top = event.clientY + 'px';
      popup.style.left = event.clientX + 'px';

      // Determinar las opciones según el tipo de objeto
      let opciones = [];
      switch(obj.item.type){
        case 'Consumibles':
          opciones = ['Usar', 'Tirar'];
          break;
        case 'Armas':
        case 'Armaduras':
        case 'Accesorios':
          opciones = ['Equipar', 'Tirar'];
          break;
        default:
          opciones = ['Tirar'];
      }
      
      // Crear botones para cada opción y añadirlos al popup
      opciones.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('botton-item-option');
        btn.textContent = option;
        //btn.style.margin = '5px';
        btn.addEventListener('click', function(e) {
          e.stopPropagation(); // Evitar que se cierre el popup por otros eventos
          alert(`Opción seleccionada: ${option} para ${obj.item.name}`);
          popup.remove();
        });
        popup.appendChild(btn);
      });
      
      // Agregar el popup al body
      document.body.appendChild(popup);
      // Añadir un listener global para cerrar el popup al hacer clic fuera, con la opción {once: true}
      document.addEventListener('click', function handleClickOutside() {
        const existingPopup = document.getElementById('item-options-popup');
        if (existingPopup) {
          existingPopup.remove();
        }
      }, { once: true });
    }

    // Para cada ítem del inventario, en lugar de usar el event listener anterior que usaba alert(),
    // se debe modificar para pasar el evento:
    function agregarEventListenerInventario(itemDiv, item) {
      itemDiv.addEventListener('click', (event) => {
        // Antes de mostrar las opciones, se elimina cualquier popup existente
        let existingPopup = document.getElementById('item-options-popup');
        if (existingPopup) {
          existingPopup.remove();
        }
        // Mostrar el popup de opciones al lado del cursor
        mostrarOpcionesItem(item, event);
      });
    }
    
      

return {
    inicializaHUD : inicializaHUD,
    actualizarHUD : actualizarHUD
    }
})();