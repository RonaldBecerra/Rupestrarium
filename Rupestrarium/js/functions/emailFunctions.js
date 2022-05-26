/*  
 *  These functions let change the app state
 *
 */

function sendEmailView({username_val="", userdni_val="", studentcard_val="", teacheremail_val=""}={}){
	let dict = {username_val, userdni_val, studentcard_val, teacheremail_val};
	resetDiv('main-background');
	sendingEmail = true;

	poblateMainBackground("horizontalSections_view",
		[['desc','14'],['username','18'],['userdni','18'],['studentcard','18'],['teacheremail','18'],['sendButton','14']],
		"column"
	);

	document.getElementById("main-background-container").style.cssText += "color:white";

	// Subtitle: Submit results
	document.getElementById("desc").innerHTML =
		`<div id="sendEmailDesc" class="centered_FontRupes" style="padding-top:2%">` + sendEmail_texts[language][0] + `</div>`;

	let divInit = `<div class="centeredFlex emailInput" style="flex-direction:column; align-items:flex-start; height:100%;">`;

	// Auxiliar sub-function
	let poblateDiv = (id, textNumber) => {
		document.getElementById(id).innerHTML = divInit +
			`<label for="` + id + `_input">` + sendEmail_texts[language][textNumber] + `</label>
			 <input type="text" id="` + id + `_input" name="` + id + `_input" value="` + dict[id+"_val"] + `">` 
		+ `</div>`;	
	}
	poblateDiv("username", 1);     // Student's full name
	poblateDiv("userdni", 2);      // Identification card number
	poblateDiv("studentcard", 3);  // Student card number
	poblateDiv("teacheremail", 4); // Teacher's email

	let buttonDiv = document.getElementById("sendButton");
	buttonDiv.style["flex-direction"] = "row";

	// SEND button
	buttonDiv.innerHTML =
		`<div class="centeredFlex" style="padding-bottom:1%" onClick="submitForm()">
			<form id="sendEmailButton" class"centeredFlex">
				<p style="font-family:'Arial'">`+ sendEmail_texts[language][5] + `</p>
			</form>
		</div>`;
}

// To get the values of the email fields that the user has entered
getEmailInputsValues = () => ({
	username_val: document.getElementById("username_input").value,
	userdni_val: document.getElementById("userdni_input").value,
	studentcard_val: document.getElementById("studentcard_input").value,
	teacheremail_val: document.getElementById("teacheremail_input").value,
})

/* Changing the language while sending an email require to the input values
 * so in this case we need a different treatment
 */
function change_language_sendingEmail(){
	let res = getEmailInputsValues();
	sendEmailView({...res});
}

// Submit the complete form to the teacher
function submitForm(){
	let info = getEmailInputsValues();
	let incorrects = [...incorrectAnswers];
	let questions = quiz_questions[language];
	let [texts0, texts1, texts2] = [sendEmail_texts[language], mailBody_texts[language], emailSent_texts[language]];

	// Subject: "Rupestrarium quiz results - <username> - Identification card number: <userdni> - Student card number: <studentcard>
	let subject = texts1[0] + " - " + info.username_val 
				+ " - " + texts0[2] + " " + info.userdni_val
				+ " - " + texts0[3] + " " + info.studentcard_val;

	// Attempt: <number>
	let body = texts1[7] + currentAttempt + "\n";

	// Number of correct options: <number>
	body += texts1[1] + (totalQuestions - incorrects.length).toString() + "/" + totalQuestions.toString() + "\n\n";
	
	// Middle questions
	let i = 0;
	while (i < totalQuestions - 1){
		body += questions[i].question + "\n" + texts1[2] + questions[i].options[userAnswers[i]];

		if (incorrects[0] == i+1){
			body += "\n" + texts1[3];
			incorrects.shift();
		}
		body += "\n\n";
		i++;
	}

	// Last question
	body += questions[i].question + "\n";
	body += texts1[2] + questions[totalQuestions-1].options[lastQ_selectedOption];
	for (k=0; k < 3; k++){
		body += "\n" + texts1[k+4] + figureParts[language][head_body_feet_forQuiz[k]];
	}
	if (totalQuestions === incorrects.pop()){
		body += "\n" + texts1[3];
	}

	// Eliminate tags added to give format to the text, and also the extra spaces
	body = deleteHTMLTagsFromText(body);

	/* ------------- BORRAR * ----------------- */
	console.log(body);

				alert(texts2[0]); // Message: "The email was sent successfully"
				currentAttempt += 1; 
				numQuestion = 0; 
				sendingEmail = false;
				showResultsView();

	return;
	/* ------------------- FIN BORRAR ----------- */

	// Send the email
	$.ajax({
		type: "post",
		url: smtpServerURL, 
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify({
			teacheremail_val: info.teacheremail_val, 
			subject, 
			body
		}),

		success: data => {
			if (data){
				alert(texts2[0]); // Message: "The email was sent successfully"
				currentAttempt += 1; 
				numQuestion = 0; 
				sendingEmail = false;
				showResultsView();	
			} else {
				throw Error("");
			}
		},
		error: function(e){
			alert(texts2[1]); // Message: "The email could not be sent"
		}
	})
}

