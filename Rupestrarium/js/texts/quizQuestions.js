// Questions that appear on the quiz
const quiz_questions = {
	spanish: [
		{ // 0
			question: "1- Las Manifestaciones Rupestres son importantes porque: _____________",
			options: [ 
				"Son obras artísticas", // 0
				"Es posible trasladarlas de un sitio a otro", // 1
				"Son el intento más antiguo de comunicación humana", // 2
				"Se encuentran solo en África", // 3
			],
		},
		{ // 1
			question: "2- El ____________ permite acercarnos a las diversas expresiones gráficas, con los distintos contenidos de nuestras primeras sociedades",
			options: [ 
				"Dolmen", // 0
				"Agua", // 1
				"Arte Rupestre", // 2
				"Baile", // 3
			],
		},
		{ // 2
			question: "3- ¿En cuáles de estas manifestaciones encontramos gráficos o dibujos, pintados o grabados?",
			options: [
				"Cerros Míticos Naturales", // 0
				"Pinturas Rupestres, Pictografías o Micropetroglifos", // 1
				"Puntos Acoplados", // 2
				"Solo Micropetroglifos", // 3
			],
		},
		{ // 3
			question: "4- Se llaman ____________ las representaciones del Ser humano -cuerpo entero, la cabeza, huellas de manos y pies...-",
			options: [
				"Figuras Geométricas", // 0
				"Figuras Zoomorfas", // 1
				"Figuras Antropomorfas", // 2
				"Figuras Geozoomorfas", // 3
			],
		},
		{ // 4
			question: "5- Las representaciones de imágenes más abstractas las llamamos _________, o _________",
			options: [
				"Zoomorfas", // 0
				"Antropomorfas", // 1
				"Geométricas o formas libres", // 2
				"Geomorfas", // 3
			],
		},
		{ // 5
			question: "6- Las figuras Zoomorfas son representaciones de:",
			options: [
				"Plantas", // 0
				"Animales", // 1
				"Seres humanos", // 2
				"Cestas", // 3
			],
		},
		{ // 6
			question: "7- La mezcla de figuras Antropomorfas con Zoomorfas genera representaciones ___________",
			options: [
				"Geoantropomorfas", // 0
				"Antropozoomorfas", // 1
				"Zoogeométricas", // 2
				"Zooantropogeométricas", // 3
			],
		},
		{ // 7
			question: "8- Realiza una figura <span style='color:red'>no básica</span> que prefieras e identifícala,<br>seleccionando su nombre en el recuadro de abajo",
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
			question: "1- The Rock Art expressions are important because: _________________",
			options: [
				"They are artistic works", // 0
				"It is possible to transfer them from one site to another", // 1
				"They are the oldest attempt of human communication", // 2
				"They are located only in Africa", // 3
			],
		},
		{ // 1
			question: "2- The ____________________ allows us to reach the diverse graphic expressions, with the different contents of our first societies.",
			options: [
				"Dolmen", // 0
				"Water", // 1
				"Rock Art", // 2
				"Dance", // 3
			],					
		},
		{ // 2
			question: "3- In which of these Expressions do we find graphics or drawings, painted or engraved?",
			options: [
				"Mythical Natural Hills", // 0
				"Rock Art Paintings or Pictograms", // 1
				"Connected Points", // 2
				"Micro Petroglyphs", // 3
			],
		},
		{ // 3
			question: "4- ______________ are human representations of the Human Being –whole body, head, hands and feet prints...-",
			options: [
				"Geometric figures", // 0
				"Zoomorphic figures", // 1
				"Anthropomorphic figures", // 2
				"Geozoomorphic figures", // 3
			],
		},
		{ // 4
			question: "5- Representations of more abstract images are called ______________, or _______________",
			options: [
				"Zoomorphic", // 0
				"Anthropomorphic", // 1
				"Geometric or free figures", // 2
				"Geomorphic", // 3
			],
		},
		{ // 5
			question: "6- Zoomorphic shapes are representations of:",
			options: [
				"Plants", // 0
				"Animals", // 1
				"Human beings", // 2
				"Baskets", // 3
			],
		},
		{ // 6
			question: "7- Combination of anthropomorphic and Zoomorphic shapes generates _____________ representations",
			options: [
				"Geoanthropomorphic", // 0
				"Anthropozoomorphic", // 1
				"Zoogeometric", // 2
				"Zooanthropomorphic", // 3
			],
		},
		{ // 7
			question: "8- Make a <span style='color:red'>non-basic</span> figure that you prefer and identify it,<br>by selecting its name in the box below",
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

// Index of the correct option in each of the questions except the last one
const correctOptions = [2,2,1,2,2,1,1];