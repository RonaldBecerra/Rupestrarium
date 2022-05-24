/*  
 *  These functions let change the app state
 *
 */

// NOTE: For design reasons, "currentAttempt" represents here the number 
// of the attempt that could start later, not what has already been made
function showResultsView(){
	let numIncorrects = incorrectAnswers.length;
	let numCorrects = totalQuestions - numIncorrects;
	let texts = quizResults_texts[language];

	// Title of the view: "Results"
	let str = `<span id="results-title" style="font-weight:bold">` + texts["results"] + `</span><br><br>`;

	// We need to put the incorrect answers numbers as a string
	let stringIncorrects = "";
	for (i=0; i < numIncorrects; i++){
		stringIncorrects += incorrectAnswers[i].toString() + ", ";
	}
	stringIncorrects = stringIncorrects.slice(0, -2);

	// Show different messages depending on the case
	if (numIncorrects == 0){
		// Congratulations! You won the <number> points
		str += texts["allCorrect"] + totalQuestions.toString() + texts["multiplePoints"];
	}
	else{
		if (numCorrects == 0){
			str += texts["zeroPoints"][0]; // You have not gotten any points in this round
			if (currentAttempt == 2){
				str += `<br>` + texts["zeroPoints"][1]; // Good luck next time!
			}
			str += `<br><br></p>`;
		}
		else{
			if (numCorrects > Math.ceil(totalQuestions/2)){
				str += texts["moreThanHalfCorrect"] + `<br>`; // Very good!
			}
			// You won <number> point(s)
			str += texts["youWon"] + numCorrects.toString() + ((numCorrects > 1) ? texts["multiplePoints"] : texts["onePoint"]) + `<br>`;

			if (currentAttempt == 2){
				// You must correct the answer(s) of the question(s)
				str += `<br>` + ( (numIncorrects > 1) ? texts["multipleIncorrect"] + `<br>` : texts["oneIncorrect"]) + stringIncorrects;
			}	
			str += `<br><br></p>`;
		}
	}

	let auxiliarDiv = (text, onClick) => (
		`<div style="cursor:default; padding-top:1%; padding-bottom:2%" onClick=` + onClick + `>
			<form class="results_clickableText">
				<p style="color:#F26D0B; text-align:center">` + text + `</p>
			</form>
		</div>`
	)

	document.getElementById("main-background").innerHTML = 
		`<div id="results-container" class="centeredFlex whiteBackground_blackBorder" style="flex-direction:column">
			<p class="centered_FontRupes">` + str + 

			// The "Try again" button is only shown if the user is going for the second attempt
			((currentAttempt == 2) ? auxiliarDiv(texts["tryAgain"], "tryAgain()") : ``) + 
			auxiliarDiv(texts["backMenu"], "loadCentralImage(5); restoreDefaultValues()") + 
		`</div>`;
}

function tryAgain(){
	quizFinished = false;
	loadQuiz();
}