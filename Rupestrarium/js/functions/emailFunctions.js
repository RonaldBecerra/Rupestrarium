/*  
 *  These functions let change the app state
 *
 */

function sendEmailView(username_val="", teacheremail_val=""){
	resetDiv('main-background');
	sendingEmail = true;

	poblateMainBackground("horizontalSections_view",
		[['desc','14'],['username','32'],['teacheremail','32'],['sendButton','22']],
		"column"
	);

	document.getElementById("main-background-container").style.cssText += "color:white; font-size:2.7vmin;";

	// Subtitle: Submit results
	document.getElementById("desc").innerHTML =
		`<div class="centered_FontRupes" style="font-size:3.5vmin; padding-top:2%">` + sendEmail_texts[language][0] + `</div>`;

	let divInit = `<div class="centeredFlex" style="flex-direction:column; align-items:flex-start; width:70%; height:100%;">`;

	// Student's name
	document.getElementById("username").innerHTML = divInit +
			`<label for="username_input">` + sendEmail_texts[language][1] + `</label>
			<input class="emailInput" type="text" id="username_input" name="username_input" value="` + username_val + `">` 
		+ `</div>`;

	// Teacher's email
	document.getElementById("teacheremail").innerHTML = divInit + 
			`<label for="teacheremail_input">` + sendEmail_texts[language][2] + `</label>
			<input class="emailInput" type="text" id="teacheremail_input" name="teacheremail_input" value="` + teacheremail_val + `">` 
		+ `</div>`;

	let buttonDiv = document.getElementById("sendButton");
	buttonDiv.style["flex-direction"] = "row";

	// SEND
	buttonDiv.innerHTML =
		`<div class="centeredFlex" style="padding-bottom:2%" onClick="submitForm()">
			<form id="sendEmailButton" class"centeredFlex" style="color:black" onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">
				<p style="font-size:3vmin; font-family:'Arial'">`+ sendEmail_texts[language][3] + `</p>
			</form>
		</div>`;
}

// To get the values of the email fields that the user has entered
getEmailInputsValues = () => ({
	username_val: document.getElementById("username_input").value,
	teacheremail_val: document.getElementById("teacheremail_input").value,
})

/* Changing the language while sending an email require to the input values
 * so in this case we need a different treatment
 */
function change_language_sendingEmail(){
	let res = getEmailInputsValues();
	let passwordShown = null;
	sendEmailView(res.username_val, res.teacheremail_val);
}

// Submit the complete form to the teacher
function submitForm(){
	let info = getEmailInputsValues();
	let teacheremail_val = info.teacheremail_val;
	let incorrects = [...incorrectAnswers];
	let questions = quiz_questions[language];
	let texts = mailBody_texts[language];

	let parts = figureParts[language];
	let subject = texts[0] + " - " + info.username_val;

	let body = texts[7] + currentAttempt + "\n";
	body += texts[1] + (totalQuestions - incorrects.length).toString() + "/" + totalQuestions.toString() + "\n\n";
	
	// Middle questions
	let i = 0;
	while (i < totalQuestions - 1){
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
	body += texts[2] + questions[totalQuestions-1].options[lastQ_selectedOption];
	for (k=0; k < 3; k++){
		body += "\n" + texts[k+4] + parts[head_body_feet_forQuiz[k]];
	}
	if (totalQuestions === incorrects.pop()){
		body += "\n" + texts[3];
	}

	// Eliminate tags added to give format to the text, and also the extra spaces
	body = deleteHTMLTagsFromText(body);

	// Send the email
	$.ajax({
		type: "post",
		url: smtpServerURL, 
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify({teacheremail_val, subject, body}),

		success: data => {
			if (data){
				alert(emailSent_texts[language][0]); // Message: "THe email was sent successfully"
				currentAttempt += 1; 
				numQuestion = 0; 
				sendingEmail = false;
				showResultsView();	
			} else {
				throw Error("");
			}
		},
		error: function(e){
			alert(emailSent_texts[language][1]); // Message: "The email could not be sent"
		}
	})
}

