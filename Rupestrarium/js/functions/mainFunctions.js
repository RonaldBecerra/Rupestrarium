/*  
 *  These functions let change the app state
 *
 */

// Function to listen the current size, so we can apply the correct css file
$(function() {
	adjustStyle($(this).width(), $(this).height());
	$(window).resize(function() {
		adjustStyle($(this).width(), $(this).height());
	});
});

// It calls the correct css file depending on the 
function adjustStyle(width, height) {
	let rel = width/height;
	if (rel < 0.8) {
		$("#size-stylesheet").attr("href", "css/narrow.css");
	} else if (rel < 1.42) {
		$("#size-stylesheet").attr("href", "css/medium.css");
	} else {
		$("#size-stylesheet").attr("href", "css/wide.css"); 
	}
}

// Here we put everything that needs to be initialized when the page is loaded
window.onload = async function(){
	generateColumnMenus();
	change_language('spanish');
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetDiv("main-background"); // Put the background image of the central section
	setQuizValues(); // Establish any necessary data for the quiz
}

// To poblate the "leftColumnMenu" and "rightColumnMenu" divs
function generateColumnMenus(){
	let str, div, i, j;
	i = k = 0;

	// --- Left side
	div = document.getElementById("leftColumnMenu");
	str = "";
	while(i < 5){ // Number of buttons on the left side
		str += `<button id="b`+i.toString()+`" class="mainMenuButton darkRed_mb" onclick="restoreDefaultValues(); this.style.background='black'; loadCentralImage(`+i.toString()+`);">`;
		str += `<b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
		i += 1;
	}
	str += `<img style="width: 100%; height: 80%" src="img/Cueva_de_las_manos.jpg">`;
	div.innerHTML = str;

	// --- Right side
	div = document.getElementById("rightColumnMenu");
	str = "";
	while (k < 4){ // Number of buttons with the same structure on the right side: petroglyphs and rock paintings
		str += `<button id="b`+i.toString()+`" class="mainMenuButton ` + ((k < 2) ? `gray_mb` : `orange_mb`) + `" onclick="restoreDefaultValues(); this.style.background='black';`;
		str += `loadDef(`+k.toString()+`);">`;
		str += `<b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;
		k += 1;
		i += 1;
	}
	// "Recapitulate" button
	str += `<button id="b`+i.toString()+`" class="mainMenuButton red_mb" onclick="restoreDefaultValues(); this.style.background='black'; loadQuiz()">`;
	str += `<b id="textButton`+i.toString()+`" class="text_mb"></b></button>`;

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

		// Case when the user was in one of the views that consist on a central image: Introduction, Presentation,...
		if (centralImage){
			var notFound = true;
			for (i=0; i < 5; i++) { // 5 is the number of buttons related to the central image
				let div = document.getElementById("b"+i.toString());
				if (div.style.background == 'black'){
					notFound = false;
					div.onclick(); // We make as if the user selected again the button
					break;
				}
			}
			// We must put the initial image
			// (ONE CASE IN WHICH THIS OCCURS IS WHEN THE APP IS STARTING)
			if (notFound){
				loadCentralImage(5);
			}
		}

		// We translate the texts and images of the of the main labels (title, subtitle, vertical texts and footer text)
		let object, div;
		texts = mainLabels_texts[newLanguage];
		for (i=0; i < texts.length; i++){
			object = texts[i];
			if (object.type === "id"){
				div = document.getElementById(object.identifier);
				if (div !== null){
					div[object.location] = object.content;
				}
			}
			else if (object.type === "class"){
				div = document.getElementsByClassName(object.identifier);
				globala = div;
				globalObject = object;
				for(k=0; k < div.length; k++){
					div[k][object.location] = object.content;
				}
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
				showResultsView();
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
		mainRightLabel.innerHTML = mainLabels_texts[language][3].content;
	}

	// Case when we must load the definition of a Petroglyph or Rock painting
	else{
		loadFigure(num);
		let str = `<p id="definition"><b>`;
		str += manifestationsDefinitions_texts[language][num];
		str += `</b></p>`;

		div.innerHTML = str;
		mainRightLabel.innerHTML = '';
	}
}

/* Loads an image that will be shown in the center.
   Normally that image has text, so it cannot be automatically translated when the language is changed.
   Another image should be loaded in that case.
 */
function loadCentralImage(num){
	poblateMainBackground('centralImage_view');
	centralImage = true;

	let im = imagesThatVaryWithLanguage[language];
	const imagesSources = [im.presentacion, im.intro, im.instrucciones, im.creditos, im.contacto, "img/imagen_inicial.png"];

	// For the initial image we must put a vertical text on its side
	if (num == 5){
		let div = document.getElementById("central-image-label");
		div.style.display = "flex";
		div.innerHTML = mainLabels_texts[language][4].content;

		// Put the title and the substitle on the center of the view for the narrow version
		div = document.getElementById("main-background");
		div.innerHTML += 
			`<div class="whole centeredFlex narrowOnly" style="position:absolute; flex-direction:column">
				<img id="rupestrarium-title-central-image" class="appTitle">
				<div class="subtitle"></div>
			</div>`;

		// Bright the central image in order that the title image (ROCKARTIUM) is readable
		document.getElementById("img").style.filter = "brightness(1.25)";
	}
	document.getElementById("img").src = imagesSources[num];
}

// In this function we also restore variables that indicate the state of the view to their default values
function restoreDefaultValues(){
	centralImage = figures = quiz = false;
	head_body_feet = [0, 0, 0];
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetDiv("main-background"); // Restore the default background of the central section

	// Since menu buttons turn black when selected, when we choose another we must first restore the color of the previous one.
	// We are currently not controlling which one was selected, so we have to iterate over them all.
	var elems = document.getElementsByTagName('button');
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.removeProperty('background'); // This property is which could have the black color
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
		// When we put the image that appears on the beginning, or those that are invoked with the buttons of the left column menu
		case "centralImage_view":
			div.innerHTML = 
				`<div class="img-side">`
					// This is to put the vertical text next to the image that appears when starting the app
					+ `<div id="central-image-label" class="vertical-text-bottom-to-top" 
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
						<form class="whiteBackground_blackBorder" style="max-width:85%"">
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

// Returns an integer between the min and the max indicated
function getRandomInt(min, max){
	return Math.floor(Math.random(min, max) * (max - min)) + min;
}

/*
 * Since many texts in this app will include HTML tags, this function allows to recover the plain text
 *
 * NOTE: Currently it only deletes the "<br>&nbsp&nbsp&nbsp" parts or the "<br>"" tags, because
 *       those are what we are interested for now. Maybe this must be extended in the future.
 */
function deleteHTMLTagsFromText(text){
	brSpaceSplit = text.split("<br>&nbsp&nbsp&nbsp");

	// This concatenates all elements of the previous array in a single string
	// We must put "" inside join in order that a comma between them does not appear
	let result = brSpaceSplit.join(""); 

	redSplit = result.split("<span style='color:red'>");
	result = redSplit.join("");

	spanCloseSplit = result.split("</span>");
	result = spanCloseSplit.join("");

	brSplit = result.split("<br>");
	result = brSplit.join(" ");
	
	return result;
}