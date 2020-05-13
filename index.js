// bodyParser и mailer нужны чтобы все работало
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mailer = require('./nodemailer');

const app = express();

const PORT = 80;
let feedbackInfo = undefined;       // Для временного хранения данных формы

// строка как я понял подключает сам bodyparser
app.use(bodyParser.urlencoded({extended: false}));

// метод post обрабатывает данные формы и вызывает функцию mailer которая экспортирована из документа nodemailer.js
app.post('/', (req, res) => {
    // Проверка на отправку всех полей... 
    // У тегов input в форме должны быть атрибут name они обязательно должны совпадать с именами после req.body в if и в message
	console.log("ZHOPA");
    if (!req.body.name || !req.body.email || !req.body.info) 
	{
		console.log(req.body);
		return res.sendStatus(400);
	}
    // в message внешний вид самого собщения которое отправится на почту(можно подредачить внешний вид если надо будет)
    const message = {
        subject: 'feedback',    // поле темы сообщения
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
    feedbackInfo = req.body;        // при отправки данных, браузер предлает сделать это еще раз 
    res.redirect('/feedbackForm');  // и для того чтобы этого небыло нужны эти строки
});

// Описание настроек:
var staticSiteOptions = {
   portnum: 80, // слушать порт 80
   maxAge: 1000 * 60 * 15 // хранить страницы в кэше пятнадцать минут
};

// Запуск сайта:
app.use("/feedbackForm",express.static(
   path.join(__dirname),
   staticSiteOptions
));

app.get("/", (req, res, next) => { res.send("hello world") });

app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/feedbackForm`));     
