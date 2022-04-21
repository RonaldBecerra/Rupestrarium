/*  
 *  These functions let change the app state
 *
 */

function sendEmailView(useremail_val="", userpassword_val="", passwordShown=false, teacheremail_val=""){
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
		`<div class="centeredFlex" style="padding-bottom:2%" onClick="submitForm()">
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

// To get the values of the email fields that the user has entered
getEmailInputsValues = () => ({
	useremail_val: document.getElementById("useremail_input").value,
	userpassword_val: document.getElementById("password_input").value,
	teacheremail_val: document.getElementById("teacheremail_input").value,
})

/* Changing the language while sending an email require to the input values
 * so in this case we need a different treatment
 */
function change_language_sendingEmail(){
	let res = getEmailInputsValues();
	let passwordShown = null;
	sendEmailView(res.useremail_val, res.userpassword_val, passwordShown, res.teacheremail_val);
}

// Submit the complete form to the teacher
function submitForm(){
	let info = getEmailInputsValues();

	$.ajax({
		type: "post",
		url: smtpServerURL, 
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify(info),

		success: data => {
			if (data){
				loadCentralImage(5); 
				currentAttempt += 1; 
				numQuestion = 0; 
				sendingEmail = false;	
			}
		},
		error: function(e){
			alert("The error is ", e);
		}
	})

	// // *** FALTA SEPARAR LOS DOS IDIOMAS EN ESTA LíNEA
	// let str = "mailto:INGRESE_SU_CORREO_AQUI@gmail.com?Subject=Respuestas Rupestrarium&body=";
	// let questions = quiz_questions[language];
	// let currentQ = questions[0];

	// // First question
	// str += "1-" + currentQ.question + "%0D%0A  " + currentQ.options[userAnswers[0]];

	// // Middle questions
	// let i = 1;
	// let ind = 2;
	// while (i < questions.length - 1){
	// 	currentQ = questions[i];
	// 	str += "%0D%0A%0D%0A" + ind.toString() + currentQ.question + "%0D%0A  " + currentQ.options[userAnswers[i]];
	// 	i += 1;
	// 	ind += 1;
	// }

	// // Last question
	// currentQ = questions[i]
	// str += "%0D%0A%0D%0A" + ind.toString() + currentQ.question + "%0D%0A  "
	// 	+ "Cabeza: " + parts[head_body_feet[0]] 
	// 	+ "%0D%0A  Cuerpo: " + parts[head_body_feet[1]] 
	// 	+ "%0D%0A  Inferior: " + parts[head_body_feet[2]] 
	// 	+ "%0D%0A    Respuesta:  " +currentQ.options[userAnswers[i]];

	// window.location.href = str;
}

// Submit the complete form of quiz results to the teacher
// function submitForm(){
// 	// *** FALTA SEPARAR LOS DOS IDIOMAS EN ESTA LíNEA
// 	let str = "mailto:INGRESE_SU_CORREO_AQUI@gmail.com?Subject=Respuestas Rupestrarium&body=";
// 	let questions = quiz_questions[language];
// 	let currentQ = questions[0];

// 	// First question
// 	str += "1-" + currentQ.question + "%0D%0A  " + currentQ.options[userAnswers[0]];

// 	// Middle questions
// 	let i = 1;
// 	let ind = 2;
// 	while (i < questions.length - 1){
// 		currentQ = questions[i];
// 		str += "%0D%0A%0D%0A" + ind.toString() + currentQ.question + "%0D%0A  " + currentQ.options[userAnswers[i]];
// 		i += 1;
// 		ind += 1;
// 	}

// 	// Last question
// 	currentQ = questions[i]
// 	str += "%0D%0A%0D%0A" + ind.toString() + currentQ.question + "%0D%0A  "
// 		+ "Cabeza: " + parts[head_body_feet[0]] 
// 		+ "%0D%0A  Cuerpo: " + parts[head_body_feet[1]] 
// 		+ "%0D%0A  Inferior: " + parts[head_body_feet[2]] 
// 		+ "%0D%0A    Respuesta:  " +currentQ.options[userAnswers[i]];

// 	window.location.href = str;
// }