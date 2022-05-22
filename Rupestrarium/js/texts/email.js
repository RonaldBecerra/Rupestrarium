// Instructions for the user to send the email
const sendEmail_texts = {
	spanish: [
		"Enviar resultados", // 0
		"Nombre completo del estudiante:", // 1
		"Número de cédula:", // 2
		"Carnet estudiantil:", // 3
		"Correo electrónico del profesor:", // 4
		"ENVIAR", // 5
	],
	english: [
		"Submit results", // 0
		"Student's full name:", // 1
		"Identification card number:", // 2
		"Student card number:", // 3
		"Teacher's email:", // 4
		"SEND", // 5
	]
}

// Texts that may appear in the sent messsage
const mailBody_texts = {
	spanish: [
		"Resultados del quiz de Rupestrarium", // 0
		"Número de opciones correctas: ", // 1
		"Respuesta: ", // 2
		"INCORRECTA", // 3
		"    - Cabeza: ", // 4
		"    - Cuerpo: ", // 5
		"    - Inferior: ", // 6
		"Intento: ", // 7
	],
	english: [
		"Rupestrarium quiz results", // 0
		"Number of correct options: ", // 1
		"Answer: ", // 2
		"INCORRECT", // 3
		"    - Head: ", // 4
		"    - Body: ", // 5
		"    - Lower: ", // 6
		"Attempt: ", // 7
	]
}

// Alerts that appear once the user has tried to send the email
const emailSent_texts = {
	spanish: [
		"El correo se envió exitosamente", // 0
		"No se pudo enviar el correo", // 1
	],
	english: [
		"The email was sent successfully", // 0
		"The email could not be sent", // 1
	]	
}