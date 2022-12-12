// ----------------- Express server -----------------
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');

//app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors()); // To avoid being blocked by CORS policy
app.use(bodyParser.json()); // Parse appllication/json

app.use(express.json());
app.use(bodyParser.urlencoded({ // Parse application/x-www-form-urlencoded
	extended: true,
})) 

const port = 2526;

// Controller
app.post('/mailServer', async(request, response) => {
	let entry = request.body;

	// Host's information
	HOST_EMAIL_USER = "AKIAYNT5UXOKI2MMOG4F";
	HOST_EMAIL_PASSWORD = "BFeil55GOIasbwaD5sqrXTVCz2phLUzbSkNOOkE81Yk5";
	HOST_EMAIL_SERVER = "email-smtp.us-east-1.amazonaws.com";
	HOST_EMAIL_PORT = 465;
	HOST_EMAIL_SENT_FROM = "info@ajdelgados.com";
	//HOST_EMAIL_TO = ['arturo@orquesta.agency'];

	try{
		let transporter = nodemailer.createTransport({
			secure: true,
			host: HOST_EMAIL_SERVER,
			port: HOST_EMAIL_PORT,
			auth: {
				user: HOST_EMAIL_USER,
				pass: HOST_EMAIL_PASSWORD,
			}
		})

		let message = {
			from: HOST_EMAIL_SENT_FROM, // The email is always sent from the same origin
			to: entry.addresseeEmail_val,
			subject: entry.subject,
			text: entry.body,
		}

		transporter.sendMail(message, function(err, info) {
			if (err) {
				response.send(false);
			} else {
				response.send(true);
			}
		});     
	}
	catch(error){
		response.send(false);
	}

}); 

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});