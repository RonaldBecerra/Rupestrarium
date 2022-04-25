/*  
 *  These functions let change the app state
 *
 */

function sendEmailView(useremail_val="", userpassword_val="", passwordShown=false, teacheremail_val=""){
	resetDiv('main-background');
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
	let incorrects = [...incorrectAnswers];
	let questions = quiz_questions[language];
	let totalPossibilities = questions.length;
	let texts = mailBody_texts[language];

	let parts = figureParts[language];
	let subject = texts[0];

	let body = texts[9] + currentAttempt + "\n";
	body += texts[1] + (totalPossibilities - incorrects.length).toString() + "/" + totalPossibilities.toString() + "\n\n";
	
	// Middle questions
	let i = 0;
	while (i < totalPossibilities - 1){
		body += questions[i].question + "\n" + texts[2] + questions[i].options[userAnswers[i]];

		if (incorrects[0] == i+1){
			body += "\n" + texts[3];
			incorrects.shift();
		}
		body += "\n\n";
		i++;
	}

	// Last question
	body += questions[i].question + "\n";
	body += texts[2] + questions[totalPossibilities-1].options[lastQ_selectedOption];
	for (k=0; k < 3; k++){
		body += "\n" + texts[k+4] + parts[head_body_feet_forQuiz[k]];
	}
	if (totalPossibilities === incorrects.pop()){
		body += "\n" + texts[3];
	}

	// Eliminate tags and extra spaces from the text
	body = deleteHTMLTagsFromText(body);

	// Send the email
	$.ajax({
		type: "post",
		url: smtpServerURL, 
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify({...info, subject, body}),

		success: data => {
			if (data){
				alert(texts[7]);
				currentAttempt += 1; 
				numQuestion = 0; 
				sendingEmail = false;
				showResultsView();	
			} else {
				throw Error("");
			}
		},
		error: function(e){
			alert(texts[8]);
		}
	})
}

