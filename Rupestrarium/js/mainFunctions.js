/*  
 *  These functions let change the app state
 *
 */

function getRandomInt(min, max){
	return Math.floor(Math.random(min, max) * (max - min)) + min;
}

// Here we put everything that needs to be initialized when the page is loaded
window.onload = async function(){
	generateColumnMenus();
	change_language('spanish');
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetDiv("main-background"); // Put the background image of the central section
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
		str += `<button class="menuButton darkRed_mb" onclick="restoreDefaultValues(); this.style.background='black'; loadCentralImage(`+i.toString()+`);">`;
		str += `<b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
		i += 1;
	}
	str += `<img id="image_Y" style="width: 100%; height: 80%" src="img/Cueva_de_las_manos.jpg">`;
	div.innerHTML = str;

	// --- Right side
	div = document.getElementById("rightColumnMenu");
	str = "";
	while (k < 4){ // Number of buttons with the same structure on the right side: petroglyphs and rock paintings
		str += `<button class="menuButton ` + ((k < 2) ? `gray_mb` : `orange_mb`) + `" onclick="restoreDefaultValues(); this.style.background='black';`;
		str += `loadDef(`+k.toString()+`)">`;
		str += `<b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
		k += 1;
		i += 1;
	}
	// "Recapitulate" and "For teachers only" buttons
	str += `<button class="menuButton red_mb" onclick="restoreDefaultValues(); this.style.background='black'; loadQuiz()"><b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
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

		// We translate the texts of the of the main labels (title and vertical texts)
		let elem, div;
		texts = mainLabels_texts[newLanguage];
		for (i=0; i < texts.length; i++){
			elem = texts[i];
			div = document.getElementById(elem[0]);
			if (div !== null){
				div.innerHTML = elem[1];
			}	
		}
		
		// Case when there is a figure on the view and the user is not solving the quiz
		// NOTE: A non-empty string works as a "true"
		if(figures && !quiz){
			getDescription();
		}

		// This makes the question and answers of the quiz load again with the new language
		if(quiz){
			numQuestion -= 1;
			nextQuestion(false);
		}
	}
}

// Load definitions of Petroglyphs and Rock Paintings or to restore the "Sur_de_marruecos.jpg" image
function loadDef(num=null){
	var div = document.getElementById("def");
	var mainRightLabel = document.getElementById("main-right-label"); // Vertical text on the right of the total view

	// Case when we must put the "Sur_de_marruecos.jpg" image in its position with its text
	if (num == null){
		div.innerHTML = `<img class="whole" src="img/Sur_de_marruecos.jpg">`;
		mainRightLabel.innerHTML = mainLabels_texts[language][2][1];
	}

	// Case when we must load the definition of a Petroglyph or Rock painting
	else{
		loadFigure(num);
		let str = `<p style="width:95%; text-align:justify; font-family:'FontTexto'; font-size:0.85vmax"><b>`;
		str += definitions_texts[language][num];
		str += `</b></p>`;

		div.innerHTML = str;
		mainRightLabel.innerHTML = '';
	}
}

// Restablish a div to its default state
function resetDiv(id){
	let div = document.getElementById(id);
	// Reset the default background image of the central section
	if (id === "main-background"){
		div.style.backgroundImage = "url('img/fondo_petro.png')";
	}
	else{
		div.innerHTML = "";
	}
}

/* Loads an image that will be shown in the center.
   Normally that image has text, so it cannot be automatically translated when the language is changed.
   Another image should be loaded in that case (NOT IMPLEMENTED YET)
 */
function loadCentralImage(num){
	poblateMainBackground('centralImage_view');
	figures = null;

	let im = imagesThatVaryWithLanguage[language];
	const imagesSources = [im.presentacion, im.intro, im.instrucciones, im.creditos, im.contacto, "img/imagen_inicial.png"];

	// For the initial image we must put a vertical text on its side
	if (num == 5){
		let div = document.getElementById("central-image-label");
		div.style.display = "flex";
		div.innerHTML = mainLabels_texts[language][3][1];
	}
	document.getElementById("img").src = imagesSources[num];
}

/* The "main-background" div can have different inner HTML objects depending to the case.
   Here we build that internal part according to the case
 */
function poblateMainBackground(kind){
	let div = document.getElementById("main-background");

	switch (kind){
		// When we put the image that appears on the beginning, or those that are invoked with the left buttons
		case "centralImage_view":
			div.innerHTML = 
				`<div class="img-side">
					<div id="central-image-label" class="vertical-text-bottom-to-top" 
						style="display:none; text-align:right">
					</div>
				</div>

				<img id="img" class="whole">

				<div class="img-side"></div>`;
			break;

		// When we put the figure divided in three parts that the user can slide
		case "sliderFigure_view":
			div.innerHTML =
				`<div class="whole" style="flex-direction:column">
					<div id="desc" class="whole centeredFlex" style="height:17%"></div>

					<div id="head" class="whole centeredFlex" style="height:20%; flex-direction:row"></div>
					<div id="body" class="whole centeredFlex" style="height:20%; flex-direction:row"></div>
					<div id="feet" class="whole centeredFlex" style="height:20%; flex-direction:row"></div>

					<div id="rotulos" class="whole" 
						style="display: flex; flex-direction:row; justify-content: flex-start; 
								align-items: flex-start; height:11%; padding-top:10px">
					</div>

					<div id="kind" class="whole centeredFlex" style="z-index:1; height:12%"></div>
				</div>`;
			break;

		// When the user is answering one of the questions of the quiz, except the last one, that has a slider figure
		// Note that the form label is which must have the blackborder if we want that the border
		// changes its size according to the text.
		case "quizQuestion_view":
			div.innerHTML =
				`<div class="whole" style="flex-direction:column">
					<div class="whole centeredFlex" style="height:77%">
						<form class="whiteBackground_blackBorder" style="width:70%">
							<p id="question" style="position:relative; font-family:'FontTexto'; text-align:justify"></p>
						</form>
					</div>

					<div class="whole" style="height:23%; display:flex; flex-direction:row">
						<div style="width: 70%"></div>
						<div id="handToRight" class="centeredFlex" style="height:100%; width:30%"></div>
					</div>
				</div>`;
			break;

		// Form in which the user enters their email and the teacher's
		case "sendEmail_view":
			div.innerHTML =
				`<div class="whole" style="flex-direction:column">
					<div id="desc" class="whole centeredFlex" style="height:16%"></div>

					<div id="useremail" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>
					<div id="userpassword" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>
					<div id="teacheremail" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>

					<div id="sendButton" class="whole" style="height:15%; flex-direction:row"></div>
				</div>`;
			break;

		// It gives the results of the quiz, and if it was the first attempt, it lets the user to try one more time
		case "quizResults_view":
			div.innerHTML =
				`<div class="whole" style="flex-direction:column">
					<div id="desc" class="whole centeredFlex" style="height:16%"></div>

					<div id="useremail" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>
					<div id="userpassword" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>
					<div id="teacheremail" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>

					<div id="sendButton" class="whole" style="height:15%; flex-direction:row"></div>
				</div>`;
			break;

		default:
			break;	
	}
}

// In this function we also restore variables that indicate the state of the view to their default values
function restoreDefaultValues(){
	figures = quiz = espdoc = false;
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetDiv("main-background"); // Restore the default background of the central section

	// Since menu buttons turn black when selected, when we choose another we must first restore the color of the previous one.
	// We are currently not controlling which one was selected, so we have to iterate over them all.
	var elems = document.getElementsByTagName('button');
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.removeProperty('background'); // This property is which could have the black color
	}
}

// Recapitulate
function loadQuiz(){
	numQuestion = 0;
	quiz = true;
	poblateMainBackground("quizQuestion_view");
	nextQuestion();
}

// Gets the question of the quiz to display and increases the number of current question in 1
function nextQuestion(notReloading=true){
	let questions = quiz_questions[language];
	let currentQ = questions[numQuestion];
	
	if (numQuestion < questions.length - 1){
		let possibleAnswers = currentQ.options;
		let str = '';
		for (i=0; i < possibleAnswers.length; i++){
			str += `<input type="radio" name="p`+ numQuestion.toString() + `" value="` + i.toString() + `"` + ((i==0) ? `checked>` : `>`) + possibleAnswers[i] + `<br>`;
		}

		// Here we put the question followed by its possible answers
		document.getElementById("question").innerHTML = `<b>` + currentQ.question + `</b><br><br>` + str;

		// Here we put the image of the hand to advance to the next question
		document.getElementById("handToRight").innerHTML =
			`<img onclick="submitA(` + numQuestion.toString()+`); nextQuestion()" style="position:relative; height:12vmin" 
				onmouseover="this.src='img/derblue.png'" onmouseout="this.src='img/derecha.png'" src="img/derecha.png">`;

		numQuestion += 1;
	}
	else{ // The last question needs a different treatment
		lastQuestion(currentQ, notReloading); 
	}
}

// Submit an answer
function submitA(num){
	// Note that we must not add the "checked" to the last answer (position 7 currently, that is actually the 8th)
	const str = 'input[name=p' + num.toString() + ((num == 7) ? ']' : ']:checked');
	userAnswers[num] = document.querySelector(str).value;
}

// Last question of the quiz, that has the format of a slider figure
function lastQuestion(currentQ, notReloading){
	if (notReloading){
		// The 4 is the number of currently available figures, that is the max index plus one
		loadFigure(getRandomInt(0,4));
		lastQ_optionsOrder = _.shuffle(lastQ_optionsOrder);
		lastQ_selectedOption = 0;	
	}
	document.getElementById("desc").innerHTML = 
		`<form class="whole centeredFlex whiteBackground_blackBorder" style="width:88%; height:85%">
			<p class="centeredBold_FontTexto" style="font-size:1.2vmax">` + currentQ.question + `</p>
		</form>`;

	document.getElementById("rotulos").innerHTML = 
		`<div style="width:90%; display:flex; flex-direction:row; justify-content:flex-end; align-items:center">
			<div class="centeredFlex" onClick="finishQuiz()">
				<form id="finishButton" class"centeredFlex" 
					onmouseover="this.style.color='white'; this.style['border-style']='solid'; this.style['border-color']='black'" 
					onmouseout="this.style.color='black'"
				>
					<p style="font-size:3vmin; font-family:'Arial'">`+ currentQ.finishButton + `</p>
				</form>
			</div>
		</div>
		<div style="width:10%"></div>`;	

	let answer, num, str = 
		`<select id="figure-chosen-name" name="figure-chosen-name" class="centeredBold_FontTexto"
			style="width:37%; font-size:2.4vmin" onChange="lastQ_selectedOption = this.value">`;

	for (i=0; i < currentQ.options.length; i++){
		let num = lastQ_optionsOrder[i];
		answer = currentQ.options[num];
		str += `<option class="centeredBold_FontTexto" value="`+ num + `">` + answer + `</option>`;
	}
	str += `</select>`;
	
	document.getElementById("kind").innerHTML = str;
	document.getElementById("figure-chosen-name").value = (notReloading ? lastQ_optionsOrder[0] : lastQ_selectedOption);

	numQuestion += 1;
}

function testQuiz(){
	let lastQ = quiz_questions[language][numQuestion-1];
	var i = 0;
	incorrectAnswers = [];

	// Determine the correction of the first questions
	while (i < correctOptions.length){
		if (correctOptions[i] != userAnswers[i]){
			incorrectAnswers.push(i+1);
		}
		i++;
	}
	let [hbf, icd] = [head_body_feet, images_combinations_descriptions]; // Abreviations

	// Determine the correction of the last question
	if ( 
		((hbf[0] == hbf[1]) && (hbf[0] == hbf[2])) ||
		(lastQ.options[document.getElementById("figure-chosen-name").value] !== icd[language][hbf[0]][hbf[1]][hbf[2]].kind)
		)
	{
		incorrectAnswers.push(i+1);
	}
}

function finishQuizPrev(){
		// case "sendEmail_view":
		// 	div.innerHTML =
		// 		`<div class="whole" style="flex-direction:column">
		// 			<div id="desc" class="whole centeredFlex" style="height:16%"></div>

		// 			<div id="useremail" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>
		// 			<div id="userpassword" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>
		// 			<div id="teacheremail" class="whole centeredFlex" style="height:23%; flex-direction:column"></div>

		// 			<div id="sendButton" class="whole" style="height:15%; flex-direction:row"></div>
		// 		</div>`;
		// 	break;
	resetDiv("main-background");
	poblateMainBackground("sendEmail_view");

	document.getElementById("desc").innerHTML = // Text: "Submit results"
		`<div class="centered_FontRupes" style="font-size:4vmin; color:white">` + sendEmail_texts[language][0] + `</div>`;

	document.getElementById("userpassword").innerHTML = 
		`<div class="centeredFlex" style="flex-direction:column; align-items:flex-start; width:80%; height:100%">

		</div>`;
}

function showQuizResults(){

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
		+ "Cabeza: " + parts[head_body_feet[0]] 
		+ "%0D%0A  Cuerpo: " + parts[head_body_feet[1]] 
		+ "%0D%0A  Inferior: " + parts[head_body_feet[2]] 
		+ "%0D%0A    Respuesta:  " +currentQ.options[userAnswers[i]];

	window.location.href = str;
}

// Get description of the current image according to which combination the user has stablished
function getDescription(){
	resetDiv("rotulos");

	let color = ((figures == 'petroglyph') ? 'white' : 'black');
	let object = images_combinations_descriptions[language][head_body_feet[0]][head_body_feet[1]][head_body_feet[2]];

	document.getElementById("desc").innerHTML = 
		`<p class="centeredBold_FontTexto" style='font-size:1.3vw; width:90%; color:` + color +`;'>`+ object.description + `</p>`;

	if ((object.rotulos!= null) && (object.rotulos[figureType] != null)){
		document.getElementById("rotulos").innerHTML = `<div style="width: 72%"></div>` +
			`<p style="font-family:'FontTexto'; color:` + color + `; text-align:left; font-size:1.75vmin;">
			<b>` + object.rotulos[figureType] + `</b></p>`;
	}

	document.getElementById("kind").innerHTML = 
		`<p class="centered_FontSub" style="font-size:3vmin; color:` + color +`;">` + object.kind + `</p>`;
}

// Load the corresponding figure, divided into three sections 
function loadFigure(num){
	figureType = num;
	poblateMainBackground("sliderFigure_view");

	switch (num){
		case 0:
			figures = 'petroglyph';
			currentFigure = petroglyph1;
			break;
		case 1:
			figures = 'petroglyph';
			currentFigure = petroglyph2;
			break;
		case 2:
			figures = 'rockPainting';
			currentFigure = rockPainting1;
			document.getElementById("main-background").style.backgroundImage = "url('img/art/fondo_pintura.png')";
			break;
		case 3:
			figures = 'rockPainting';
			currentFigure = rockPainting2;
			document.getElementById("main-background").style.backgroundImage = "url('img/art/fondo_pintura.png')";
			break;
		default:
			break;
	}

	if (quiz){
		head_body_feet = [getRandomInt(0,3), getRandomInt(0,3), getRandomInt(0,3)];				
	} else {
		head_body_feet = [0, 0, 0]; // We reset the sliding moves that the user could have done (ASK IF IT IS NECESSARY)
		getDescription();		
	}
	buildFigure();
}

// Hands (arrows) that let the user slide the sections of the figures
function loadArrow(figurePosition, direction){
	let str = 
		`<div class="centeredFlex"; style="position:relative; width:20%; height:100%">
			<img onclick="slideFigure(` + figurePosition + `, '` + direction + `'); ` + ( quiz ? `" ` : `getDescription()" `) + 
				`onmouseover="this.style.height='35%'" onmouseout="this.style.height='25%'"
				style="position:relative; height:25%;"
				src="img/art/arrow_` + direction + ((figures == 'petroglyph') ? `` : `_pint`) + `.png"
			>
		</div>`;
	return str;
}

// Slide one of the three sections of the figre to the left or to the right
function slideFigure(figurePosition, direction){
	if (direction == "left"){ // Slide to the left
		head_body_feet[figurePosition] -= 1;
		if (head_body_feet[figurePosition] < 0){
			head_body_feet[figurePosition] = 2;
		}
	} else { // Slide to the right
		head_body_feet[figurePosition] += 1;
		if (head_body_feet[figurePosition] > 2){
			head_body_feet[figurePosition] = 0;
		}				
	}
	let array = [false, false, false];
	array[figurePosition] = true;
	buildFigure(array)
}

// Build the three sections of the figure
function buildFigure(array = [true, true, true]){
	let sections = ["head", "body", "feet"];
	let str;

	for (i=0; i<3; i++){
		if (array[i]){
			str =  loadArrow(i, "left") + `<img class="whole" style="width:60%" src=` + currentFigure[i][head_body_feet[i]] + `>` + loadArrow(i, "right")
			document.getElementById(sections[i]).innerHTML = str;
		}
	}
}