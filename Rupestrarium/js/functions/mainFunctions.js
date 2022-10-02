/*  
 *  These functions let change the app state
 *
 */

// It calls the correct css file depending on the 
function adjustStyle(width, height) {
	let rel = width/height;
	if (rel < 0.8) {
		document.getElementById("size-stylesheet").href = "css/narrow.css";
	} else if (rel < 1.42) {
		document.getElementById("size-stylesheet").href = "css/medium.css";
		closeIndex();
	} else {
		document.getElementById("size-stylesheet").href = "css/wide.css";
		closeIndex();
	}
}

// Here we put everything that needs to be initialized when the page is loaded
window.onload = async function(){
	// Apply the correct css file, according to the initial dimensions
	adjustStyle(window.innerWidth, window.innerHeight);
	// This is to listen the current size, so we can apply the correct css file
	window.addEventListener('resize', () => adjustStyle(window.innerWidth, window.innerHeight));

	createNarrowVersionHeader();
	generateColumnMenus();
	generate_indexOptionsRows();
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
		str += `<button id="b`+i+`" class="mainMenuButton darkRed_mb" onclick="restoreDefaultValues(); this.style.background='black'; loadCentralImage(`+i+`);">`;
		str += `<b id="textButton`+i+`" class="text_mb"></b></button>`;
		i += 1;
	}
	str += `<img style="width: 100%; height: 80%" src="img/Cueva_de_las_manos.jpg">`;
	div.innerHTML = str;

	// --- Right side
	div = document.getElementById("rightColumnMenu");
	str = "";
	while (k < 4){ // Number of buttons with the same structure on the right side: petroglyphs and rock paintings
		str += `<button id="b`+i+`" class="mainMenuButton ` + ((k < 2) ? `gray_mb` : `orange_mb`) + `" onclick="restoreDefaultValues(); this.style.background='black';`;
		str += `loadDef(`+k+`);">`;
		str += `<b id="textButton`+i+`" class="text_mb"></b></button>`;
		k += 1;
		i += 1;
	}
	// "Recapitulate" button
	str += `<button id="b`+i+`" class="mainMenuButton red_mb" onclick="restoreDefaultValues(); this.style.background='black'; loadQuiz()">`;
	str += `<b id="textButton`+i+`" class="text_mb"></b></button>`;

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
			document.getElementById('textButton' + i).innerHTML = texts[i];
		}

		// We translate the texts of the options of the index that appears in the narrow version
		texts = indexOptions_texts[newLanguage];
		for (i=0; i < texts.length; i++){
			document.getElementById('indexTextOption' + i).innerHTML = texts[i];
		}

		// Case when the user was in one of the views that consist on a central image: Introduction, Presentation,...
		if (centralImage){
			var notFound = true;
			for (i=0; i < 5; i++) { // 5 is the number of buttons related to the central image
				let div = document.getElementById("b"+i);
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

/* Makes the color of one of the main buttons be black.
   This is necessary when we access to the function related to the button
   but not pressing the button, like through the index menu.
 */
 function makeMainButtonBlack(buttonNumber){
 	document.getElementById("b" + buttonNumber).style.background = 'black';
 }

 // To look for the main button that is selected currently (its color is black)
 function pressedMainButtonId(){
 	mainButtons = document.getElementsByClassName("mainMenuButton");
 	for (i=0; i < mainButtons.length; i++){
 		let elem = mainButtons[i];
 		if (elem.style.background === 'black'){
 			return elem.id;
 		}
 	}
 	return null;
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

	let div, im = imagesThatVaryWithLanguage[language];
	const imagesSources = [im.presentation, im.intro, im.instructions, im.credits, im.contact, "img/imagen_inicial.png"];

	// For the initial image we must put a vertical text on its side
	if (num == 5){
		document.getElementById("central-image-label").innerHTML = mainLabels_texts[language][4].content;
	}
	else{
		/* We don't want the two sides of the image (that have the dark gray background behind)
		   appear in the mobile version when the image is not the initial one. For the web version
		   it does not matter that they are also not displayed because the central image will have 
		   a fixed width */
		document.querySelectorAll(".img-side").forEach(element =>{
			element.style.display = "none";
		});
	}
	
	// Credits and instructions have two versions depending of if it's pure web or narrow (mobile)
	if ((num == 0) || (num == 2) || (num == 3)){
		document.getElementById("img-web").src = imagesSources[num].web;
		document.getElementById("img-mob").src = imagesSources[num].narrow;
	} else {
		document.querySelectorAll(".central_img").forEach(element => {
			element.src = imagesSources[num];
		});
	}

	// In the narrow version the presentation, introduction and instructions view are contained in a common tab navigator
	// They all appear in the "start" option of the index menu
	if (num < 3){
		tabNavigator = true;
		createNarrowVersionHeader("startMenu", num);
	} else {
		createNarrowVersionHeader();
	}
}

// In this function we also restore variables that indicate the state of the view to their default values
function restoreDefaultValues(){
	centralImage = tabNavigator = figures = quiz = false;
	head_body_feet = [0, 0, 0];
	loadDef(); // Put the "Sur_de_marruecos.jpg" image in its place
	resetDiv("main-background"); // Restore the default background of the central section

	// Since menu buttons turn black when selected, when we choose another we must first restore the color of the previous one.
	// We are currently not controlling which one was selected, so we have to iterate over them all.
	document.querySelectorAll("button").forEach(element => {
		element.style.removeProperty("background");
	});
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
   Here we build that internal part according to it.

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
						style="text-align:left">
					</div>
				</div>

				<img id="img-web" class="webOnly central_img">
				<img id="img-mob" class="narrowOnly central_img">

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

// The header in the narrow version changes according to the current view
function createNarrowVersionHeader(kind=null, num=null){
	let narrowInitHeader = document.getElementById("narrowInitHeader");
	let narrowMainHeader = document.getElementById("narrowMainHeader");
	let header = document.getElementsByTagName("header")[0];
	let mainContainer = document.getElementsByClassName("main-container")[0];

	console.log("mainContainer = ", mainContainer);

	// Restore all the default values firstly. Later we will establish the necessary ones
	narrowInitHeader.style.display = narrowMainHeader.style.display = "none";
	header.className = "";
	mainContainer.classList.add("wholeAbsoluteInNarrow");

	if (null == kind){
		narrowInitHeader.style.display = null;
		mainContainer.classList.remove("wholeAbsoluteInNarrow");
	}
	else{
		narrowMainHeader.style.display = null;

		// Auxiliar function to get the main format of the header (hamburger menu plus content)
		let headerMainFormat = (content, percentageHeight=10) =>
			`<div class="centeredFlex" 
				 style="height:`+percentageHeight+`%; width:100%; justify-content:flex-start; flex-direction:row; background:var(--red-background-narrow)"
			 >
				<div class="centeredFlex" style="width:14%; z-index:1">
					<img src="img/hamburger-menu.png" onclick="openIndex()" onmouseover="this.style.height='65%'" onmouseout="this.style.height='55%'" 
						ontouchend="this.onmouseout()" style="height:55%; filter:invert(100%)" >
				</div>`
				+ content +
			`</div>`;

		switch(kind){
			// Presentation, Introduction or Instructions view
			case "startMenu":
				header.classList.add("headerStartMenu");
				let hamburgerMenuAndImage = 
					`<div class="whole centeredFlex" style="position:absolute">
						<img src="img/index/options/start.png" style="height:45%; width:auto; filter:invert(100%)">
					</div>`;
				let tabOptions = "";
				for (i=0; i<3; i++){
					let color, borderStyle = "border-bottom: 0.5vh solid ";
					if (num == i){
						color = "var(--tab-letters-start-view)";
						borderStyle += color;
					} 
					else {
						color = "white";
						borderStyle += "var(--red-background-narrow)";
					}
					tabOptions += 
						`<div class="centeredFlex" style="height:100%; width:calc(100%/3); padding-bottom:3%; cursor:pointer; color:`+color+`; `+borderStyle+`"
							onclick="restoreDefaultValues(); loadCentralImage(`+ i +`); makeMainButtonBlack(`+ i +`)"
						>` 
							+ buttons_texts[language][i].toUpperCase() +
						`</div>`;
				}
				narrowMainHeader.innerHTML = 
					headerMainFormat(hamburgerMenuAndImage, 62.5) + 
					`<div class="centeredFlex" 
							style="height:37.5%; width:100%; font-family:'FontRupes'; font-size:3.9vw; background:var(--red-background-narrow)">`
						+ tabOptions +
					`</div>`;
				break;
			default:
				break;
		}
	}
}