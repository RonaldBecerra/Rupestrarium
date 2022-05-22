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
		description: "Figuras que representan al ser humano,<br>de cuerpo entero, la cabeza, con huellas de manos y pies,<br>como abstracción de la imagen",
		rotulos: [
			`Petroglifo<br> <span style="font-style:italic">Flopi di Nadro</span><br>Valcamónica<br>Italia, Europa`, // 0
			`Petroglifo<br> <span style="font-style:italic">Alia, Diosa de la<br> fertilidad y del amor</span><br>Arabia Saudita<br>África`, // 1
			`Pintura Rupestre<br> <span style="font-style:italic">Parque Nacional Kakadu</span><br>Australia<br>Oceanía`, // 2
			`Pintura Rupestre<br> <span style="font-style:italic">Parque Nacional Kakadu</span><br>Australia<br>Oceanía` // 3
		],
		kind: `ANTROPOMORFA`,
	};

	descriptions[1][1][1] = {
		description: `Representaciones con elementos gráficos<br>como puntos, líneas, círculos, etc., o imágenes abstractas,<br>compuestas con los mismos elementos`,
		rotulos: [
			`Petroglifo<br> <span style="font-style:italic">Porte Caldelas</span><br>Pontevedra<br>España, Europa`, // 0
			`Petroglifo<br> <span style="font-style:italic">El Bolsillo</span><br>Río Guasanare,<br> estado Zulia<br>Venezuela, Sudamérica`, // 1
			`Pintura Rupestre<br> <span style="font-style:italic">Santo Rosario de<br> Agualinda</span><br>estado Amazonas<br>Venezuela, Sudamérica`, // 2
			`Pintura Rupestre<br> <span style="font-style:italic">La Pintada</span><br>Sonora<br>México, América del Norte`, // 3
		],
		kind: `GEOMÉTRICA`,
	};

	descriptions[2][2][2] = {
		description: `Figuras de animales o con sus rasgos,<br>recreando la naturaleza con un fin específico`,
		rotulos: [
			`Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`, // 0
			`Petroglifo<br> <span style="font-style:italic">Las Girafas</span><br>Tadrat Acacus<br>Argelia, África`, // 1
			`Pintura Rupestre<br> <span style="font-style:italic">Parque Nacional<br>Cerro de Capivara</span><br>Piaiui<br>Brasil, Sudamérica`, // 2
			`Pintura Rupestre<br> <span style="font-style:italic">Cerro Azul</span><br>Guaviare<br>Colombia, Sudamérica`, // 3
		],
		kind: `ZOOMORFA`,
	};

	descriptions[0][0][1] = descriptions[0][1][0] = descriptions[1][0][0] = {
		description: `Figuras Antropomorfas, mezcladas con componentes Geométricos,<br>generan representaciones Antropogeométricas`,
		kind: `ANTROPOGEOMÉTRICA`,
	};

	descriptions[0][0][2] = descriptions[0][2][0] = descriptions[2][0][0] = {
		description: `Figuras Antropomorfas, mezcladas con componentes Zoomorfos,<br>generan representaciones Antropozoomorfas`,
		kind: `ANTROPOZOOMORFA`,
	};

	descriptions[0][1][2] = {
		description: `Figuras Antropomorfas, mezcladas con componentes<br>Geométricos y Zoomorfos,<br>generan representaciones Antropogeozoomorfas`,
		kind: `ANTROPOGEOZOOMORFA`,
	};

	descriptions[0][2][1] = {
		description: `Figuras Antropomorfas, mezcladas con componentes<br>Zoomorfos y Geométricos,<br>generan representaciones Antropozoogeométricas`,
		kind: `ANTROPOZOOGEOMÉTRICA`,
	};

	descriptions[1][1][0] = descriptions[1][0][1] = descriptions[0][1][1] = {
		description: `Figuras Geométricas, mezcladas con componentes Antropomorfos,<br>generan representaciones Geoantropomorfas`,
		kind: `GEOANTROPOMORFA`,
	};

	descriptions[1][1][2] = descriptions[1][2][1] = descriptions[2][1][1] = {
		description: `Figuras Geométricas, mezcladas con componentes Zoomorfos,<br>generan representaciones Geozoomorfas`,
		kind: `GEOZOOMORFA`,
	};

	descriptions[1][0][2] = {
		description: `Figuras Geométricas, mezcladas con componentes<br>Antropomorfos y Zoomorfos,<br>generan representaciones Geoantropozoomorfas`,
		kind: `GEOANTROPOZOOMORFA`,
	};

	descriptions[1][2][0] = {
		description: `Figuras Geométricas, mezcladas con componentes<br>Zoomorfos y Antropomorfos,<br>generan representaciones Geozooantropomorfas`,
		kind: `GEOZOOANTROPOMORFA`,
	};

	descriptions[2][2][0] = descriptions[2][0][2] = descriptions[0][2][2] = {
		description: `Figuras Zoomorfas, mezcladas con componentes Antropomorfos,<br>generan representaciones Zooantropomorfas`,
		kind: `ZOOANTROPOMORFA`,
	};

	descriptions[2][2][1] = descriptions[2][1][2] = descriptions[1][2][2] = {
		description: `Figuras Zoomorfas, mezcladas con componentes Geométricos,<br>generan representaciones Zoogeométricas`,
		kind: `ZOOGEOMÉTRICA`,
	};

	descriptions[2][0][1] = {
		description: `Figuras Zoomorfas, mezcladas con componentes<br>Antropomorfos y Geométricos,<br>generan representaciones Zooantropogeométricas`,
		kind: `ZOOANTROPOGEOMÉTRICA`,
	};

	descriptions[2][1][0] = {
		description: `Figuras Zoomorfas, mezcladas con componentes<br>Geométricos y Antropomorfos,<br>generan representaciones Zoogeoantropomorfas`,
		kind: `ZOOGEOANTROPOMORFA`,
	};

	// Definitions in english
	descriptions = images_combinations_descriptions["english"];

	descriptions[0][0][0] = {
		description: `Figures that represent the human being,<br>whole body, head, with hand and foot prints,<br>as an image abstraction`,
		rotulos: [
			`Petroglyph<br> <span style="font-style:italic">Fopli di Nadro</span><br>Valcamonica<br>Italy, Europe`, // 0
			`Petroglyph<br> <span style="font-style:italic">Alia, Goddess of<br> Fertility and of Love</span><br>Saudi Arabia<br>Africa`, // 1
			`Rock Art Painting<br> <span style="font-style:italic">Kakadu National Park</span><br>Australia<br>Oceania`, // 2
			`Rock Art Painting<br> <span style="font-style:italic">Kakadu National Park</span><br>Australia<br>Oceania` // 3
		],
		kind: `ANTHROPOMORPHIC`,
	};

	descriptions[1][1][1] = {
		description: `Representation with graphic elements<br>like dots, lines, circles, etc., or more abstract images,<br>formed with the same elements`,
		rotulos: [
			`Petroglyph<br> <span style="font-style:italic">Porte Caldelas</span><br>Pontevedra<br>Spain, Europe`, // 0
			`Petroglyph<br> <span style="font-style:italic">El Bolsillo</span><br>Guasanare river<br>Zulia State<br>Venezuela, South America`, // 1
			`Rock Art Painting<br> <span style="font-style:italic">Santo Rosario de Agualinda</span><br>State of Amazonas<br>Venezuela, South America`, // 2
			`Rock Art Painting<br> <span style="font-style:italic">La Pintada</span><br>State of Sonora<br>Mexico, North America`, // 3
		],
		kind: `GEOMETRIC`,
	};

	descriptions[2][2][2] = {
		description: `Animal figures with their own features,<br>recreating nature with a specific purpose`,
		rotulos: [
			`Petroglyph<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Peru, South America`, // 0
			`Petroglyph<br> <span style="font-style:italic">The Giraffes</span><br>Tadrat Acacus<br>Algeria, Africa`, // 1
			`Rock Art Painting<br> <span style="font-style:italic">Serra de Capivara<br> National Park</span><br>Piaiui<br>Brazil, South America`, // 2
			`Rock Art Painting<br> <span style="font-style:italic">Cerro Azul</span><br>Guaviare<br>Colombia, South America`, // 3
		],
		kind: `ZOOMORPHIC`,
	};

	descriptions[0][0][1] = descriptions[0][1][0] = descriptions[1][0][0] = {
		description: `Anthropomorphic figures, mixed with Geometric components,<br>generate Anthropogeometric representations`,
		kind: `ANTHROPOGEOMETRIC`,
	};

	descriptions[0][0][2] = descriptions[0][2][0] = descriptions[2][0][0] = {
		description: `Anthropomorphic figures, mixed with Zoomorphic components,<br>generate Anthropozoomorphic representations`,
		kind: `ANTHROPOZOOMORPHIC`,
	};

	descriptions[0][1][2] = {
		description: `Anthropomorphic figures,<br>mixed with Geometric and Zoomorphic components,<br>generate Anthropogeozoomorphic representations`,
		kind: `ANTHROPOGEOZOOMORPHIC`,
	};

	descriptions[0][2][1] = {
		description: `Anthropomorphic figures,<br>mixed with Zoomorphic and Geometric components,<br>generate Anthropozoogeometric representations`,
		kind: `ANTHROPOZOOGEOMETRIC`,
	};

	descriptions[1][1][0] = descriptions[1][0][1] = descriptions[0][1][1] = {
		description: `Geometric figures, mixed with Anthropomorphic components,<br>generate Geoanthropomorphic representations`,
		kind: `GEOANTHROPOMORPHIC`,
	};

	descriptions[1][1][2] = descriptions[1][2][1] = descriptions[2][1][1] = {
		description: `Geometric figures, mixed with Zoomorphic components,<br>generate Geozoomorphic representations`,
		kind: `GEOZOOMORPHIC`,
	};

	descriptions[1][0][2] = {
		description: `Geometric figures,<br>mixed with Anthropomorphic and Zoomorphic components,<br>generate Geozooanthropomorphic representations`,
		kind: `GEOANTHROPOZOOMORPHIC`,
	};

	descriptions[1][2][0] = {
		description: `Geometric figures,<br>mixed with Zoomorphic and Anthropomorphic components,<br>generate Geozooanthropomorphic representations`,
		kind: `GEOZOOANTHROPOMORPHIC`,
	};

	descriptions[2][2][0] = descriptions[2][0][2] = descriptions[0][2][2] = {
		description: `Zoomorphic figures, mixed with Anthropomorphic components,<br>generate Zooanthropomorphic representations`,
		kind: `ZOOANTHROPOMORPHIC`,
	};

	descriptions[2][2][1] = descriptions[2][1][2] = descriptions[1][2][2] = {
		description: `Zoomorphic figures, mixed with Geometric components,<br>generate Zoogeometric representations`,
		kind: `ZOOGEOMETRIC`,
	};

	descriptions[2][0][1] = {
		description: `Zoomorphic figures,<br>mixed with Anthropomorphic and Geometric components,<br>generate Zooanthropogeometric representations`,
		kind: `ZOOANTHROPOGEOMETRIC`,
	};

	descriptions[2][1][0] = {
		description: `Zoomorphic figures,<br>mixed with Geometric and Anthropomorphic components,<br>generate Zoogeoanthropomorphic representations`,
		kind: `ZOOGEOANTHROPOMORPHIC`,
	};
}
initializeImagesDescriptions();