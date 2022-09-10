// Instructions for the user to send the email
const sendEmail_texts = {
	spanish: [
		"Enviar resultados", // 0
		"Nombre completo:", // 1
		"Información adicional (C.I., Institución, Grado, Correo electrónico, etc.):", // 2
		"Correo electrónico del destinatario (Ej: Profesor):", // 3
		"ENVIAR", // 4
	],
	english: [
		"Submit results", // 0
		"Full name:", // 1
		"Additional information (ID, Institution, Grade, E-mail):", // 2
		"Recipient's e-mail (Ex: Professor):", // 3
		"SEND", // 4
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
		"Información adicional del usuario:", // 8
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
		"Additional user information:", // 8
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