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
        // Crear el overlay que bloquea toda la interacción en la página
        const overlay = document.createElement('div');
        overlay.id = 'inventory-overlay';
        
        // Crear el contenedor modal para el inventario
        const modal = document.createElement('div');
        modal.id = 'inventory-modal';
        
        // Botón para cerrar el inventario
        const closeBtn = document.createElement('button');
        closeBtn.id = 'close-inventory-btn';
        closeBtn.textContent = 'Cerrar Inventario';
        closeBtn.addEventListener('click', cerrarInventario);
        
        // Crear la sección de pestañas para las categorías
        const tabsContainer = document.createElement('div');
        tabsContainer.id = 'inventory-tabs';
        const categories = ['armas', 'armaduras', 'accesorios', 'consumibles', 'claves'];
        categories.forEach(category => {
          const tabBtn = document.createElement('button');
          tabBtn.classList.add('inventory-tab-btn');
          tabBtn.textContent = category;
          tabBtn.addEventListener('click', () => mostrarInventarioCategoria(category));
          tabsContainer.appendChild(tabBtn);
        });
        
        // Contenedor donde se mostrarán los ítems de la categoría seleccionada
        const itemsContainer = document.createElement('div');
        itemsContainer.id = 'inventory-items';
        
        // Agregar elementos al modal
        modal.appendChild(closeBtn);
        modal.appendChild(tabsContainer);
        modal.appendChild(itemsContainer);
        
        // Agregar el modal al overlay
        overlay.appendChild(modal);
        
        // Agregar el overlay al body para que se muestre y bloquee la interacción con el resto
        document.body.appendChild(overlay);
        
        // Mostrar una categoría por defecto, por ejemplo "armas"
        mostrarInventarioCategoria('armas');
      }
      
      function cerrarInventario() {
        const overlay = document.getElementById('inventory-overlay');
        if (overlay) {
          overlay.remove();
        }
      }
      
      /**
       * Muestra los ítems de la categoría especificada.
       * @param {string} category - La categoría a mostrar (por ejemplo, 'armas').
       */
      function mostrarInventarioCategoria(category) {
        const itemsContainer = document.getElementById('inventory-items');
        itemsContainer.innerHTML = `<p>Mostrando inventario para: ${category}</p>`;
        
        // Aquí puedes obtener los ítems del inventario del jugador:
        // Por ejemplo:
        // const inventoryItems = window.gameState.player.inventory.filter(item => item.category === category);
        // Para este ejemplo, usaremos algunos ítems simulados:
        const sampleItems = [
          { id: 1, name: 'Espada corta', category: 'armas' },
          { id: 2, name: 'Armadura de cuero', category: 'armaduras' },
          { id: 3, name: 'Poción de Salud', category: 'consumibles' }
        ];
        
        const filtered = sampleItems.filter(item => item.category === category);
        
        if (filtered.length === 0) {
          itemsContainer.innerHTML += `<p>No hay elementos en esta categoría.</p>`;
        } else {
          filtered.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('inventory-item');
            itemDiv.textContent = item.name;
            // Al hacer clic en el ítem, mostramos opciones (usar, equipar, tirar) según su tipo
            itemDiv.addEventListener('click', () => mostrarOpcionesItem(item));
            itemsContainer.appendChild(itemDiv);
          });
        }
      }
      
      /**
       * Muestra las opciones para un ítem seleccionado.
       * @param {Object} item - El objeto ítem.
       */
      function mostrarOpcionesItem(item) {
        // Aquí podrías mostrar otro modal o overlay pequeño con las opciones disponibles.
        // Para este ejemplo, usaremos una alerta.
        let opciones = "";
        if (item.category === 'consumibles') {
          opciones = "Usar, Tirar";
        } else if (item.category === 'armas' || item.category === 'armaduras' || item.category === 'accesorios') {
          opciones = "Equipar, Tirar";
        } else {
          opciones = "Tirar";
        }
        alert(`Opciones para ${item.name}: ${opciones}`);
      }
      

return {
    inicializaHUD : inicializaHUD,
    actualizarHUD : actualizarHUD
    }
})();