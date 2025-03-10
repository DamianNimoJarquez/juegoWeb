//js/hud.js
const HUD = (function() {
let activetab_;
let pasoTutoria = 20;

    function abrirIventarioTutorial(activetab_){
      // Crear el overlay que bloquea toda la interfaz
      const overlay = document.createElement('div');
      overlay.id = 'inventory-overlay';
      // Crear el contenedor modal para el inventario (se posicionará en el centro)
      const modal = document.createElement('div');
      modal.id = 'inventory-modal';
      // Crear el contenedor para las pestañas (tab menú)
      const tabsContainer = document.createElement('div');
      tabsContainer.id = 'inventory-tabs';
      const categories = ['Consumibles', 'Armas', 'Armaduras', 'Accesorios', 'Ojetos Claves'];
      categories.forEach(category => {
        const tabBtn = document.createElement('button');
        tabBtn.classList.add('inventory-tab-btn');
        tabBtn.textContent = category;
        if(category === activetab_){
          tabBtn.classList.add('active');
          tabBtn.addEventListener('click', () => {
          // Marcar la pestaña actual como activa
          document.querySelectorAll('.inventory-tab-btn').forEach(btn => btn.classList.remove('active'));
          tabBtn.classList.add('active');
          mostrarInventarioCategoria(category);
          });
        }
        tabsContainer.appendChild(tabBtn);
      });
      // Contenedor para los ítems del inventario
      const itemsContainerT = document.createElement('div');
      itemsContainerT.id = 'inventory-items';
      // Agregar elementos al modal
      modal.appendChild(tabsContainer);
      modal.appendChild(itemsContainerT);
      // Agregar el modal al overlay
      overlay.appendChild(modal);
      // Agregar el overlay directamente al body para que cubra toda la pantalla
      document.body.appendChild(overlay);
      //Damos las opciones a los objetos del inventario
      const itemsContainer = document.getElementById('inventory-items');
      itemsContainer.innerHTML = `<p>Inventario - ${category}</p>`;
      const filtered = Object.values(window.gameState.player.inventory)
                        .filter(obj => category.includes(obj.item.type));
      
      // Mostrar la categoría por defecto (por ejemplo, 'Consumibles')
      mostrarInventarioCategoria(activetab_);
    }

    function inicializaHUD(objActu_) {
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
                    <div class="bar-text">${personaje.attributes.hp} / ${personaje.attributes.hpMax}</div>
                </div>
            </div>`;

        //  Barra de maná (MP)
        const manaContainer = document.createElement("div");
        manaContainer.classList.add("bar-container");
        manaContainer.innerHTML = `<span>MP:</span>
            <div class="bar">
                <div id="mana-fill" class="bar-fill" style="width: ${(personaje.attributes.mana / personaje.attributes.manaMax) * 100}%">
                    <div class="bar-text">${personaje.attributes.mana} / ${personaje.attributes.manaMax}</div>
                </div>
            </div>`;

        //  Barra de experiencia (XP)
        const xpContainer = document.createElement("div");
        xpContainer.classList.add("bar-container");
        xpContainer.innerHTML = `<span>XP:</span>
            <div class="bar">
                <div id="xp-fill" class="bar-fill" style="width: ${(personaje.xp / personaje.xpNextLevl) * 100}%">
                    <div class="bar-text">${personaje.xp} / ${personaje.xpNextLevl}</div>
                </div>
            </div>`;

        //  Atributos del personaje
        const atributosContainer = document.createElement("div");
        atributosContainer.classList.add("atributos-container");
        
        atributosContainer.innerHTML = actulizarAtributosEquipados();

        //  Icono para abrir el inventario
        const inventarioIcon = document.createElement("button");
        inventarioIcon.textContent = "📦 Inventario";
        inventarioIcon.classList.add("inventario-btn");
        inventarioIcon.addEventListener("click", () => abrirInventario(activetab_));
        //icono para subir de nivel:
        const levelUpIcon = document.createElement("button");
        levelUpIcon.textContent = "📦 Subir de Nivel";
        levelUpIcon.classList.add("ocult-btn");
        levelUpIcon.addEventListener("click", () => levelUP());
        levelUpIcon.disabled = true;
        levelUpIcon.style.display = "none";  // Oculto inicialmente
        //levelUpIcon.style.display = "block"; // Lo muestra


        //  Equipamiento equipado
        const equipamientoContainer = document.createElement("div");
        equipamientoContainer.classList.add("equipamiento-container");

        equipamientoContainer.innerHTML = actualizarEquipoInfo();

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
      if(window.gameState.currentTutorialSecene <= pasoTutoria){
        closeBtn.style.display = "none";
        closeBtn.disabled = true;
      }
    
      // Crear el contenedor para las pestañas (tab menú)
      const tabsContainer = document.createElement('div');
      tabsContainer.id = 'inventory-tabs';
      const categories = ['Consumibles', 'Armas', 'Armaduras', 'Accesorios', 'Ojetos Claves'];
      categories.forEach(category => {
        const tabBtn = document.createElement('button');
        tabBtn.classList.add('inventory-tab-btn');
        tabBtn.textContent = category;
        if(window.gameState.currentTutorialSecene <= pasoTutoria && category == activetab_){
          //estamos en el tutorial
          tabBtn.classList.add('active');
          tabBtn.addEventListener('click', () => {
          // Marcar la pestaña actual como activa
          document.querySelectorAll('.inventory-tab-btn').forEach(btn => btn.classList.remove('active'));
          tabBtn.classList.add('active');
          mostrarInventarioCategoria(category);
          });
        }
          
        tabsContainer.appendChild(tabBtn);
      });
      // Activar la primera pestaña por defecto si no está en el tutorial
      if(window.gameState.currentTutorialSecene > pasoTutoria)
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

      if(window.gameState.currentTutorialSecene <= pasoTutoria){
        mostrarInventarioCategoria(activetab_);
        //vuelve al tutorial
        window.gameState.currentTutorialSecene++;
        window.changeGameState('tutorial');
      }
      else
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
      
      const filtered = Object.values(window.gameState.player.inventory)
                        .filter(obj => category.includes(obj.item.type));
      
      if (filtered.length === 0) {
        itemsContainer.innerHTML += `<p>No hay elementos en esta categoría.</p>`;
      } else {
        filtered.forEach(obj => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('inventory-item');
          itemDiv.innerHTML = `
            <div class="item-info">
              <strong>${obj.item.name}</strong> ${obj.item.equiped? "(Equipado)":''}<br>
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
      if(window.gameState.currentTutorialSecene <= pasoTutoria){
        
      }
      switch(obj.item.type){
        case 'Consumibles':
          opciones = window.gameState.currentTutorialSecene <= pasoTutoria ? ['Usar']: ['Usar', 'Tirar'];
          break;
        case 'Armas':
        case 'Armaduras':
        case 'Accesorios':
          opciones = opciones = window.gameState.currentTutorialSecene <= pasoTutoria ?
            [obj.item.equiped? '':'Equipar'] : [obj.item.equiped? 'Desequipar':'Equipar', 'Tirar'];
          break;
        default:
          opciones = obj.item.usable ? ['Usar']: null;
      }
      // Crear botones para cada opción y añadirlos al popup
      if(opciones !== null){
        opciones.forEach(option => {
          const btn = document.createElement('button');
          btn.classList.add('botton-item-option');
          btn.textContent = option;
          //btn.style.margin = '5px';
          btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se cierre el popup por otros eventos
            switch(option){
              case "Usar":
                useConsumible(obj);
                break;
              case 'Equipar':
                equiparItem(obj);
                break;
              case 'Desequipar':
                desequiparItem(obj);
                break;
              case 'Tirar':
                tirarObjeto(obj);
                break;
            }
            //alert(`Opción seleccionada: ${option} para ${obj.item.name}`);
            popup.remove();
          });
          popup.appendChild(btn);
        });
      }
      // Agregar el popup al body
      if((window.gameState.currentTutorialSecene > pasoTutoria || !obj.item.equiped) && opciones !==null)
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

    //Usar consumible
    function useConsumible(obj){
      switch(obj.item.type){
      //recuperar vida y maná
      case 'Consumibles':
          window.gameState.player.attributes.hp = Math.min(
                          window.gameState.player.attributes.hp+obj.item.hpRecovered
                          ,window.gameState.player.attributes.hpMax);
          window.gameState.player.attributes.mana = Math.min(
                          window.gameState.player.attributes.mana+obj.item.mpRecovered
                          ,window.gameState.player.attributes.manaMax);
          break;
      case 'Ojetos Claves':
        //console.log(obj.item.action);
        switch(obj.item.action){
          case 'Habilidad':
            //crear habilidad y añadirla al usuario
            window.addSkill(obj.item.func());

            console.log("Crear Habilidad");
            break;
          default:
            console.error("Tipo de accion no valido");
        }
        console.log("objeto clave consumido");
        break;
      }

      if(obj.quantity > 1){
        window.gameState.player.inventory[obj.item.id].quantity--;
      }
      else{
        delete window.gameState.player.inventory[obj.item.id];
      }
      categoria_ = obj.item.type;
      //actualizar interface
      inicializaHUD();
      //actualizar inventario
      mostrarInventarioCategoria(categoria_);
      //una vez usado, si estamos en el tutorial, cambiamos la escena
      if(window.gameState.currentTutorialSecene <= pasoTutoria){
        window.gameState.currentTutorialSecene++;
        console.log("en usar ", window.gameState.currentTutorialSecene);
        window.changeGameState("tutorial");
        cerrarInventario();
      }
    }
    function tirarObjeto(obj){
      // Preguntar confirmación
      confirmarObj(obj, 0, function(confirmado) {
        if (confirmado){
          categoria_ = obj.item.type;
          //comprobar si está equipado
          let texto_ = `
          ${obj.item.atk !== undefined 
            ? `<p class="flechaAbajo">
              -${obj.item.atk} atk</p>` 
            : ''
          }
          ${obj.item.def !== undefined 
            ? `<p class="flechaAbajo">
                -${obj.item.def} def</p>` 
            : ''
          }
        `;
          if(obj.item.equiped){
            //si lo está preguntar
            confirmarObj(obj,0,function(confirmacion){
              if(confirmacion)
                //desequiparlo
                window.gameState.player.equipment[obj.item.type] = null;
                delete window.gameState.player.inventory[obj.item.id];
                //actualizar interface
                inicializaHUD();
                mostrarInventarioCategoria(obj.item.type);

            },0,texto_);
          }else{
            delete window.gameState.player.inventory[obj.item.id];
            mostrarInventarioCategoria(obj.item.type);
          }
        }
      });
    }
    /**
     * Función auxiliar para equipar un objeto en una ranura dada..
     * @param {Object} obj - Objeto con la información del ítem a equipar.
     */
    function equiparItem(obj){
      const player = window.gameState.player;
      let currentEquipped = player.equipment[obj.item.type];
      if(currentEquipped !== null){
        let difAtk = (obj.item.atk ?? 0) - (currentEquipped.atk ?? 0);
        let difDef = (obj.item.def ?? 0) - (currentEquipped.def ?? 0);
        let texto_ = `
          ${obj.item.atk !== undefined 
            ? `<p class="${difAtk < 0 ? 'flechaAbajo' : 'flechaArriba'}">
              ${difAtk < 0 ? difAtk : '+' + difAtk} atk</p>` 
            : ''
          }
          ${obj.item.def !== undefined 
            ? `<p class="${difDef < 0 ? 'flechaAbajo' : 'flechaArriba'}">
                ${difDef < 0 ? difDef : '+' + difDef} def</p>` 
            : ''
          }
        `;
        confirmarObj(currentEquipped, 1, function(confirmado) {
          if(confirmado){
            //quitamos el item y lo cambiamos
            player.inventory[obj.item.id].item.equiped = true;
            player.inventory[currentEquipped.id].item.equiped = false;
            player.equipment[obj.item.type] = obj.item;
            //Actualizar los valores de los atributos
            mostrarInventarioCategoria(obj.item.type);
            inicializaHUD();
          }
        },obj,texto_);
      }
      else{
        //equipar directamente
        player.equipment[obj.item.type] = obj.item;
        player.inventory[obj.item.id].item.equiped = true;
        //Actualizar los valores de los atributos
        mostrarInventarioCategoria(obj.item.type);
        inicializaHUD();
      }
      //una vez equipado, si estamos en el tutorial, cambiamos la escena
      if(window.gameState.currentTutorialSecene <= pasoTutoria){
        window.gameState.currentTutorialSecene++;
        console.log("en inventario ", window.gameState.currentTutorialSecene);
        window.changeGameState("tutorial");
        cerrarInventario();
      }
    }
    function actualizarEquipoInfo(){
        return `
          <p>Arma: 
            ${window.gameState.player.equipment.Armas ? 
                `<span class="atributos-tooltip" style="color:#05f00c">
                    ${window.gameState.player.equipment.Armas.name}
                    <span class="atributos-tooltip-content">
                        ${window.gameState.player.equipment.Armas.atk ? `Atk: <span style="color:${window.gameState.player.equipment.Armas.atk < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Armas.atk}</span><br>` : ""}
                        ${window.gameState.player.equipment.Armas.def ? `Def: <span style="color:${window.gameState.player.equipment.Armas.def < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Armas.def}</span><br>` : ""}
                        ${window.gameState.player.equipment.Armas.agi ? `Agi: <span style="color:${window.gameState.player.equipment.Armas.agi < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Armas.agi}</span><br>` : ""}
                        ${window.gameState.player.equipment.Armas.con ? `Con: <span style="color:${window.gameState.player.equipment.Armas.con < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Armas.con}</span><br>` : ""}
                    </span>
                </span>` :
                "Ninguna"
            }
        </p>

        <p>Armadura: 
            ${window.gameState.player.equipment.Armaduras ? 
                `<span class="atributos-tooltip" style="color:#05f00c">
                    ${window.gameState.player.equipment.Armaduras.name}
                    <span class="atributos-tooltip-content">
                        ${window.gameState.player.equipment.Armaduras.atk ? `Atk: <span style="color:${window.gameState.player.equipment.Armaduras.atk < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Armaduras.atk}</span><br>` : ""}
                        ${window.gameState.player.equipment.Armaduras.def ? `Def: <span style="color:${window.gameState.player.equipment.Armaduras.def < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Armaduras.def}</span><br>` : ""}
                        ${window.gameState.player.equipment.Armaduras.agi ? `Agi: <span style="color:${window.gameState.player.equipment.Armaduras.agi < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Armaduras.agi}</span><br>` : ""}
                        ${window.gameState.player.equipment.Armaduras.con ? `Con: <span style="color:${window.gameState.player.equipment.Armaduras.con < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Armaduras.con}</span><br>` : ""}
                    </span>
                </span>` :
                "Ninguna"
            }
        </p>

        <p>Accesorio: 
            ${window.gameState.player.equipment.Accesorios ? 
                `<span class="atributos-tooltip" style="color:#05f00c">
                    ${window.gameState.player.equipment.Accesorios.name}
                    <span class="atributos-tooltip-content">
                        ${window.gameState.player.equipment.Accesorios.atk ? `Atk: <span style="color:${window.gameState.player.equipment.Accesorios.atk < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Accesorios.atk}</span><br>` : ""}
                        ${window.gameState.player.equipment.Accesorios.def ? `Def: <span style="color:${window.gameState.player.equipment.Accesorios.def < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Accesorios.def}</span><br>` : ""}
                        ${window.gameState.player.equipment.Accesorios.agi ? `Agi: <span style="color:${window.gameState.player.equipment.Accesorios.agi < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Accesorios.agi}</span><br>` : ""}
                        ${window.gameState.player.equipment.Accesorios.con ? `Con: <span style="color:${window.gameState.player.equipment.Accesorios.con < 0 ? "#fa0404" : "#05f00c"};">${window.gameState.player.equipment.Accesorios.con}</span><br>` : ""}
                    </span>
                </span>` :
                "Ninguna"
            }
        </p>
        `;
    }
    /**
    * @param {String} atributoName - El nombre del atributo "Fuerza", "Defensa"...
    * @param {String} color - el color #05f00c o #fa0404
    * @param {Object} atributo - el atributo a añadir "fuerza", "defense", "agility" o "concentration"
    * @param {Object} modificador - lo que varía el valor -15, 12....
    */
    function actualizarValoresAtributos(atributoName, atributo, modificador){
      if(modificador === undefined || modificador === 0 || modificador === null)
        return `<p> ${atributoName}: <span>${personaje.attributes[atributo]}</span></p>`;
      return `<p> ${atributoName}: 
                          <span class="atributos-tooltip" style="color:${modificador < 0 ? "#fa0404":"#05f00c"}"}>
                            ${personaje.attributes[atributo]+modificador}
                            <span class="atributos-tooltip-content">
                              Base: <span style="color:white;">${personaje.attributes[atributo]}</span><br>
                              Equipo: <span style="color:${modificador < 0 ? "#fa0404":"#05f00c"};">${modificador}</span>
                            </span>
                          </span>
                        </p>`;
    }
    function actulizarAtributosEquipados(){
      let atributos = ``;
      // Lista de atributos y sus claves correspondientes en el objeto
      const atributosList = [
        { name: "Fuerza", key: "fuerza", value: (window.gameState.player.equipment.Armas?.atk ?? 0)+(window.gameState.player.equipment.Armaduras?.atk ?? 0)+(window.gameState.player.equipment.Accesorios?.atk ?? 0)},
        { name: "Defensa", key: "defense", value: (window.gameState.player.equipment.Armas?.def?? 0) + (window.gameState.player.equipment.Armaduras?.def?? 0) + (window.gameState.player.equipment.Accesorios?.def?? 0)},
        { name: "Agilidad", key: "agility", value: (window.gameState.player.equipment.Armas?.agi?? 0) + (window.gameState.player.equipment.Armaduras?.agi?? 0) + (window.gameState.player.equipment.Accesorios?.agi?? 0)},
        { name: "Concentración", key: "concentration", value: (window.gameState.player.equipment.Armas?.con?? 0) + (window.gameState.player.equipment.Armaduras?.con?? 0) + (window.gameState.player.equipment.Accesorios?.con?? 0)}
      ];
      // Recorremos la lista de atributos y aplicamos la función de actualización
      atributosList.forEach(atributo => {
          atributos += actualizarValoresAtributos(atributo.name, atributo.key, atributo.value);
      });
      
      return atributos;
    }

    /**
     * Función auxiliar para desequipar un objeto en una ranura dada.
     * @param {Object} obj - Objeto con la información del ítem a equipar.
     */
    function desequiparItem(obj){
      window.gameState.player.equipment[obj.item.type] = null;
      window.gameState.player.inventory[obj.item.id].item.equiped = false;
      //window.gameState.player.inventory[obj.item.id].item.equiped=false;
      mostrarInventarioCategoria(obj.item.type);
      inicializaHUD();
    }

    /**
   * Muestra un modal de confirmación en el centro de la pantalla para confirmar la acción de tirar un objeto.
   * @param {Object} item - El objeto que se va a tirar (para mostrar su nombre en el mensaje).
   * @param {number} typeComp - Tipo de comparación, 0 tirar, 1 equipar
   * @param {Function} callback - Función que se llamará con true si se confirma, false si se cancela.
   */
  function confirmarObj(obj, typeComp, callback, obj2, text_) {
    // Crear el overlay que bloquea toda la pantalla.
    const overlay = document.createElement('div');
    overlay.classList.add('confirm-overlay');

    // Crear el modal de confirmación.
    const modal = document.createElement('div');
    modal.classList.add('confirm-modal');
    if(typeComp == 0){
      //tirar
      modal.innerHTML = `
      <p style="margin-bottom: 20px;">¿Estás seguro que deseas tirar
      <strong>${obj.item.name}</strong> x <strong>${obj.quantity}</strong>?</p>
      ${text_ !== undefined? `${text_}`:''}
      <div style="text-align: center;">
        <button id="confirm-yes-btn" style="margin-right: 10px;">Confirmar</button>
        <button id="confirm-no-btn">Cancelar</button>
      </div>
    `;
    }
    else{
      //equipar
      modal.innerHTML = `
      <p style="margin-bottom: 20px;">¿Estás seguro que deseas reemplazar <strong>${obj.name}</strong>
        por <strong>${obj2.item.name}?</strong></p>
        ${text_}
      <div style="text-align: center;">
        <button id="confirm-yes-btn" style="margin-right: 10px;">Confirmar</button>
        <button id="confirm-no-btn">Cancelar</button>
      </div>
    `;
    }
    

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Listener para el botón "Confirmar"
    document.getElementById('confirm-yes-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      overlay.remove();
      callback(true);
    });

    // Listener para el botón "Cancelar"
    document.getElementById('confirm-no-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      overlay.remove();
      callback(false);
    });
  }

  function setActivetab(value) {
    activetab_ = value;  // setter para cambiar el valor
}

return {
    inicializaHUD : inicializaHUD,
    abrirIventarioTutorial : abrirIventarioTutorial,
    setActivetab: setActivetab
    }
})();