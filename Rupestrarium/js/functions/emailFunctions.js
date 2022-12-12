/*  
 *  These functions let change the app state
 *
 */

function sendEmailView({username_val="", additionalInfo_val="", addresseeEmail_val=""}={}){
	let dict = {username_val, additionalInfo_val, addresseeEmail_val};
	resetDiv('main-background');
	sendingEmail = true;

	poblateMainBackground("horizontalSections_view",
		[['desc','14'],['username','18'],['additionalInfo','36'],['addresseeEmail','18'],['sendButton','14']],
		"column"
	);

	let mainContainer = document.getElementById("main-background-container");
	mainContainer.style.color = "white";
	mainContainer.style.overflow = "auto";

	// Subtitle: Submit results
	document.getElementById("desc").innerHTML =
		`<div id="sendEmailDesc" class="centered_FontRupes" style="padding-top:2%">` + sendEmail_texts[language][0] + `</div>`;

	let divInit = `<div class="centeredFlex emailInput" style="flex-direction:column; align-items:flex-start; height:100%;">`;

	// Auxiliar sub-function
	let poblateDiv = (id, textNumber, textArea=false) => {
		let elemValue = dict[id+"_val"];
		let [textFieldBegin, textFieldEnd] = textArea ? [`<textarea oninput="auto_height(this,'username_input')" id="`, `</textarea>`] : [`<input id="`, ``];
		//let [textFieldBegin, textFieldEnd] = textArea ? [`<textarea id="`, `></textarea>`] : [`<input id="`, `>`];

		document.getElementById(id).innerHTML = divInit +
			`<label for="` + id + `_input" style="font-family:'FontRupes'">` + sendEmail_texts[language][textNumber] + `</label>`
			 + textFieldBegin + id + `_input" name="` + id + `_input" value="` + elemValue + `" style="font-family: 'Arial'">`
			 + (textArea ? elemValue : ``)
			 + textFieldEnd
		+ `</div>`;	
	}
	poblateDiv("username", 1);
	poblateDiv("additionalInfo", 2, true); // Any relevant information that the user considers to send
	poblateDiv("addresseeEmail", 3);  // It may be teacher's email

	let buttonDiv = document.getElementById("sendButton");
	buttonDiv.style["flex-direction"] = "row";

	// SEND button. Its background is the blue color used by Google
	buttonDiv.innerHTML =
		`<div class="centeredFlex" style="padding-bottom:1%" onClick="submitForm()">
			<form id="sendEmailButton" class"centeredFlex"
					style="
						border-radius: 8px;
						border-style: solid;
						border-color: black;
						background: #4285F4;
						padding: 9%;
						cursor: pointer;
					"
			>
				<p class="unselectable_text" style="font-family:'Arial'">`+ sendEmail_texts[language][4] + `</p>
			</form>
		</div>`;
}

// To get the values of the email fields that the user has entered
getEmailInputsValues = () => ({
	username_val: document.getElementById("username_input").value,
	additionalInfo_val: document.getElementById("additionalInfo_input").value,
	addresseeEmail_val: document.getElementById("addresseeEmail_input").value,
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
	if (!sendEmailAllowed){
		return;
	}
	sendEmailAllowed = false;

	let info = getEmailInputsValues();
	let incorrects = [...incorrectAnswers];
	let questions = quiz_questions[language];
	let [texts0, texts1, texts2] = [sendEmail_texts[language], mailBody_texts[language], emailSent_texts[language]];

	// Subject: "Rupestrarium quiz results - <username> - Identification card number: <userdni> - Student card number: <studentcard>
	let subject = texts1[0] + " - " + info.username_val;

	// Additional user information
	let body = texts1[8] + "\n\n" + info.additionalInfo_val + "\n\n";

	// Attempt: <number>
	body += texts1[7] + currentAttempt + "\n";

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

	// Function to handle any error when sending the email
	let errorCase = () => {
		alert(texts2[1]); // Message: "The email could not be sent"
		sendEmailAllowed = true;			
	}

	// Send the email
	$.ajax({
		type: "post",
		url: smtpServerURL, 
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify({
			addresseeEmail_val: info.addresseeEmail_val, 
			subject, 
			body
		}),

		success: data => {
			if (data){
				alert(texts2[0]); // Message: "The email was sent successfully"
				currentAttempt += 1; 
				sendingEmail = false;
				sendEmailAllowed = true;	
				showResultsView();
			} else {
				errorCase();
			}
		},
		error: function(e){
			errorCase();
		}
	})
}

