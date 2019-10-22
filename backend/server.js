var express = require('express'),
  	app = express(),
  	port = process.env.PORT || 3000,
  	mongoose = require('mongoose'),
  	Task = require('./api/models/bewed.model'), //created model loading here
  	bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bewed'); 

app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/bewed.route'); //importing route
routes(app); //register the route


app.listen(port);


console.log('bewed RESTful API server started on: ' + port);