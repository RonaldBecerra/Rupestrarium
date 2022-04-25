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
	// Where the data is located. This requires that the entered parameter is an object with property "mail"
	let entry = request.body;
	try{
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			port: port+1,
			auth: {
				user: entry.useremail_val,
				pass: entry.userpassword_val,
			}
		})

		message = {
			from: entry.useremail_val,
			to: entry.teacheremail_val,
			subject: entry.subject,
			text: entry.body,
		}

		transporter.sendMail(message, function(err, info) {
			if (err) {
				throw Error("");
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