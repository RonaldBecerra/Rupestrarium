/* 
 * Makes the color of one of the main buttons be black.
 * This is necessary when we access to the function related to the button
 * but not pressing the button, like through the index menu.
 */
function makeMainButtonBlack(buttonNumber){
	document.getElementById("b" + buttonNumber).style.background = 'black';
}

// To know the index option number of the narrow version, corresponding to
// a main button number of the wide/medium versions
function correspondingIndexOptionToButton(buttonNum){
	if (buttonNum < 3){
		return 0;
	}
	else if (buttonNum == 3){
		return 6;
	}
	else if (buttonNum == 4){
		return null;
	}
	else {
		return buttonNum - 4;
	}
}


/* Makes the background of an index option darker and its text be red */
function showIndexOptionAsSelected(optionNumber){
	if (optionNumber != null){
		const indexOption = document.getElementById("index-options").querySelector('div[name="'+ optionNumber +'"]');
		indexOption.style.background = "rgba(0, 0, 0, 0.14)";
		indexOption.style.color = "var(--font-color-selected-index-option)";
	}
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

// To detect the current browser being used
// >>> UNUSED FOR THE MOMENT, because even in the apk version it says the browser is Chrome
function fnBrowserDetect(){
	try{
		const nAgt = navigator.userAgent;
		// In Opera, the true version is after "Opera" or after "Version"
		if (nAgt.indexOf("Opera")!=-1) {
			return "Opera";
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if (nAgt.indexOf("MSIE")!=-1) {
			return "Microsoft Internet Explorer";
		}
		// In Chrome, the true version is after "Chrome" 
		else if (nAgt.indexOf("Chrome")!=-1) {
			return "Chrome";
		}
		// In Safari, the true version is after "Safari" or after "Version" 
		else if (nAgt.indexOf("Safari")!=-1) {
			return "Safari";
		}
		// In Firefox, the true version is after "Firefox" 
		else if (nAgt.indexOf("Firefox")!=-1) {
			return "Firefox";
		}
		else {
			return null;
		}
	} 
	catch(e){
		return null;
	}
}