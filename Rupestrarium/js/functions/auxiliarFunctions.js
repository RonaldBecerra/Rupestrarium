/* 
 * Makes the color of one of the main buttons be black.
 * This is necessary when we access to the function related to the button
 * but not pressing the button, like through the index menu.
 */
function makeMainButtonBlack(buttonNumber){
	document.getElementById("b" + buttonNumber).style.background = 'black';
}


/* Makes the background of an index option darker and its text be red */
function showIndexOptionAsSelected(optionNumber){
	const indexOption = document.getElementById("index-options").querySelector('div[name="'+ optionNumber +'"]');
	indexOption.style.background = "rgba(0, 0, 0, 0.14)";
	indexOption.style.color = "var(--font-color-selected-index-option)";
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

// Used in text area in order to make the area grow when the text increases its size
function auto_height(elem, idToCompare){
	let heightToCompare = window.getComputedStyle(document.getElementById(idToCompare)).height;
	let scrollHeight = (elem.scrollHeight) + "px";

	if (parseFloat(scrollHeight) < parseFloat(heightToCompare)){
		elem.style.height = heightToCompare;
	}
	else {
		elem.style.height = scrollHeight;
	}	
}