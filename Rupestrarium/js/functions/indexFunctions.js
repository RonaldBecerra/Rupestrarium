/*  
 *  These functions let change the app state
 *
 */

// To create the places where the options will be located, each one consisting on an
// image and text, but the text will not be put here, but in the "change_language" function
function generate_indexOptionsRows(){
	let style, str = "";
	for (i=0; i<indexOptionsImages.length; i++){
		if (1 < i && i < 4){
			currentStyle = "height:80%; width:65%";
		}
		else{
			currentStyle = "height:65%; width:auto; max-width:80%";
		}
		str += 
			`<div style="height:calc(100%/7); width:100%; display:flex; flex-direction:row; align-items:center; cursor:pointer"
					onclick="`+indexOptionsFunctions[i]+`; closeIndex()">
				<div style="width:3.45%"></div>
				<div class="centeredFlex" style="height:100%; width:30.17%">
					<img src="` + indexOptionsImages[i] + `" style="` + currentStyle + `">
				</div>
				<div class="centeredFlex" style="height:100%; flex-grow:1; flex-direction:row; justify-content:flex-start">
					<div id="indexTextOption`+i+`" style="left:3%; font-family:'FontRupes'; font-size:2.5vh"></div>
				</div>
			</div>`;
	}
	document.getElementById("index-options").innerHTML = str;
}

function openIndex(){
	indexView = true;
	document.getElementById("index-view-container").style.display = "flex";
	$("#index-view-container").animate({"width":"100%"}, 100);

	setTimeout(() => {
		document.getElementById("index-empty").style.background = "rgba(0, 0, 0, 0.5)";
	},400)
}

function closeIndex(){
	indexView = false;
	document.getElementById("index-empty").style.background = "none";
	$("#index-view-container").animate({"width":"0%", "display":"none"}, 100);
}