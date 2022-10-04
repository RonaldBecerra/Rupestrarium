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


//function convertSpacesToBrTag(text)