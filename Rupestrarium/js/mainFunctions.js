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
						<form class="whiteBackground_blackBorder" style="max-width:70%"">
							<p id="question" style="font-family:'FontTexto'"></p>
						</form>
					</div>

					<div id="handToRight" class="whole centeredFlex" style="height:26%; display:flex; flex-direction:row; padding-left:70%"></div>
				</div>`;
			break;

		default:
			break;	
	}
}