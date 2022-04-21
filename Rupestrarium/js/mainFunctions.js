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
		str += `loadDef(`+k.toString()+`);">`;
		str += `<b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
		k += 1;
		i += 1;
	}
	// "Recapitulate" button
	str += `<button class="menuButton red_mb" onclick="restoreDefaultValues(); this.style.background='black'; loadQuiz()"><b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;

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
			loadDef(figureType);
			getDescription();
		}

		// This makes the question and answers of the quiz load again with the new language
		if(quiz){
			if (sendingEmail){
				change_language_sendingEmail();
			}
			else if (quizFinished){
				finishQuiz();
			}
			else{
				nextQuestion(false);
			}
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
		let str = `<p style="width:95%; font-family:'FontTexto'; font-size:0.9vmax"><b>`;
		str += definitions_texts[language][num];
		str += `</b></p>`;

		div.innerHTML = str;
		mainRightLabel.innerHTML = '';
	}
}

/* Loads an image that will be shown in the center.
   Normally that image has text, so it cannot be automatically translated when the language is changed.
   Another image should be loaded in that case (NOT IMPLEMENTED YET)
 */
function loadCentralImage(num){
	poblateMainBackground('centralImage_view');

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

// In this function we also restore variables that indicate the state of the view to their default values
function restoreDefaultValues(restore_quiz_values=false){
	figures = quiz = false;
	head_body_feet = [0, 0, 0];
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetDiv("main-background"); // Restore the default background of the central section

	// Since menu buttons turn black when selected, when we choose another we must first restore the color of the previous one.
	// We are currently not controlling which one was selected, so we have to iterate over them all.
	var elems = document.getElementsByTagName('button');
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.removeProperty('background'); // This property is which could have the black color
	}

	if (restore_quiz_values){
		restoreQuizValues();
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

/* The "main-background" div can have different inner HTML objects depending to the case.
   Here we build that internal part according to the case

   @param kind -> indicates how we want to poblate it.
   @param namesHeights -> array of arrays, each having the id (name) of a div we will include, and its %height written as a string
   @param innerDirection -> flex-direction of the inner divs we will include
 */
function poblateMainBackground(kind, namesHeights=null, innerDirection="row"){
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

		// When we want to segment it in some horizontal pieces
		case "horizontalSections_view":
			let tuple, str = `<div id="main-background-container" class="whole" style="flex-direction:column">`;
			for (i=0; i < namesHeights.length; i++){
				tuple = namesHeights[i];
				str += `<div id="` + tuple[0] + `" class="whole centeredFlex" 
							style="height:` + tuple[1] + `%; flex-direction:` + innerDirection + `"></div>`;
			}
			div.innerHTML = str + `</div>`;
			break;

		// When the user is answering one of the questions of the quiz, except the last one, that has a slider figure
		// Note that the form label is which must have the blackborder if we want that the border
		// changes its size according to the text.
		case "quizQuestion_view":
			div.innerHTML =
				`<div class="whole" style="flex-direction:column">
					<div class="whole centeredFlex" style="height:74%">
						<form class="whiteBackground_blackBorder" style="width:70%">
							<p id="question" style="position:relative; font-family:'FontTexto'"></p>
						</form>
					</div>

					<div id="handToRight" class="whole centeredFlex" style="height:26%; display:flex; flex-direction:row; padding-left:70%"></div>
				</div>`;
			break;

		default:
			break;	
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////       R E L A T E D     T O     T H E     S L I D E R     F I G U R E S       /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Load the corresponding figure, divided into three sections 
function loadFigure(num){
	figureType = num;
	currentFigure = possible_figures[num];

	poblateMainBackground("horizontalSections_view", 
		[['desc','17'],['head','24'],['body','24'],['feet','24'],['kind_rotulos','11']]
	);

	if (num < 2){
		figures = 'petroglyph';
	}
	else{
		figures = 'rockPainting';
		document.getElementById("main-background").style.backgroundImage = "url('img/art/fondo_pintura.png')";
	}

	if (quiz){
		head_body_feet = [getRandomInt(0,3), getRandomInt(0,3), getRandomInt(0,3)];				
	} else {
		getDescription();		
	}
	buildFigure();
}

// Get description of the current image according to which combination the user has stablished
function getDescription(){
	resetDiv("kind_rotulos"); 

	let color = ((figures == 'petroglyph') ? 'white' : 'black');
	let object = images_combinations_descriptions[language][head_body_feet[0]][head_body_feet[1]][head_body_feet[2]];

	document.getElementById("desc").innerHTML = 
		`<p class="centered_FontTexto" style='font-size:1.5vw; width:90%; color:` + color +`;'>`+ object.description + `</p>`;

	let div = document.getElementById("kind_rotulos");
	div.innerHTML = `<p class="centered_FontSub" style="font-size:3vmin; color:` + color +`;">` + object.kind + `</p>`;

	if ((object.rotulos!= null) && (object.rotulos[figureType] != null)){
		div.innerHTML += 
			`<p style="position:absolute; width:100%; padding-left:75%; padding-bottom:5%; font-family:sans-serif; 
						color:` + color + `; text-align:left; font-size:1.9vmin; font-family:'Century Gothic'">` 
				+ object.rotulos[figureType] 
				+ `</p></div>`;
	}
}

// Build the three sections of the figure
function buildFigure(array = [true, true, true]){
	let sections = ["head", "body", "feet"];
	let str;

	for (i=0; i<3; i++){
		if (array[i]){
			str =  loadArrow(i, "left") + `<img class="whole" style="width:54%" src=` + currentFigure[i][head_body_feet[i]] + `>` + loadArrow(i, "right")
			document.getElementById(sections[i]).innerHTML = str;
		}
	}
}

// Arrows that let the user slide the sections of the figures
function loadArrow(figurePosition, direction){
	let str = 
		`<div class="centeredFlex"; style="position:relative; width:23%; height:100%">
			<img onclick="slideFigure(` + figurePosition + `, '` + direction + `'); ` + ( quiz ? `" ` : `getDescription()" `) + 
				`onmouseover="this.style.height='18%'" onmouseout="this.style.height='13%'"
				style="position:relative; height:13%;"
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////       R E L A T E D     T O     T H E     Q U I Z       ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadQuiz(){
	resetDiv('main-background');
	quiz = true;

	console.log("currentAttempt = ", currentAttempt);

	if (quizFinished){
		console.log("Entré en quizFinished");
		finishQuiz();
	}
	else if (sendingEmail){
		console.log("Entré en sendingEmail");
		sendEmail();
	}
	else if (currentAttempt < 3){
		console.log("Entré en currentAttempt < 3");
		currentAttempt += 1;
		poblateMainBackground("quizQuestion_view");
		nextQuestion();
	}
	else{
		console.log("Entré en else");
		finishQuiz();
	}
}

// Gets the question of the quiz to display and increases the number of current question in 1
function nextQuestion(notReloading=true){
	let questions = quiz_questions[language];
	let currentQ = questions[numQuestion];
	
	if (numQuestion < questions.length - 1){
		let possibleAnswers = currentQ.options;
		let str = '';
		for (i=0; i < possibleAnswers.length; i++){
			str += `<input type="radio" style="height:3vmin" name="p`+ numQuestion.toString() + `" value="` 
					+ i.toString() + `"` + ((i==0) ? `checked>` : `>`) + " " + possibleAnswers[i] + `<br>`;
		}

		// Here we put the question followed by its possible answers
		document.getElementById("question").innerHTML = 
			`<b>` + currentQ.question + `</b><br><br>
			<span style="font-size:3vmin">` + str + `</span>`;

		// Here we put the image of the hand to advance to the next question
		document.getElementById("handToRight").innerHTML =
			`<img onclick="submitA(` + numQuestion.toString()+`); numQuestion+=1; nextQuestion();" style="position:relative; height:6vmin" 
				onmouseover="this.src='img/derblue.png'" onmouseout="this.src='img/derecha.png'" src="img/derecha.png">`;
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
		lastQ_selectedOption = lastQ_optionsOrder[0];	
	}
	document.getElementById("desc").innerHTML = 
		`<form class="whole centeredFlex whiteBackground_blackBorder" style="width:88%; height:85%">
			<p class="centeredBold_FontTexto" style="font-size:1.2vmax">` + currentQ.question + `</p>
		</form>`;

	let div = document.getElementById("kind_rotulos");
	div.style["flex-direction"] = "row-reverse";

	div.innerHTML = 
		`<div class="centeredFlex" style="width:31%; padding-bottom:5%">
			<div class="centeredFlex" onClick="finishQuiz()">
				<form id="finishButton" class"centeredFlex" onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">
					<p style="font-size:2vmin; font-family:'Arial'">`+ currentQ.finishButton + `</p>
				</form>
			</div>
		</div>`;

	let answer, num;
	let str = 
		`<select id="figure-chosen-name" name="figure-chosen-name" class="centeredBold_FontTexto"
			style="width:38%; font-size:2.4vmin" onChange="lastQ_selectedOption = this.value;">`;

	for (i=0; i < currentQ.options.length; i++){
		num = lastQ_optionsOrder[i];
		answer = currentQ.options[num];
		str += `<option class="centeredBold_FontTexto" value="`+ num + `">` + answer + `</option>`;
	}
	str += `</select><div style="width:31%"></div>`;
	
	div.innerHTML += str;
	document.getElementById("figure-chosen-name").value = lastQ_selectedOption;
}

function testQuiz(){
	let lastQ = quiz_questions[language][numQuestion];
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
		(lastQ.options[lastQ_selectedOption] !== icd[language][hbf[0]][hbf[1]][hbf[2]].kind)
		)
	{
		incorrectAnswers.push(i+1);
	}
}

function sendEmail(useremail_val="", userpassword_val="", passwordShown=false, teacheremail_val=""){
	resetDiv('main-background');
	quizFinished = false;
	sendingEmail = true;
	poblateMainBackground("horizontalSections_view",
		[['desc','14'],['useremail','23'],['userpassword','23'],['teacheremail','23'],['sendButton','17']],
		"column"
	);

	document.getElementById("main-background-container").style.cssText += "color:white; font-size:2.7vmin;";

	document.getElementById("desc").innerHTML =
		`<div class="centered_FontRupes" style="font-size:3.5vmin; padding-top:2%">` + sendEmail_texts[language][0] + `</div>`;

	let divInit = `<div class="centeredFlex" style="flex-direction:column; align-items:flex-start; width:70%; height:100%;">`;

	document.getElementById("useremail").innerHTML = divInit +
			`<label for="useremail_input">` + sendEmail_texts[language][1] + `</label>
			<input class="emailInput" type="text" id="useremail_input" name="useremail_input" value="` + useremail_val + `">` 
		+ `</div>`;
		

	document.getElementById("userpassword").innerHTML = divInit +
			`<label for="password_input">` + sendEmail_texts[language][2] + `</label>
			<input class="emailInput" type="password" id="password_input" name="password_input" value="` + userpassword_val + `">
			<div style="height:7.5%"></div>
			<div class="centeredFlex" style="flex-direction:row; height:10%; justify-content:flex-start; font-size:2.3vmin">
				<input type="checkbox" id="showHide_password" onClick="show_or_hide_password()"/>`
				+ sendEmail_texts[language][3] +
			`</div>` 
		+ `</div>`;

	document.getElementById("teacheremail").innerHTML = divInit + 
			`<label for="teacheremail_input">` + sendEmail_texts[language][4] + `</label>
			<input class="emailInput" type="text" id="teacheremail_input" name="teacheremail_input" value="` + teacheremail_val + `">` 
		+ `</div>`;

	let buttonDiv = document.getElementById("sendButton");
	buttonDiv.style["flex-direction"] = "row";

	buttonDiv.innerHTML =
		`<div class="centeredFlex" style="padding-bottom:2%" onClick="loadCentralImage(5); currentAttempt+=1; numQuestion=0; sendingEmail=false">
			<form id="sendEmailButton" class"centeredFlex" style="color:black" onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">
				<p style="font-size:3vmin; font-family:'Arial'">`+ sendEmail_texts[language][5] + `</p>
			</form>
		</div>`;
}

// To make visible or not the password that the user is entering
function show_or_hide_password(){
	if ($('#showHide_password').is(':checked')) {
		$('#password_input').attr('type', 'text');
	} 
	else {
		$('#password_input').attr('type', 'password');
	}
}

/* Changing the language while sending an email require to the input values
 * so in this case we need a different treatment
 */
function change_language_sendingEmail(){
	let useremail_val = document.getElementById("useremail_input").value;
	let userpassword_val = document.getElementById("password_input").value;
	let passwordShown = null;
	let teacheremail_val = document.getElementById("teacheremail_input").value;

	sendEmail(useremail_val, userpassword_val, passwordShown, teacheremail_val);
}

//function showQuizResults(){
function finishQuiz(){
	quizFinished = true;
	testQuiz();

	let len = incorrectAnswers.length;
	let totalPossibilities = quiz_questions[language].length
	let texts = quizResults_texts[language];
	let str = `<span style="font-size:5vmin; font-weight:bold">` + texts[0] + `</span><br><br>`;

	let stringIncorrects = "";
	for (i=0; i < len; i++){
		stringIncorrects += incorrectAnswers[i].toString() + ", ";
	}
	stringIncorrects = stringIncorrects.slice(0, -2);
	let printCase = true;

	if (len > 0){
		if (len > 4){
			str += texts[1] + `<br>` + stringIncorrects + `<br><br>`;
		}
		else if (len > 1){
			let corrects = totalPossibilities - len;
			str += texts[2] + `<br>` + texts[3] + corrects.toString() + texts[4] + `<br>`;
			str += texts[5] + stringIncorrects + `<br><br>`;
		}
		else{
			let corrects = totalPossibilities - len;
			str += texts[2] + `<br>` + texts[3] + corrects.toString() + texts[4] + `<br>`;
			str += texts[10] + `<br>` + stringIncorrects + `<br><br>`;
		}
	}
	else {
		str += texts[6] + `<br>` + texts[7] + totalPossibilities.toString() + texts[4];
	}

	let formString = 
		`<form class"centeredFlex" style="padding-top:2%"
			onmouseover="this.style.color='red'; this.style.fontWeight='bold'; this.style.fontSize='3.4vmin'"
			onmouseout="this.style.color='#F26D0B'; this.style.fontWeight='lighter'; this.style.fontSize='3vmin'"
			style="color:#F26D0B; font-size:3vmin"
		>
			<p style="color:#F26D0B; font-size:3vmin">`;

	console.log("currentAttempt = ", currentAttempt);

	document.getElementById("main-background").innerHTML = 
		`<div id="myModal" class="centeredFlex modal whiteBackground_blackBorder" style="padding:6%; flex-direction:column; font-size:3vmin">
			<p class="centered_FontRupes">` + str + 

			((currentAttempt == 1) ? 
				(`<div class="centeredFlex centered_FontRupes" onClick="tryAgain()">`
					+ formString + texts[8] + `</p>
					</form>
				</div>`) : ``) + 

			((currentAttempt < 3) ?
				(`<div class="centeredFlex centered_FontRupes" onClick="sendEmail()">`
					+ formString + texts[11] + `</p>
					</form>
				</div>`) : ``) +

			`<div class="centeredFlex centered_FontRupes" onClick="loadCentralImage(5); restoreDefaultValues(true);">`
				+ formString + texts[9] + `</p>
				</form>
			</div>

		</div>`;
}

function restoreQuizValues(){
	quizFinished = false;
	numQuestion = 0;
}

function tryAgain(){
	restoreQuizValues()
	loadQuiz();
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