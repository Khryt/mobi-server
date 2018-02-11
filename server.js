const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;

// Add headers

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


/*
app.use(function(req, res, next) {
  var allowePort = '8080'
  var allowedOrigins = ['http://127.0.0.1:'+allowePort, 'http://localhost:'+allowePort, 'http://127.0.0.1:'+allowePort, 'http://localhost:'+allowePort, 'http://localhost.com:'+allowePort, '*'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
*/

//app.get('/', (req, res) => res.send('Hello World! I am a live...'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log('MongoClient.connect err: '+err)

  require('./app/routes')(app, database.db(db.name));
  
  app.listen(port, () => {
    console.log('MobiServer a live on ' + port);
  });               
})