/*  
 *  These functions let change the app state
 *
 */

function setQuizValues(){
	totalQuestions = quiz_questions[language].length;
	for (i=0; i<totalQuestions-1; i++){
		// We don't want to push an element for the last question
		userAnswers.push("a");
	}
	for (i=0; i<quiz_questions[language][totalQuestions-1].options.length; i++){
		lastQ_optionsOrder.push(i);
	}
}

function loadQuiz(){
	resetDiv('main-background');
	quiz = true;

	if (sendingEmail){
		sendEmailView();
	}
	else if (quizFinished){
		showResultsView();
	}
	else if (currentAttempt < 3){
		poblateMainBackground("quizQuestion_view");
		nextQuestion(false);
	}
	else{
		showResultsView();
	}
}

// Gets the question of the quiz to display and increases the number of current question in 1
function nextQuestion(figureNotCreated=true){
	let questions = quiz_questions[language];
	let currentQ = questions[numQuestion];
	
	if (numQuestion < totalQuestions - 1){

		let possibleAnswers = currentQ.options;
		let istr, id, str = '';

		for (i=0; i < possibleAnswers.length; i++){
			istr = i.toString();
			id  = "input_" + istr; // Id of each input radio

			// Giving all the input radio buttons of the current question the same name indicates
			// that they belong to the same group and so only one can be selected
			str += 
				`<div class="inputAnswer">
					  <input id="` + id + `"  type="radio"   name="p`+ numQuestion.toString() 
						    + `" value="` + istr + `"` + ((i==0) ? `checked/>` : `/>`) 
					+ `<label for="` + id + `" class="normalQAnswer">` + possibleAnswers[i] + `</label><br>
				</div>`;
		}

		// Here we put the question followed by its possible answers
		document.getElementById("question").innerHTML = 
			`<b id="normalQuestion">` + currentQ.question + `</b><br><br>
			<span style="display:flex; flex-direction:column; justify-content:center; align-items:flex-start">` + str + `</span>`;

		// Here we put the image of the hand to advance to the next question
		document.getElementById("handToRight").innerHTML =
			`<img onclick="submitA(` + numQuestion.toString()+`); numQuestion+=1; nextQuestion();" style="height:6vmin" 
				onmouseover="this.src='img/derblue.png'" onmouseout="this.src='img/derecha.png'" src="img/derecha.png">`;
	}
	else{ // The last question needs a different treatment
		lastQuestion(currentQ, figureNotCreated); 
	}
}

// Submit an answer
function submitA(num){
	// Note that we must not add the "checked" to the last answer (position 7 currently, that is actually the 8th)
	const str = 'input[name=p' + num.toString() + ']:checked';
	userAnswers[num] = document.querySelector(str).value;
}

// Last question of the quiz, that has the same layout format of a slider figure view
function lastQuestion(currentQ, figureNotCreated){
	if (figureNotCreated){
		figureNum = getRandomInt(0,4); // The 4 is the number of currently available figures, that is the max index plus one
		loadFigure(figureNum, true);
		lastQ_optionsOrder = _.shuffle(lastQ_optionsOrder);
		lastQ_selectedOption = lastQ_optionsOrder[0];	
	}
	else {
		loadFigure(figureNum);
	}
	document.getElementById("desc").innerHTML = 
		`<form id="lastQDesc" class="centeredFlex whiteBackground_blackBorder">
			<p class="centeredBold_FontTexto">` + currentQ.question + `</p>
		</form>`;

	let div = document.getElementById("kind_rotulos");
	div.style["flex-direction"] = "row-reverse"; // We will start creating from right to left

	// Create the finish button
	div.innerHTML = 
		`<div class="centeredFlex" style="padding-bottom:5%">
			<div class="centeredFlex" onClick="finishQuiz()">
				<form id="finishButton" class"centeredFlex">
					<p style="font-family:'Arial'">`+ currentQ.finishButton + `</p>
				</form>
			</div>
		</div>`;

	// Create the box with choosable options
	let answer, num, str = 
		`<select id="figure-chosen-name" name="figure-chosen-name" class="centeredBold_FontTexto"
			     onChange="lastQ_selectedOption = this.value;">`;

	for (i=0; i < currentQ.options.length; i++){
		num = lastQ_optionsOrder[i];
		answer = currentQ.options[num];
		str += `<option class="centeredBold_FontTexto" value="`+ num + `">` + answer + `</option>`;
	}
	str += `</select><div></div>`;
	
	div.innerHTML += str;
	document.getElementById("figure-chosen-name").value = lastQ_selectedOption;
}

// It inserts the numbers of questions that the user failed to the global array "incorrectAnswers"
function evaluateQuiz(){
	let lastQ = quiz_questions[language][numQuestion];
	var i = 0;
	incorrectAnswers = [];

	// Determine the correction of the first group of questions
	while (i < correctOptions.length){
		if (correctOptions[i] != userAnswers[i]){
			incorrectAnswers.push(i+1);
		}
		i++;
	}
	let [hbf, icd] = [head_body_feet_forQuiz, images_combinations_descriptions]; // Abreviations

	// Determine the correction of the last question
	if ( 
		((hbf[0] == hbf[1]) && (hbf[0] == hbf[2])) ||
		(lastQ.options[lastQ_selectedOption] !== icd[language][hbf[0]][hbf[1]][hbf[2]].kind)
		)
	{
		incorrectAnswers.push(i+1);
	}
}

function finishQuiz(){
	quizFinished = true;
	evaluateQuiz();
	sendEmailView();
}

function showResultsView(){
	let len = incorrectAnswers.length;
	let texts = quizResults_texts[language];
	let str = `<span style="font-size:5vmin; font-weight:bold">` + texts[0] + `</span><br><br>`;

	let stringIncorrects = "";
	for (i=0; i < len; i++){
		stringIncorrects += incorrectAnswers[i].toString() + ", ";
	}
	stringIncorrects = stringIncorrects.slice(0, -2);

	if (len > 0){
		if (len > 4){
			str += texts[1] + `<br>` + stringIncorrects + `<br><br>`;
		}
		else{
			let corrects = totalQuestions - len;
			str += texts[2] + `<br>` + texts[3] + corrects.toString() + texts[4] + `<br>`;
			str += (len > 1) ? texts[5] : (texts[10] + `<br>`);
			str += stringIncorrects + `<br><br>`;	
		}
	}
	else {
		str += texts[6] + `<br>` + texts[7] + totalQuestions.toString() + texts[4];
	}

	let formString = 
		`<form class"centeredFlex" style="padding-top:2%"
			onmouseover="this.style.color='red'; this.style.fontWeight='bold'; this.style.fontSize='3.4vmin'"
			onmouseout="this.style.color='#F26D0B'; this.style.fontWeight='lighter'; this.style.fontSize='3vmin'"
			style="color:#F26D0B; font-size:3vmin"
		>
			<p style="color:#F26D0B; font-size:3vmin">`;

	let auxiliarDiv = (text, onClick) => (
		`<div class="centeredFlex centered_FontRupes" style="cursor:default" onClick=` + onClick + `>`
			+ formString + text + `</p>
			</form>
		</div>`
	)

	document.getElementById("main-background").innerHTML = 
		`<div id="myModal" class="centeredFlex modal whiteBackground_blackBorder" style="padding:6%; flex-direction:column; font-size:3vmin">
			<p class="centered_FontRupes">` + str + 
			// Try again (currentAttempt number is which will start, not what has already been made)
			((currentAttempt == 2) ? auxiliarDiv(texts[8], "tryAgain()") : ``) + 
			// Return to main menu
			auxiliarDiv(texts[9], "loadCentralImage(5); restoreDefaultValues()") + 
		`</div>`;
}

function tryAgain(){
	quizFinished = false;
	loadQuiz();
}