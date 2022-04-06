/*  
 *  These values define the app state
 *
*/

var language = null;
var userAnswers = ["a", "a", "a", "a", "a", "a", "a"];
var incorrectAnswers = []

// ------ BEGIN: Variables that determine if the user is currently in a determined view ---------------
var figures = false; // It is false when there is no slider figure in the view; otherwise it indicates if it is a petroglyph or a rock painting
var quiz = false; // Indicates if the user is currently solving the quiz
var espdoc = false; // Indicates if the user is currently in the "For teachers only" space
// ------ END

// ------ BEGIN: Variables related to the slider figures
var figureType = 0; // Kind of slider figure that the user could be currently seeing (0: petroglyph1, 1: petroglyph2, 2: rockPainting1; 3: rockPainting2)
var currentFigure = null; // Unlike "figureType", it has the array with the uris of the images that represent the figure.
var head_body_feet = [0, 0, 0]; // Indicates in which of the three parts below each of the three sections of the figure currently is
var parts = ['Antropomorfa','Geométrica','Zoomorfa'];
// ------ END

// ------ BEGIN: Variables related to the quiz
var numQuestion = 0;
var currentAttempt = 0;
// This will be shuflled later and will indicate the order of the options in the dropdown menu,
// because we don't want them to always appear in the same order
var lastQ_optionsOrder = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
var lastQ_selectedOption = 0;
// ------ END

const possible_languages = ["spanish", "english"];

// This includes the title and the vertical texts. In this case we also put the id of the corresponding HTML object,
// so the elements are of the form [id, text].
const mainLabels_texts = {
	spanish: [
		["title", "Figuras Rupestres"], // 0
		["main-left-label", "Cueva de las manos - Argentina"], // 1
		["main-right-label", "Sur de Marruecos - África"], // 2
		["central-image-label", '<span style="font-style:italic">Alia, Diosa de la Fertilidad y del Amor</span>. Arabia Saudita'], // 3
	],
	english: [
		["title", "Cave Figures"], // 0
		["main-left-label", "Cave of the hands - Argentina"], // 1
		["main-right-label", "South of Morocco - Africa"], // 2
		["central-image-label", '<span style="font-style:italic">Alia, Goddess of Fertility and Love</span>. Saudi Arabia'], // 3
	],
}

const buttons_texts = {
	spanish: [
		"Presentación", // 0
		"Introducción", // 1
		"Instrucciones", // 2
		"Créditos", // 3
		"Contacto", // 4
		"Petroglifos 1", // 5
		"Petroglifos 2", // 6
		"Pinturas Rupestres 1", // 7
		"Pinturas Rupestres 2", // 8
		"Recapitulemos", // 9
		"Espacio Docente", // 10
	],
	english: [
		"Presentation", // 0
		"Introduction", // 1
		"Instructions", // 2
		"Credits", // 3
		"Contact", // 4
		"Petroglyphs 1", // 5
		"Petroglyphs 2", // 6
		"Rock Paintings 1", // 7
		"Rock Paintings 2", // 8
		"Recapitulate", // 9
		"For Teachers only", // 10
	],
};

// Petroglyphs and Rock Paintings
const definitions_texts = {
	spanish: [
		`Los <span style="color:red;font-style:italic">Petroglifos</span> son grabados de figuras en bajo relieve, en la superficie de algunas rocas. Realizados con diferentes técnicas de percusión directa o indirecta, abrasión y/o rayado. Su presencia implica, como implicaba en épocas pasadas, territorialidad. Las señales eran reconocidas por los miembros de una misma comunidad étnica, e identificadas como signos territoriales por miembros de otras comunidades, que las temían y respetaban.`, // 0

		`Los significados de las imágenes de los <span style="color:red;font-style:italic">Petroglifos</span>, conocidos por nosotros solo en unos casos, definían su función, que es muy variable. En algunos grupos amazónicos venezolanos, la función sagrada de los <span style="color:red;font-style:italic">Petroglifos</span>, está relacionada a la transmisión de preceptos religiosos vitales, para la supervivencia de la comunidad; su función como objetos sagrados, conocida entre los ArawaKos, posiblemente es ampliable a otros grupos. En sitios de los estados Barinas, Carabobo y Amazonas entre otros, parecen representar complejos de tipo ceremonial.`, // 1

		`Las <span style="color:blue;font-style:italic">Pinturas Rupestres o Pictografías</span> son dibujos realizados sobre las rocas, mediante la aplicación de pigmentos. Se utilizaron en unos casos sustancias minerales, como almagre y óxidos de hierro, en otros sustancias vegetales -chica, (Arrabidea Chica) y caraña (Bursera Simaruba), de orígen animal: sangre, grasas, huevos, también carbón y arcillas. Aparecen realizadas en cuevas y abrigos, protegidas del clima y de la visibilidad fácil, en muchos casos han sido encontradas acompañadas de fardos mortuorios, posiblemente cumpliendo la función de símbolos protectores de los muertos.`, // 2

		`Son la Manifestación Rupestre de manufactura prehispánica más extendida, llegando incluso a utilizarse hasta el presente, en las pinturas que acompañan los restos mortuorios de etnias indígenas contemporáneas, y en rituales de tradición espiritista y santera, que aparecen en grandes murales al aire libre. La mayor parte de las Pictografías en el mundo, son de color rojo, perotambién se han encontrado pintadas en negro, naranja, amarillo y blanco, entre otros.En Venezuela, fueron indicadores territoriales de los sitios de enterramientos de un grupo.`, // 3
	],

	english: [
		`The <span style="color:red;font-style:italic"> Petroglyphs</span> are engravings of figures in bas-relief,on the surface of some rocks. Performed with different techniques of direct percussion or indirect, abrasion and / or scratching. The presence of these signs engraved on stone implies territoriality. The signs are recognized by members of one ethnic community, and identified as territorial markers by members of other communities, who fear and respect them.`, // 0

		`The meanings of the images in the<span style="color:red;font-style:italic"> Petroglyphs</span>, however, did vary. These are known to us in only a few cases and, in turn, defined their function. In some Venezuelan groups, the sacred function of the <span style="color:red;font-style:italic"> Petroglyphs</span>, is related to the transmission of rules, vital for the survival of the community. Its function as sacred objects, known among the ArawaK, is possibly expandable to other groups. In areas of the states Barinas, Carabobo and Amazonas among others, they seem to represent ceremonial centres.`, // 1

		`The <span style="color:blue;font-style:italic">Rock Paintings or Pictographs</span> are drawings made on rocks by means of the application of pigments. They were used in mineral substances such as oxides of iron, substances of animal origin, such as blood and fats, also coal and clays. they appear in caves and coats, protected from climate and visibility,since in many cases these were found accompanied by funeral bundles and they possibly functioned as protective symbols for the dead.`, // 2

		`Although <span style="color:blue;font-style:italic">Rock Paintings</span> are prehispanic in origin, they seem to cover a greater time span than Petroglyphs and have even been used in quite recent times in paintings that accompany the mortuary remains of contemporary indigenous groups, and spiritualistic rituals and Santeria tradition, which appear in large outdoor murals. Most of the Pictographs in the world are red, but also found painted in black, orange, yellow and white, among others. In Venezuela, the majority of Rock Paintings were territorial markers at aTribe’s sacred burial sites.`, // 3
	],
};

// Questions that appear on the quiz
const quiz_questions = {
	spanish: [
		{ // 0
			question: "Las Manifestaciones Rupestres son importantes porque: _____________",
			options: [ 
				"Son obras artísticas", // 0
				"Es posible trasladarlas de un sitio a otro", // 1
				"Son el intento más antiguo de comunicación humana", // 2
				"Se encuentran solo en África", // 3
			],
		},
		{ // 1
			question: "El ____________ permite acercarnos a las diversas expresiones gráficas, con los distintos contenidos de nuestras primeras sociedades",
			options: [ 
				"Dolmen", // 0
				"Agua", // 1
				"Arte Rupestre", // 2
				"Baile", // 3
			],
		},
		{ // 2
			question: "¿En cuáles de estas manifestaciones encontramos gráficos o dibujos, pintados o grabados?",
			options: [
				"Cerros Míticos Naturales", // 0
				"Pinturas Rupestres, Pictografías o Micropetroglifos", // 1
				"Puntos Acoplados", // 2
				"Solo Micropetroglifos", // 3
			],
		},
		{ // 3
			question: "Se llaman ____________ las representaciones del Ser humano -cuerpo entero, la cabeza, huellas de manos y pies...-",
			options: [
				"Figuras Geométricas", // 0
				"Figuras Zoomorfas", // 1
				"Figuras Antropomorfas", // 2
				"Figuras Geozoomorfas", // 3
			],
		},
		{ // 4
			question: "Las representaciones de imágenes más abstractas las llamamos ____________ o ____________",
			options: [
				"Zoomorfas o Antropomorfas", // 0
				"Antropomorfas o Geométricas/formas libres", // 1
				"Zoomorfas o Geométricas/formas libres", // 2
				"Geomorfas o Geométricas/formas libres", // 3
				"Geomorfas o Zoomorfas", // 4
				"Geomorfas o Antropomorfas", // 5
			],
		},
		{ // 5
			question: "Las figuras Zoomorfas son representaciones de:",
			options: [
				"Plantas", // 0
				"Animales", // 1
				"Seres humanos", // 2
				"Cestas", // 3
			],
		},
		{ // 6
			question: "La mezcla de figuras Antropomorfas con Zoomorfas genera representaciones _________________",
			options: [
				"Geoantropomorfas", // 0
				"Antropozoomorfas", // 1
				"Zoogeométricas", // 2
				"Zooantropogeométricas", // 3
			],
		},
		{ // 7
			question: "Realiza una figura no canónica de tu preferencia (que no tenga las tres partes del mismo tipo) e identifícala seleccionando su nombre",
			finishButton: "FINALIZAR",
			options: [
				`ANTROPOMORFA`, // 0
				`GEOMÉTRICA`, // 1
				`ZOOMORFA`, // 2
				`ANTROPOGEOMÉTRICA`, // 3
				`ANTROPOZOOMORFA`, // 4
				`ANTROPOGEOZOOMORFA`, // 5
				`ANTROPOZOOGEOMÉTRICA`, // 6
				`GEOANTROPOMORFA`, // 7
				`GEOZOOMORFA`, // 8
				`GEOANTROPOZOOMORFA`, // 9
				`GEOZOOANTROPOMORFA`, // 10
				`ZOOANTROPOMORFA`, // 11
				`ZOOGEOMÉTRICA`, // 12
				`ZOOANTROPOGEOMÉTRICA`, // 13
				`ZOOGEOANTROPOMORFA`, // 14
			],
		},
	],
	english: [
		{ // 0
			question: "The Rock Art expressions are important because: _____________________",
			options: [
				"They are artistic works", // 0
				"It is possible to transfer them from one site to another", // 1
				"They are the oldest attempt of human communication", // 2
				"They are located only in Africa", // 3
			],
		},
		{ // 1
			question: "The ____________________ allows us to reach the diverse graphic expressions, with the different contents of our first societies.",
			options: [
				"Dolmen", // 0
				"Water", // 1
				"Rock Art", // 2
				"Dance", // 3
			],					
		},
		{ // 2
			question: "In which of these Expressions do we find graphics or drawings, painted or engraved?",
			options: [
				"Mythical Natural Hills", // 0
				"Rock Art Paintings or Pictograms", // 1
				"Connected Points", // 2
				"Micro Petroglyphs", // 3
			],
		},
		{ // 3
			question: "_______________________ are human representations of the Human Being –whole body, head, hands and feet prints...-",
			options: [
				"Geometric figures", // 0
				"Zoomorphic figures", // 1
				"Anthropomorphic figures", // 2
				"Geozoomorphic figures", // 3
			],
		},
		{ // 4
			question: "Representation of more abstract images are called ______________, or _______________",
			options: [
				"Zoomorphic or Anthropomorphic", // 0
				"Anthropomorphic or Geometric/free figures", // 1
				"Zoomorphic or Geometric/free figures", // 2
				"Geomorphic or Geometric/free figures", // 3
				"Geomorphic or Zoomorphic", // 4
				"Geomorphic or Anthropomorphic", // 5
			],
		},
		{ // 5
			question: "Zoomorphic shapes are representations of:",
			options: [
				"Plants", // 0
				"Animals", // 1
				"Human beings", // 2
				"Baskets", // 3
			],
		},
		{ // 6
			question: "Combination of anthropomorphic and Zoomorphic shapes generates ___________________ representations",
			options: [
				"Geoanthropomorphic", // 0
				"Anthropozoomorphic", // 1
				"Zoogeometric", // 2
				"Zooanthropomorphic", // 3
			],
		},
		{ // 7
			question: "Make a non-canonical figure of your choice (that doesn't have the three parts of the same type) and identify it by selecting its name",
			finishButton: "FINISH",
			options: [
				`ANTHROPOMORPHIC`, // 0
				`GEOMETRIC`, // 1
				`ZOOMORPHIC`, // 2
				`ANTHROPOGEOMETRIC`, // 3
				`ANTHROPOZOOMORPHIC`, // 4
				`ANTHROPOGEOZOOMORPHIC`, // 5
				`ANTHROPOZOOGEOMETRIC`, // 6
				`GEOANTHROPOMORPHIC`, // 7
				`GEOZOOMORPHIC`, // 8
				`GEOANTHROPOZOOMORPHIC`, // 9
				`GEOZOOANTHROPOMORPHIC`, // 10
				`ZOOANTHROPOMORPHIC`, // 11
				`ZOOGEOMETRIC`, // 12
				`ZOOANTHROPOGEOMETRIC`, // 13
				`ZOOGEOANTHROPOMORPHIC`, // 14
			],
		},		
	],
};

const correctOptions = [2,2,1,2,3,1,1];

const sendEmail_texts = {
	spanish: [
		"Enviar resultados", // 0
		"Correo electrónico del estudiante:", // 1
		"Contraseña:", // 2
		"Mostrar contraseña", // 3
		"Correo electrónico del profesor:", // 4
		"Enviar", // 5
	],
	english: [
		"Submit results", // 0
		"Student's email:", // 1
		"Password:", // 2
		"Show password", // 3
		"Teacher's email:", // 4
		"Send", // 5
	]
}

const quizResults_texts = {
	spanish: [
		"Resultados", // 0
		"Arregla las respuestas", // 1
		"¡Muy bien!", // 2
		"Ganaste", // 3
		"puntos", // 4
		"Debes corregir las respuestas de las preguntas", // 5
		"¡Felicitaciones", // 6
		"Ganaste los", // 7
		"Intentar de nuevo", // 8
		"Regresar al menú principal", // 9

	],
	english: [
		"Results", // 0
		"Fix the answers", // 1
		"Very good!", // 2
		"You won", // 3
		"points", // 4
		"You must correct the answers of the questions", // 5
		"Congratulations", // 6
		"You won the", // 7
		"Try again", // 8
		"Back to main menu", // 9
	],
}

// Description of the combination of images that the user can stablish
var images_combinations_descriptions = {};

function initializeImagesDescriptions(){
	// Firstly we initialize the values of the objects as null
	for (i=0; i<possible_languages.length; i++){
		let newArray0 = [];
		for (j=0; j<3; j++){
			let newArray1 = [];
			for (k=0; k<3; k++){
				let newArray2 = [];
				for (m=0; m<3; m++){
					newArray2.push(0);
				}
				newArray1.push(newArray2);
			}
			newArray0.push(newArray1);
		}
		images_combinations_descriptions[possible_languages[i]] = newArray0;
	}

	let lang, descriptions, techniques;
	// Definitions in spanish
	descriptions = images_combinations_descriptions["spanish"];

	descriptions[0][0][0] = {
		description: "Figuras que representan al ser humano, de cuerpo entero, la cabeza, con huellas de manos y pies, como abstracción de la imagen",
		rotulos: [
			`Petroglifo<br> <span style="font-style:italic">Flopi di Nadro</span><br>Valcamónica<br>Italia, Europa`, // 0
			`Petroglifo<br> <span style="font-style:italic">Alia, Diosa de la<br> fertilidad y del amor</span><br>Arabia Saudita<br>África`, // 1
			`Pintura Rupestre<br> <span style="font-style:italic">Parque Nacional Kakadu</span><br>Australia<br>Oceanía`, // 2
			`Pintura Rupestre<br> <span style="font-style:italic">Parque Nacional Kakadu</span><br>Australia<br>Oceanía` // 3
		],
		kind: `ANTROPOMORFA`,
	};

	descriptions[1][1][1] = {
		description: `Representaciones con elementos gráficos como puntos, líneas, círculos, o imágenes abstractas, compuestas con los mismos elementos`,
		rotulos: [
			`Petroglifo<br> <span style="font-style:italic">Porte Caldelas</span><br>Pontevedra<br>España, Europa`, // 0
			`Petroglifo<br> <span style="font-style:italic">El Bolsillo</span><br>Río Guasanare,<br> estado Zulia<br>Venezuela, Sudamérica`, // 1
			`Pintura Rupestre<br> <span style="font-style:italic">Santo Rosario de<br> Agualinda</span><br>estado Amazonas<br>Venezuela, Sudamérica`, // 2
			`Pintura Rupestre<br> <span style="font-style:italic">La Pintada</span><br>Sonora<br>México, América del Norte`, // 3
		],
		kind: `GEOMÉTRICA`,
	};

	descriptions[2][2][2] = {
		description: `Figuras de animales o con sus rasgos, recreando<br>la naturaleza con un fin específico`,
		rotulos: [
			`Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`, // 0
			`Petroglifo<br> <span style="font-style:italic">Las Girafas</span><br>Tadrat Acacus<br>Argelia, África`, // 1
			`Pintura Rupestre<br> <span style="font-style:italic">Parque Nacional<br>Cerro de Capivara</span><br>Piaiui<br>Brasil, Sudamérica`, // 2
			`Pintura Rupestre<br> <span style="font-style:italic">Cerro Azul</span><br>Guaviare<br>Colombia, Sudamérica`, // 3
		],
		kind: `ZOOMORFA`,
	};

	descriptions[0][0][1] = descriptions[0][1][0] = descriptions[1][0][0] = {
		description: `Figuras Antropomorfas mezcladas con componentes Geométricos generan representaciones Antropogeométricas`,
		kind: `ANTROPOGEOMÉTRICA`,
	};

	descriptions[0][0][2] = descriptions[0][2][0] = descriptions[2][0][0] = {
		description: `Figuras Antropomorfas, mezcladas con componentes Zoomorfos generan representaciones Antropozoomorfas`,
		kind: `ANTROPOZOOMORFA`,
	};

	descriptions[0][1][2] = {
		description: `Figuras Antropomorfas, mezcladas con componentes Geométricos y Zoomorfos generan representaciones Antropogeozoomorfas`,
		kind: `ANTROPOGEOZOOMORFA`,
	};

	descriptions[0][2][1] = {
		description: `Figuras Antropomorfas, mezcladas con componentes Zoomorfos y Geométricos generan representaciones Antropozoogeométricas`,
		kind: `ANTROPOZOOGEOMÉTRICA`,
	};

	descriptions[1][1][0] = descriptions[1][0][1] = descriptions[0][1][1] = {
		description: `Figuras Geométricas mezcladas con componentes Antropomorfos generan representaciones Geoantropomorfas`,
		kind: `GEOANTROPOMORFA`,
	};

	descriptions[1][1][2] = descriptions[1][2][1] = descriptions[2][1][1] = {
		description: `Figuras Geométricas, mezcladas con componentes Zoomorfos generan representaciones Geozoomorfas`,
		kind: `GEOZOOMORFA`,
	};

	descriptions[1][0][2] = {
		description: `Figuras Geométricas, mezcladas con componentes Antropomorfos y Zoomorfos, generan representaciones Geoantropozoomorfas`,
		kind: `GEOANTROPOZOOMORFA`,
	};

	descriptions[1][2][0] = {
		description: `Figuras Geométricas, mezcladas con componentes Zoomorfos<br>y Antropomorfos, generan representaciones Geozooantropomorfas`,
		kind: `GEOZOOANTROPOMORFA`,
	};

	descriptions[2][2][0] = descriptions[2][0][2] = descriptions[0][2][2] = {
		description: `Figuras Zoomorfas, mezcladas con componentes Antropomorfos,<br>generan representaciones Zooantropomorfas`,
		kind: `ZOOANTROPOMORFA`,
	};

	descriptions[2][2][1] = descriptions[2][1][2] = descriptions[1][2][2] = {
		description: `Figuras Zoomorfas, mezcladas con componentes Geométricas generan representaciones Zoogeométricas`,
		kind: `ZOOGEOMÉTRICA`,
	};

	descriptions[2][0][1] = {
		description: `Figuras Zoomorfas, mezcladas con componentes Antropomorfos y Geométricos generan representaciones Zooantropogeométricas`,
		kind: `ZOOANTROPOGEOMÉTRICA`,
	};

	descriptions[2][1][0] = {
		description: `Figuras Zoomorfas, mezcladas con componentes Geométricos y Antropomorfos generan representaciones Zoogeoantropomorfas`,
		kind: `ZOOGEOANTROPOMORFA`,
	};

	// Definitions in english
	descriptions = images_combinations_descriptions["english"];

	descriptions[0][0][0] = {
		description: `Figures that represent the human being, whole body, head, hands and feet prints, image abstraction`,
		rotulos: [
			`Petroglyph<br> <span style="font-style:italic">Fopli di Nadro</span><br>Valcamonica<br>Italy, Europe`, // 0
			`Petroglyph<br> <span style="font-style:italic">Alia, Goddess of<br> Fertility and of Love</span><br>Saudi Arabia<br>Africa`, // 1
			`Rock Art Painting<br> <span style="font-style:italic">Kakadu National Park</span><br>Australia<br>Oceania`, // 2
			`Rock Art Painting<br> <span style="font-style:italic">Kakadu National Park</span><br>Australia<br>Oceania` // 3
		],
		kind: `ANTHROPOMORPHIC`,
	};

	descriptions[1][1][1] = {
		description: `Representation with graphic elements like dots, lines, circles, or images more abstract, formed with the same elements`,
		rotulos: [
			`Petroglyph<br> <span style="font-style:italic">Porte Caldelas</span><br>Pontevedra<br>Spain, Europe`, // 0
			`Petroglyph<br> <span style="font-style:italic">El Bolsillo</span><br>Guasanare river<br>Zulia State<br>Venezuela, South America`, // 1
			`Rock Art Painting<br> <span style="font-style:italic">Santo Rosario de Agualinda</span><br>State of Amazonas<br>Venezuela, South America`, // 2
			`Rock Art Painting<br> <span style="font-style:italic">La Pintada</span><br>State of Sonora<br>Mexico, North America`, // 3
		],
		kind: `GEOMETRIC`,
	};

	descriptions[2][2][2] = {
		description: `Animal figures with their own features recreating nature with a specific purpose`,
		rotulos: [
			`Petroglyph<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Peru, South America`, // 0
			`Petroglyph<br> <span style="font-style:italic">The Giraffes</span><br>Tadrat Acacus<br>Algeria, Africa`, // 1
			`Rock Art Painting<br> <span style="font-style:italic">Serra de Capivara<br> National Park</span><br>Piaiui<br>Brazil, South America`, // 2
			`Rock Art Painting<br> <span style="font-style:italic">Cerro Azul</span><br>Guaviare<br>Colombia, South America`, // 3
		],
		kind: `ZOOMORPHIC`,
	};

	descriptions[0][0][1] = descriptions[0][1][0] = descriptions[1][0][0] = {
		description: `Anthropomorphic figures combined with Geometric parts or components generate Anthropogeometric representations`,
		kind: `ANTHROPOGEOMETRIC`,
	};

	descriptions[0][0][2] = descriptions[0][2][0] = descriptions[2][0][0] = {
		description: `Anthropomorphic figures combined with Zoomorphic parts generate Anthropozoomorphic representations`,
		kind: `ANTHROPOZOOMORPHIC`,
	};

	descriptions[0][1][2] = {
		description: `Anthropomorphic figures combined with Geometric and Zoomorphic components generate Anthropogeozoomorphic representations`,
		kind: `ANTHROPOGEOZOOMORPHIC`,
	};

	descriptions[0][2][1] = {
		description: `Anthropomorphic figures combined with Zoomorphic and Geometric components generate Anthropozoogeometric representations`,
		kind: `ANTHROPOZOOGEOMETRIC`,
	};

	descriptions[1][1][0] = descriptions[1][0][1] = descriptions[0][1][1] = {
		description: `Geometric figures combined with Anthropomorphic components generate Geoanthropomorphic representations`,
		kind: `GEOANTHROPOMORPHIC`,
	};

	descriptions[1][1][2] = descriptions[1][2][1] = descriptions[2][1][1] = {
		description: `Geometric figures combined with Zoomorphic components generate Geozoomorphic representations`,
		kind: `GEOZOOMORPHIC`,
	};

	descriptions[1][0][2] = {
		description: `Geometric figures combined with Anthropomorphic and Zoomorphic components generate Geozooanthropomorphic representations`,
		kind: `GEOANTHROPOZOOMORPHIC`,
	};

	descriptions[1][2][0] = {
		description: `Geometric figures combined with Zoomorphic and Anthropomorphic components generate Geozooanthropomorphic representations`,
		kind: `GEOZOOANTHROPOMORPHIC`,
	};

	descriptions[2][2][0] = descriptions[2][0][2] = descriptions[0][2][2] = {
		description: `Zoomorphic figures combined with Anthropomorphic components generate Zooanthropomorphic representations`,
		kind: `ZOOANTHROPOMORPHIC`,
	};

	descriptions[2][2][1] = descriptions[2][1][2] = descriptions[1][2][2] = {
		description: `Zoomorphic figures combined with Geometric components generate Zoogeometric representations`,
		kind: `ZOOGEOMETRIC`,
	};

	descriptions[2][0][1] = {
		description: `Zoomorphic figures combined with Anthropomorphic and Geometric components generate Zooanthropogeometric representations`,
		kind: `ZOOANTHROPOGEOMETRIC`,
	};

	descriptions[2][1][0] = {
		description: `Zoomorphic figures combined with Geometric and Anthropomorphic components generate Zoogeoanthropomorphic representations`,
		kind: `ZOOGEOANTHROPOMORPHIC`,
	};
}
initializeImagesDescriptions();

// -----------------------------  IMAGES --------------------------------
const imagesThatVaryWithLanguage = {
	spanish: {
		presentacion: "img/text/presentacion.png",
		intro: "img/text/intro.png",
		instrucciones: "img/text/instrucciones.png",
		creditos: "img/text/creditos.png",
		contacto: "img/text/contacto.png",
	},
	english: {
		presentacion: "img/text/presentacion.png", // CAMBIAR
		intro: "img/text/intro.png", // CAMBIAR
		instrucciones: "img/text/instrucciones.png", // CAMBIAR
		creditos: "img/text/creditos.png", // CAMBIAR
		contacto: "img/text/contacto.png", // CAMBIAR
	},
}

var Root = "img/art/petroglyph1/";
const petroglyph1 = [
	[Root+"cabeza_antro_petro.png", Root+"cabeza_geo_petro.png", Root+"cabeza_zoo_petro.png"],
	[Root+"cuerpo_antro_petro.png", Root+"cuerpo_geo_petro.png", Root+"cuerpo_zoo_petro.png"],
	[Root+"inferior_antro_petro.png", Root+"inferior_geo_petro.png", Root+"inferior_zoo_petro.png"],
];

Root = "img/art/petroglyph2/";
const petroglyph2 = [
	[Root+"cabeza_antro_petro2.png", Root+"cabeza_geo_petro2.png", Root+"cabeza_zoo_petro2.png"],
	[Root+"cuerpo_antro_petro2.png", Root+"cuerpo_geo_petro2.png", Root+"cuerpo_zoo_petro2.png"],
	[Root+"inferior_antro_petro2.png", Root+"inferior_geo_petro2.png", Root+"inferior_zoo_petro2.png"],
];

Root = "img/art/rockPainting1/";
const rockPainting1 = [
	[Root+"cabeza_antro.png", Root+"cabeza_geo.png", Root+"cabeza_zoo.png"],
	[Root+"cuerpo_antro.png", Root+"cuerpo_geo.png", Root+"cuerpo_zoo.png"],
	[Root+"inferior_antro.png", Root+"inferior_geo.png", Root+"inferior_zoo.png"],
];

Root = "img/art/rockPainting2/";
const rockPainting2 = [
	[Root+"cabeza_antro2.png", Root+"cabeza_geo2.png", Root+"cabeza_zoo2.png"],
	[Root+"cuerpo_antro2.png", Root+"cuerpo_geo2.png", Root+"cuerpo_zoo2.png"],
	[Root+"inferior_antro2.png", Root+"inferior_geo2.png", Root+"inferior_zoo2.png"],
];

const possible_figures = [petroglyph1, petroglyph2, rockPainting1, rockPainting2]