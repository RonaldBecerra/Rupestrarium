/*  
 *  These functions let change the app state
 *
 */

function loadQuiz(){
	resetDiv('main-background');
	quiz = true;

	console.log("currentAttempt = ", currentAttempt);

	if (quizFinished){
		console.log("Entré en quizFinished");
		finishQuiz();
	}
	else if (sendingEmail){
		console.log("Entré en sendingEmail");
		sendEmail();
	}
	else if (currentAttempt < 3){
		console.log("Entré en currentAttempt < 3");
		currentAttempt += 1;
		poblateMainBackground("quizQuestion_view");
		nextQuestion();
	}
	else{
		console.log("Entré en else");
		finishQuiz();
	}
}

// Gets the question of the quiz to display and increases the number of current question in 1
function nextQuestion(notReloading=true){
	let questions = quiz_questions[language];
	let currentQ = questions[numQuestion];
	
	if (numQuestion < questions.length - 1){
		let possibleAnswers = currentQ.options;
		let str = '';
		for (i=0; i < possibleAnswers.length; i++){
			str += `<input type="radio" name="p`+ numQuestion.toString() + `" value="` 
					+ i.toString() + `"` + ((i==0) ? `checked>` : `>`) + " " + possibleAnswers[i] + `<br>`;
		}

		// Here we put the question followed by its possible answers
		document.getElementById("question").innerHTML = 
			`<b style="font-size:1.5vw">` + currentQ.question + `</b><br><br>
			<span style="font-size:3vmin">` + str + `</span>`;

		// Here we put the image of the hand to advance to the next question
		document.getElementById("handToRight").innerHTML =
			`<img onclick="submitA(` + numQuestion.toString()+`); numQuestion+=1; nextQuestion();" style="position:relative; height:6vmin" 
				onmouseover="this.src='img/derblue.png'" onmouseout="this.src='img/derecha.png'" src="img/derecha.png">`;
	}
	else{ // The last question needs a different treatment
		lastQuestion(currentQ, notReloading); 
	}
}

// Submit an answer
function submitA(num){
	// Note that we must not add the "checked" to the last answer (position 7 currently, that is actually the 8th)
	const str = 'input[name=p' + num.toString() + ((num == 7) ? ']' : ']:checked');
	userAnswers[num] = document.querySelector(str).value;
}

// Last question of the quiz, that has the format of a slider figure
function lastQuestion(currentQ, notReloading){
	if (notReloading){
		// The 4 is the number of currently available figures, that is the max index plus one
		loadFigure(getRandomInt(0,4));
		lastQ_optionsOrder = _.shuffle(lastQ_optionsOrder);
		lastQ_selectedOption = lastQ_optionsOrder[0];	
	}
	document.getElementById("desc").innerHTML = 
		`<form class="whole centeredFlex whiteBackground_blackBorder" style="width:88%; height:85%">
			<p class="centeredBold_FontTexto" style="font-size:1.2vmax">` + currentQ.question + `</p>
		</form>`;

	let div = document.getElementById("kind_rotulos");
	div.style["flex-direction"] = "row-reverse";

	div.innerHTML = 
		`<div class="centeredFlex" style="width:31%; padding-bottom:5%">
			<div class="centeredFlex" onClick="finishQuiz()">
				<form id="finishButton" class"centeredFlex" onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">
					<p style="font-size:2vmin; font-family:'Arial'">`+ currentQ.finishButton + `</p>
				</form>
			</div>
		</div>`;

	let answer, num;
	let str = 
		`<select id="figure-chosen-name" name="figure-chosen-name" class="centeredBold_FontTexto"
			style="width:38%; font-size:2.4vmin" onChange="lastQ_selectedOption = this.value;">`;

	for (i=0; i < currentQ.options.length; i++){
		num = lastQ_optionsOrder[i];
		answer = currentQ.options[num];
		str += `<option class="centeredBold_FontTexto" value="`+ num + `">` + answer + `</option>`;
	}
	str += `</select><div style="width:31%"></div>`;
	
	div.innerHTML += str;
	document.getElementById("figure-chosen-name").value = lastQ_selectedOption;
}

function testQuiz(){
	let lastQ = quiz_questions[language][numQuestion];
	var i = 0;
	incorrectAnswers = [];

	// Determine the correction of the first questions
	while (i < correctOptions.length){
		if (correctOptions[i] != userAnswers[i]){
			incorrectAnswers.push(i+1);
		}
		i++;
	}
	let [hbf, icd] = [head_body_feet, images_combinations_descriptions]; // Abreviations

	// Determine the correction of the last question
	if ( 
		((hbf[0] == hbf[1]) && (hbf[0] == hbf[2])) ||
		(lastQ.options[lastQ_selectedOption] !== icd[language][hbf[0]][hbf[1]][hbf[2]].kind)
		)
	{
		incorrectAnswers.push(i+1);
	}
}

function sendEmail(useremail_val="", userpassword_val="", passwordShown=false, teacheremail_val=""){
	resetDiv('main-background');
	quizFinished = false;
	sendingEmail = true;
	poblateMainBackground("horizontalSections_view",
		[['desc','14'],['useremail','23'],['userpassword','23'],['teacheremail','23'],['sendButton','17']],
		"column"
	);

	document.getElementById("main-background-container").style.cssText += "color:white; font-size:2.7vmin;";

	document.getElementById("desc").innerHTML =
		`<div class="centered_FontRupes" style="font-size:3.5vmin; padding-top:2%">` + sendEmail_texts[language][0] + `</div>`;

	let divInit = `<div class="centeredFlex" style="flex-direction:column; align-items:flex-start; width:70%; height:100%;">`;

	document.getElementById("useremail").innerHTML = divInit +
			`<label for="useremail_input">` + sendEmail_texts[language][1] + `</label>
			<input class="emailInput" type="text" id="useremail_input" name="useremail_input" value="` + useremail_val + `">` 
		+ `</div>`;
		

	document.getElementById("userpassword").innerHTML = divInit +
			`<label for="password_input">` + sendEmail_texts[language][2] + `</label>
			<input class="emailInput" type="password" id="password_input" name="password_input" value="` + userpassword_val + `">
			<div style="height:7.5%"></div>
			<div class="centeredFlex" style="flex-direction:row; height:10%; justify-content:flex-start; font-size:2.3vmin">
				<input type="checkbox" id="showHide_password" onClick="show_or_hide_password()"/>`
				+ sendEmail_texts[language][3] +
			`</div>` 
		+ `</div>`;

	document.getElementById("teacheremail").innerHTML = divInit + 
			`<label for="teacheremail_input">` + sendEmail_texts[language][4] + `</label>
			<input class="emailInput" type="text" id="teacheremail_input" name="teacheremail_input" value="` + teacheremail_val + `">` 
		+ `</div>`;

	let buttonDiv = document.getElementById("sendButton");
	buttonDiv.style["flex-direction"] = "row";

	buttonDiv.innerHTML =
		`<div class="centeredFlex" style="padding-bottom:2%" onClick="loadCentralImage(5); currentAttempt+=1; numQuestion=0; sendingEmail=false">
			<form id="sendEmailButton" class"centeredFlex" style="color:black" onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">
				<p style="font-size:3vmin; font-family:'Arial'">`+ sendEmail_texts[language][5] + `</p>
			</form>
		</div>`;
}

// To make visible or not the password that the user is entering
function show_or_hide_password(){
	if ($('#showHide_password').is(':checked')) {
		$('#password_input').attr('type', 'text');
	} 
	else {
		$('#password_input').attr('type', 'password');
	}
}

/* Changing the language while sending an email require to the input values
 * so in this case we need a different treatment
 */
function change_language_sendingEmail(){
	let useremail_val = document.getElementById("useremail_input").value;
	let userpassword_val = document.getElementById("password_input").value;
	let passwordShown = null;
	let teacheremail_val = document.getElementById("teacheremail_input").value;

	sendEmail(useremail_val, userpassword_val, passwordShown, teacheremail_val);
}

//function showQuizResults(){
function finishQuiz(){
	quizFinished = true;
	testQuiz();

	let len = incorrectAnswers.length;
	let totalPossibilities = quiz_questions[language].length
	let texts = quizResults_texts[language];
	let str = `<span style="font-size:5vmin; font-weight:bold">` + texts[0] + `</span><br><br>`;

	let stringIncorrects = "";
	for (i=0; i < len; i++){
		stringIncorrects += incorrectAnswers[i].toString() + ", ";
	}
	stringIncorrects = stringIncorrects.slice(0, -2);
	let printCase = true;

	if (len > 0){
		if (len > 4){
			str += texts[1] + `<br>` + stringIncorrects + `<br><br>`;
		}
		else if (len > 1){
			let corrects = totalPossibilities - len;
			str += texts[2] + `<br>` + texts[3] + corrects.toString() + texts[4] + `<br>`;
			str += texts[5] + stringIncorrects + `<br><br>`;
		}
		else{
			let corrects = totalPossibilities - len;
			str += texts[2] + `<br>` + texts[3] + corrects.toString() + texts[4] + `<br>`;
			str += texts[10] + `<br>` + stringIncorrects + `<br><br>`;
		}
	}
	else {
		str += texts[6] + `<br>` + texts[7] + totalPossibilities.toString() + texts[4];
	}

	let formString = 
		`<form class"centeredFlex" style="padding-top:2%"
			onmouseover="this.style.color='red'; this.style.fontWeight='bold'; this.style.fontSize='3.4vmin'"
			onmouseout="this.style.color='#F26D0B'; this.style.fontWeight='lighter'; this.style.fontSize='3vmin'"
			style="color:#F26D0B; font-size:3vmin"
		>
			<p style="color:#F26D0B; font-size:3vmin">`;

	console.log("currentAttempt = ", currentAttempt);

	document.getElementById("main-background").innerHTML = 
		`<div id="myModal" class="centeredFlex modal whiteBackground_blackBorder" style="padding:6%; flex-direction:column; font-size:3vmin">
			<p class="centered_FontRupes">` + str + 

			((currentAttempt == 1) ? 
				(`<div class="centeredFlex centered_FontRupes" onClick="tryAgain()">`
					+ formString + texts[8] + `</p>
					</form>
				</div>`) : ``) + 

			((currentAttempt < 3) ?
				(`<div class="centeredFlex centered_FontRupes" onClick="sendEmail()">`
					+ formString + texts[11] + `</p>
					</form>
				</div>`) : ``) +

			`<div class="centeredFlex centered_FontRupes" onClick="loadCentralImage(5); restoreDefaultValues(true);">`
				+ formString + texts[9] + `</p>
				</form>
			</div>

		</div>`;
}

function restoreQuizValues(){
	quizFinished = false;
	numQuestion = 0;
}

function tryAgain(){
	restoreQuizValues()
	loadQuiz();
}

// Submit the complete form to the teacher
function submitForm(){
	// *** FALTA SEPARAR LOS DOS IDIOMAS EN ESTA LíNEA
	let str = "mailto:INGRESE_SU_CORREO_AQUI@gmail.com?Subject=Respuestas Rupestrarium&body=";
	let questions = quiz_questions[language];
	let currentQ = questions[0];

	// First question
	str += "1-" + currentQ.question + "%0D%0A  " + currentQ.options[userAnswers[0]];

	// Middle questions
	let i = 1;
	let ind = 2;
	while (i < questions.length - 1){
		currentQ = questions[i];
		str += "%0D%0A%0D%0A" + ind.toString() + currentQ.question + "%0D%0A  " + currentQ.options[userAnswers[i]];
		i += 1;
		ind += 1;
	}

	// Last question
	currentQ = questions[i]
	str += "%0D%0A%0D%0A" + ind.toString() + currentQ.question + "%0D%0A  "
		+ "Cabeza: " + parts[head_body_feet[0]] 
		+ "%0D%0A  Cuerpo: " + parts[head_body_feet[1]] 
		+ "%0D%0A  Inferior: " + parts[head_body_feet[2]] 
		+ "%0D%0A    Respuesta:  " +currentQ.options[userAnswers[i]];

	window.location.href = str;
}