// dialogues.js
window.dialogues = {
	narrador: {
		story: [
			[
				`<p>De repente, todo se vuelve oscuro...</p>`,
            	`<p>Cuando recuperas la visión, te encuentras en un mundo completamente distinto:
					un Japón feudal con magia en cada rincón.</p>`
			],
		],
	},
  maestroTutorial1: {
    story: [
		[//Primer diálogo de introducción
			"<p>こんにちは、旅人.", 
			"<p>?",
			"<p>!",
			"<p>Perdona, pensé que lo entenderías. Mira, este es Kiiro, mi pequeño loro que también habla castellano.</p>",
			"<p>Pronto enfrentarás al enemigo final y yo pereceré. Pero no temas, Kiiro te guiará.</p>",
			"<p>Ahora, debes dirigirte al pueblo para resguardarte. El pueblo se encuentra justo debajo de donde te encuentras.</p>"
    	],
		[//Diálogo al llegar al pueblo
			"<p>Bienvenido al pueblo tal</p>",
			"<p>Antes de nada permíteme una cosa...</p>"
		],
		[//Explicándo atributos
			`<p>Ahora puedes consultar tus atributos abajo de la pantalla</p>`,
			`<p>Atributo 1: Tal`,
		],
		[//Tutorial inventario
			`<p>Pulsa sobre el botón Inventario`
		],
		[//Como equipar objetos
			`<p>Pulsa sobre la <strong>Espada Corta</strong> y <strong>Equípala</strong>`
		],
		[//Atributos del equipo
			`<p>Beneficios de los atributos`,
			`<p>Sobre los objetos en general`,
			`<p>Sobre los objetos claves`,
			`<p>Abre el inventario de nuevo`
		],
		[//tutorial objetos claves
			`<p>Pulsa sobre <strong>Piedra Misteriosa</strong> y pulsa <strong>Usar</strong>`
		],
		[//Explicando las habilidades
			`<p>Explica habilidades`,
			`<p>Pulsar sobre Furigana para equiparla`
		],
		[//Explicación sobre las misiones
			`<p>Explicar las misiones`
		],
		[//Guardar la partida
			`<p>Guardar partida.`
		]
	],
    generic: [
      "¿Necesitas algo?",
      "Puedo ayudarte con información."
    ],
	quest :{
		questID_001 :[
			"Necesito que consigas 10 hierbas para mi medicina.",
			"¿Has conseguido las hierbas?",
			"Gracias por las hierbas"
		],
		questID_002 :[
			"Necesito que mates 10 enemigos.",
			"¿Has acabado con los enemigos?",
			"Gracias por acabar con los enemigos."
		],
	}
  },
  // Más NPCs...
};


