const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mailer = require('./nodemailer');

const app = express();

const PORT = 80;
let feedbackInfo = undefined;

app.use(bodyParser.urlencoded({extended: false}));

app.post('/feedbackForm', (req, res) => {
	console.log("Test post");
    if (!req.body.name || !req.body.email || !req.body.info) 
	{
		console.log(req.body);
		return res.sendStatus(400);
	}
   
    const message = {
        subject: 'feedback',    
        html: `
        <h2>Обращение в службу поддержки!</h2>
        
        </i>данные формы:</i>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>   
            <li>Info: ${req.body.info}</li>
        </ul>`
    }
    mailer(message);
    feedbackInfo = req.body;       
	
    res.redirect('/'); 
});

app.use("/",express.static('./'));

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));     