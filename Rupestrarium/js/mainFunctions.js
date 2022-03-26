/*  
 *  These functions let change the app state
 *
*/

function getRandomInt(min, max){
	return Math.floor(Math.random(min, max) * (max - min)) + min;
}

// Here we put everything that needs to be initialized when the page is loaded
window.onload = function(){
	generateColumnMenus();
	change_language('spanish');
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetInnerHTML(["main-background"]); // Put the background image of the central section
	loadCentralImage(5); // Put the initial central image in its place (it is not the same as the background)
}

// To poblate the "leftColumnMenu" and "rightColumnMenu" divs
function generateColumnMenus(){
	let str, div, i, j;
	i = k = 0;

	// --- Left side
	div = document.getElementById("leftColumnMenu");
	str = "";
	while(i < 5){ // Number of buttons on the left side
		str += `<button class="menuButton darkRed_mb" onclick="restoreButtonsColor(); this.style.background='black'; loadCentralImage(`+i.toString()+`)">`;
		str += `<b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
		i += 1;
	}
	str += `<img id="image_Y" style="width: 100%; height: 80%" src="img/Cueva_de_las_manos.jpg">`;
	div.innerHTML = str;

	// --- Right side
	div = document.getElementById("rightColumnMenu");
	str = "";
	while (k < 4){ // Number of buttons with the same structure on the right side: petroglyphs and rock paintings
		str += `<button class="menuButton ` + ((k < 2) ? `gray_mb` : `orange_mb`) + `" onclick="restoreButtonsColor(); this.style.background='black'; rec=0;`;
		str += `loadDef(`+k.toString()+`); loadFigure(`+k.toString()+`); getDescription();">`;
		str += `<b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
		k += 1;
		i += 1;
	}
	// "Recapitulate" and "For teachers only" buttons
	str += `<button class="menuButton red_mb" onclick="restoreButtonsColor(); this.style.background='black'; loadRec()"><b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
	str += `<button class="menuButton red_mb"><b id="textButton`+(i+1).toString()+`" class="text_mb"></b></button>`;

	// Here there will be the description of the current petroglyph or rock painting, and if neither of those is selected there will be an image: "Sur_de_marruecos.jpg"
	str += `<div id="def" class="centeredFlex" style="flex-direction: row; width: 100%; height: 80%"></div>`;
	div.innerHTML = str;
}

function change_language(newLanguage){
	if (language !== newLanguage){
		language = newLanguage;
		
		// We translate the texts of the buttons
		let texts = buttons_texts[newLanguage];
		for (i=0; i < texts.length; i++){
			document.getElementById('textButton' + i.toString()).innerHTML = texts[i];
		}
		
		if(figures > -1){
			loadDef(type);
			if (rec < 1){
				getDescription();
			}
		}

		// This makes the question and answers of the quiz load again with the new language
		if(rec == 1){
			if (pregunta < quiz_questions[language].length - 1){
				pregunta -= 1;
			}
			nextPreg(false);
		}
	}
}

// Make empty the inner of a HTML object
function resetInnerHTML(array){
	for (i=0; i < array.length; i++){
		let str = array[i];
		let elem = document.getElementById(array[i]);

		// Reset the default background image of the central section
		if (str === "main-background"){
			elem.style.backgroundImage = "url('img/fondo_petro.png')";
		}
		else {
			elem.innerHTML = "";
		}
	}
}

// Since menu buttons turn black when selected, when we choose another we must first restore the color of the previous one.
// We are currently not controlling which one was selected, so we have to iterate over them all
function restoreButtonsColor(){
	var elems = document.getElementsByTagName('button');
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.removeProperty('background'); // This property is which could have the black color
	}
}

// Load definitions of Petroglyphs and Rock Paintings or to restore the "Sur_de_marruecos.jpg" image
function loadDef(num=null){
	var div = document.getElementById("def");

	// Case when we must put the "Sur_de_marruecos.jpg" image in its position
	if (num == null){
		div.innerHTML = `<img class="whole" src="img/Sur_de_marruecos.jpg">`;
	}

	// Case when we must load the definition of a Petroglyph or Rock painting
	else{
		type = num;
		const fontSize = '1.75';

		let str = `<p style="width: 95%; text-align: justify; font-family: 'FontTexto'; font-size:`+fontSize+`vmin"><b>`
		str += definitions_texts[language][num];
		str += `</b></p>`;

		div.innerHTML = str;
	}
}

function loadInfoDocente(){
	espdoc = 1;
	figures = -1;
	resetInnerHTML(["hands", "head", "body", "bot", "img", "desc", "rotulos", "main-background", "rec"]);
	nextInfo();
}

function nextInfo(){
	if(language == 'spanish'){
		nextInfoEs();
	}else{
		nextInfoEn();
	}
}

function nextInfoEs(){
	document.getElementById("espdoc").innerHTML =
		`<img style="position:absolute; top:4vh; width:35vw; left:12.5vw;height:25vw;" src="img/cuadro.png">
		<img onclick="submitA(0);nextPreg()" style="position:absolute; height:10vh;bottom:1vh; right: 1vw;" onmouseover="this.src='img/derblue.png'" onmouseout="this.src='img/derecha.png'" src="img/derecha.png"> 
		<form style="position:absolute; top:7vh;left:19vw">
			<p style="width:15em;">
				<b>¡Hola, bienvenido(a) al espacio docente! Por favor ingrese sus datos para enviarle los resultados de sus alumnos</b><br><hr><br>
				<label>Nombre de la maestra</label><input type="text" name ="NombreMaestra" placeholder ="Ingrese su nombre" > <br>
				<label>Nombre del alumno</label><input type="text" name ="NombreAlumno" placeholder ="Ingrese nombre del estudiante" > <br>
				<label>Correo electrónico</label><input type ="email" name="CorreoMaestra" placeholder = "Ingrese su correo"> 
			</p>
		</form>`
}

function nextInfoEn(){
	document.getElementById("espdoc").innerHTML =
		`<img style="position:absolute; top:4vh;width:35vw;left:12.5vw;height:25vw;" src="img/cuadro.png">
		<img onclick="submitA(0);nextPreg()" style="position:absolute; height:10vh;bottom:1vh; right: 1vw;" onmouseover="this.src='img/derblue.png'" onmouseout="this.src='img/derecha.png'" src="img/derecha.png"> 
		<form style="position:absolute; top:7vh;left:19vw">
			<p style="width:15em;">
				<b>Welcome teacher! Please enter your name and email in order to send you your students' grades</b><br><hr><br>
				<label>Teacher's name</label><input type="text" name ="NombreMaestra" placeholder ="Enter your name" > <br>
				<label>Student's Name</label><input type="text" name ="NombreAlumno" placeholder ="Enter your student's name" > <br>
				<label>Email</label><input type ="email" name="CorreoMaestra" placeholder = "Enter your email"> 
			</p>
		</form>`
}

// Recapitulate
function loadRec(){
	pregunta = 0;
	figures = -1;
	rec = 1;
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetInnerHTML(["hands", "head", "body", "bot", "img", "desc", "rotulos", "espdoc", "main-background"]);
	nextPreg();
}

function nextPreg(generateFigure=true){
	let str;
	let questions = quiz_questions[language];
	let currentQ = questions[pregunta];

	if (pregunta == questions.length - 1){
		if (generateFigure){
			// The 4 is the number of currently available figures, that is the max index plus one
			loadFigure(getRandomInt(0,4));
		}

		str = `<img style="position:absolute; top:4vh;width:48vw;left:4vw;height:7vh;" src="img/cuadro.png">`;
		str += `<img onclick="submitA(` + pregunta.toString() +`);submitForm()" style="position:absolute; height:6vh;bottom:11vh; right: 24vw;" src="` + imagesThatVaryWithLanguage[language].end + `">`;

		str += `<form style="position:absolute; top:4vh;left:14vw"><p style="width:30em; height:7vh;line-height:17px;font-family: 'FontTexto'">`;

		// Question
		str += `<b style="font-size:2vmin">` + currentQ.question + `</b><br>`;
		str += `</p></form>`

		// Answer
		str += `<input style="position:absolute;bottom:4vh;left: 40%" type="text" name="p` + pregunta.toString() + `" value="Name" checked>`;
	} else {
		str = `<img style="position:absolute; top:4vh;width:35vw;left:12.5vw;height:25vw;" src="img/cuadro.png">`;
		str += `<img onclick="submitA(` + pregunta.toString()+`);nextPreg()" style="position:absolute; height:10vh;bottom:2vh; right: 2vw;" onmouseover="this.src='img/derblue.png'" onmouseout="this.src='img/derecha.png'" src="img/derecha.png">`
		
		if (pregunta == 4){
			str += `<form style="position:absolute; top:7vh;left:13vw"><p style="width:22em;font-family: 'FontTexto'">`;
		} else {
			str += `<form style="position:absolute; top:7vh;left:15vw"><p style="width:15em;font-family: 'FontTexto'">`;
		}

		// Question
		str += `<b>` + currentQ.question + `</b><br>`

		// Possible answers
		let possibleAnswers = currentQ.options;
		for (i=0; i < possibleAnswers.length; i++){
			str += `<input type="radio" name="p`+ pregunta.toString() + `" value="` + i.toString() + `"` + ((i==0) ? `checked>` : `>`) + possibleAnswers[i] + `<br>`;
		}

		// FINAL PART
		str += `</p></form>`;

		pregunta += 1;
	}
	document.getElementById("rec").innerHTML = str;
}

// Submit an answer
function submitA(num){
	// Note that we must not add the "checked" to the last answer (position 7 currently, that is actually the 8th)
	const str = 'input[name=p' + num.toString() + ((num == 7) ? ']' : ']:checked');
	userAnswers[num] = document.querySelector(str).value;
}

// Submit the complete form to the teacher
function submitForm(){
	// *** FALTA SEPARAR LOS DOS IDIOMAS EN ESTA LíNEA
	let str = "mailto:INGRESE_SU_CORREO_AQUI@gmail.com?Subject=Respuestas Rupestrarium&body=";
	let questions = quiz_questions[language];
	let currentQ = questions[0];

	// First question
	str += "1-" + currentQ.question + "%0D%0A  " + currentQ.options[userAnswers[0]];

	// Middle questions
	let i = 1;
	let ind = 2;
	while (i < questions.length - 1){
		currentQ = questions[i];
		str += "%0D%0A%0D%0A" + ind.toString() + currentQ.question + "%0D%0A  " + currentQ.options[userAnswers[i]];
		i += 1;
		ind += 1;
	}

	// Last question
	currentQ = questions[i]
	str += "%0D%0A%0D%0A" + ind.toString() + currentQ.question + "%0D%0A  "
		+ "Cabeza: " + parts[head_body_lower[0]] 
		+ "%0D%0A  Cuerpo: " + parts[head_body_lower[1]] 
		+ "%0D%0A  Inferior: " + parts[head_body_lower[2]] 
		+ "%0D%0A    Respuesta:  " +currentQ.options[userAnswers[i]];

	window.location.href = str;
}

/* Loads an image that will be shown in the center.
   Normally that image has text, so it cannot be automatically translated when the language is changed.
   Another image should be loaded in that case (NOT IMPLEMENTED YET)
*/
function loadCentralImage(num){
	figures = -1;
	rec = 0;
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetInnerHTML(["hands", "head", "body", "bot", "rec", "desc", "rotulos", "espdoc", "main-background"]);
	
	let im = imagesThatVaryWithLanguage[language];
	const imagesSources = [im.presentacion_nuevo, im.intro_nuevo, im.instruc_nuevo, im.creditos_nuevo, im.contacto_nuevo, "img/imagen_inicial.png"];

	document.getElementById("img").innerHTML = 
		'<img class="whole" style="position: relative" src='+imagesSources[num]+'>';
}

// Get description of the current image according to which combination the user has stablished
function getDescription(){
	resetInnerHTML(["rotulos"]);
	let color = ((figures == 0) ? 'white' : 'black');
	let object = images_combinations_descriptions[language][head_body_lower[0]][head_body_lower[1]][head_body_lower[2]];

	if ((object.rotulos!= null) && (object.rotulos[type] != null)){
		document.getElementById("rotulos").innerHTML = 
			`<p style="font-family:'FontTexto';color:` + color + `; text-align:center;font-size:1.75vh; position:absolute; bottom:9vh"><b>` + object.rotulos[type] + `</b></p>`;
	}
	document.getElementById("desc").innerHTML = 
		`<p style='position:absolute;top:0px; left: 70px; margin:auto; text-align: center; font-family:"FontTexto"; font-size: 2.5vh;text-align: center;font-weight:600;width:35em;color:` + color +`;'>`+ object.description + `</p>`

		+ `<p style='position:absolute; bottom:0px; left:70px; margin: auto; text-align:center; font-family:"FontSub";font-size:3vh;font-weight:600; width:30em; color:` + color +`;'>` + object.kind + `</p>`;
}

// Load the corresponding figure, divided into three sections 
function loadFigure(num){
	type = num;
	switch (num){
		case 0:
			figures = 0;
			currentFigure = petroglyph1;
			resetInnerHTML(["main-background"]);
			break;
		case 1:
			figures = 0;
			currentFigure = petroglyph2;
			resetInnerHTML(["main-background"]);
			break;
		case 2:
			figures = 1;
			currentFigure = rockPainting1;
			document.getElementById("main-background").style.backgroundImage = "url('img/art/fondo_pintura.png')";
			break;
		case 3:
			figures = 1;
			currentFigure = rockPainting2;
			document.getElementById("main-background").style.backgroundImage = "url('img/art/fondo_pintura.png')";
			break;
		default:
			break;
	}

	if (rec == 0){
		// We reset the sliding moves that the user could have done (ASK IF IT IS NECESSARY)
		head_body_lower = [0, 0, 0];				
	} else {
		head_body_lower = [getRandomInt(0,3), getRandomInt(0,3), getRandomInt(0,3)];		
	}

	resetInnerHTML(["img", "rec", "espdoc", "desc"]);
	loadHands();
	buildFigure();
}

// Hands (arrows) that let the user slide the sections of the figures
function loadHands(){
	let str = ``;
	let array = [`left`, `right`];
	let desp, height;
	height = 12; // ESTA MEDIDA ES ABSOLUTA, NO PROPORCIONAL A LA PANTALLA (MANEJAR ESTO)
	for (i=0; i<3; i++){
		for (j=0; j<2; j++){
			desp = height * (i+1); 
			str += `<img onclick="slideFigure(` + i.toString() + `,` + j.toString() + `); ` + ((rec == 0) ? `getDescription()" ` : `" `) ;
			str += `onmouseover="this.style.height='2.5vh'" onmouseout="this.style.height='2vh'" style="position: absolute; height: 2vh;`
			str += array[j] + `: 27%;top: calc(40px + ` + desp.toString() + `vh);" src="img/art/arrow_` + array[j] + ((figures == 0) ? `` : `_pint`) + `.png" >`;
			// TAMBIÉN MANEJAR EL 195, QUE DEBE SER IGUAL AQUÍ QUE EN BUILDFIGURE
		}
	}
	document.getElementById("hands").innerHTML = str;
}

// Slide one of the three sections of the figre to the left or to the right
function slideFigure(figurePosition, leftRight){
	if (leftRight == 0){ // Slide to the left
		head_body_lower[figurePosition] -= 1;
		if (head_body_lower[figurePosition] < 0){
			head_body_lower[figurePosition] = 2;
		}
	} else { // Slide to the right
		head_body_lower[figurePosition] += 1;
		if (head_body_lower[figurePosition] > 2){
			head_body_lower[figurePosition] = 0;
		}				
	}
	let array = [false, false, false];
	array[figurePosition] = true;
	buildFigure(array)
}

// Build the three sections of the figure
function buildFigure(array = [true, true, true]){
	let sections = ["head", "body", "bot"];
	let desp, str, height;
	height = 12; // ESTA MEDIDA ES ABSOLUTA, NO PROPORCIONAL A LA PANTALLA (MANEJAR ESTO)

	for (i=0; i<3; i++){
		if (array[i]){
			desp = height * (i+1); 
			str = `<img style="position: absolute; height:` + height.toString() + `vh; left: 0; right:0; margin: auto; top: calc(10px + ` + desp.toString() + `vh);"`
			str += `src=` + currentFigure[i][head_body_lower[i]] + `>`;
			document.getElementById(sections[i]).innerHTML = str;
			// TAMBIÉN MANEJAR EL 195, QUE DEBE SER IGUAL AQUÍ QUE EN LOADHANDS
		}
	}
}