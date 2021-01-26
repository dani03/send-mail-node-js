const express = require('express');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  res.render('index');
});
//on creer une route pour pour envoyer les données
//en passant par une adresse mail gmail.
app.post('/send', (request, response) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'marcheurblanc9@gmail.com',
      pass: 'passytoutcourt'
    }
  });
  //on recupere et envoie les données
  let emailOptions = {
    from: "gls corporation <gls@gls.com>",
    to: request.body.destinateur,
    subject: request.body.objet,
    body: request.body.message,
    html:'<p>bienvenue sur notre plateforme cliquer sur ce lien pour confirmer votre compte gmailmarchemaaaa<a href="google.com">lien ici</a></p>'
  };
  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s envoyé: %s', info.messageId, info.response);
    response.render('index');
 
  })
});

app.listen(port, (req, res) => {
  console.log(`server is running on port: ${port}`)
})
// 

