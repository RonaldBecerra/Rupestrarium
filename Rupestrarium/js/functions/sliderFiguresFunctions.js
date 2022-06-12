/*  
 *  These functions let change the app state
 *
 */

// Load the corresponding figure, divided into three sections 
function loadFigure(num, randomizeParts=false){
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

	if (quiz && randomizeParts){
		head_body_feet_forQuiz = [getRandomInt(0,3), getRandomInt(0,3), getRandomInt(0,3)];				
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
		`<p id="figureDesc" class="centered_FontRupes" style='color:` + color +`;'>`+ object.description + `</p>`;

	let div = document.getElementById("kind_rotulos");
	div.innerHTML = `<p id="figureKind" class="centered_FontSub" style="color:` + color +`;">` + object.kind + `</p>`;

	if ((object.rotulos!= null) && (object.rotulos[figureType] != null)){
		div.innerHTML += 
			`<p id="figureRotulo" style="position:absolute; text-align:left; font-family:'Century Gothic'; color:` + color + `;">` 
				+ object.rotulos[figureType] 
			+ `</p>
			</div>`;
	}
}

// Build the three sections of the figure
function buildFigure(array = [true, true, true]){
	let hbf = quiz ? head_body_feet_forQuiz : head_body_feet;
	let sections = ["head", "body", "feet"];
	let str;

	for (i=0; i<3; i++){
		if (array[i]){
			str =  loadArrow(i, "left") + `<img class="figureSection whole" src=` + currentFigure[i][hbf[i]] + `>` + loadArrow(i, "right");
			document.getElementById(sections[i]).innerHTML = str;
		}
	}
}

// Arrows that let the user slide the sections of the figures
function loadArrow(figurePosition, direction){
	let str = 
		`<div class="arrowContainer centeredFlex"; style="height:100%">
			<img onclick="slideFigure(` + figurePosition + `, '` + direction + `'); ` + ( quiz ? `" ` : `getDescription()" `) + 
				`src="img/art/arrow_` + direction + ((figures == 'petroglyph') ? `` : `_pint`) + `.png"
			>
		</div>`;
	return str;
}

// Slide one of the three sections of the figre to the left or to the right
function slideFigure(figurePosition, direction){
	let hbf = quiz ? head_body_feet_forQuiz : head_body_feet;

	if (direction == "left"){ // Slide to the left
		hbf[figurePosition] -= 1;
		if (hbf[figurePosition] < 0){
			hbf[figurePosition] = 2;
		}
	} else { // Slide to the right
		hbf[figurePosition] += 1;
		if (hbf[figurePosition] > 2){
			hbf[figurePosition] = 0;
		}				
	}
	let array = [false, false, false];
	array[figurePosition] = true;
	buildFigure(array);
}