/*------------------Variable initialization-----------------*/

var express = require('express'),
  	app = express(),
  	port = process.env.PORT || 3000,
  	nano = require('nano')('http://localhost:5984'),
  	db_name = 'bewed',
  	db = nano.use(db_name),
  	bodyParser = require('body-parser'),
  	logger = require('morgan'),
  	SuperLogin = require('superlogin');
  
/*-----------------------Server body-------------------------*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//true

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
	next();
});

var config = {
	dbServer: {
		protocol: 'http://',
		host: 'localhost:5984',
		user: 'rodchenk',
		password: 'b3w3d',
		userDB: 'sl-users',
		couchAuthDB: '_users'
	},
	mailer: {
		fromEmail: 'rodchenkov.misha@gmail.com',
		options: {
			service: 'Gmail',
			auth: {
				user: 'rodchenkov.misha@gmail.com',
				pass: 'Micaelrodchenkov93'
			}
		}
	},
	userDBs: {
		defaultDBs: {
			private: ['supertest']
		}
	}
}

var superlogin = new SuperLogin(config);
var routes = require('./api/routes/bewed.route');

app.use('/auth', superlogin.router);
app.use('/api', routes);


app.listen(port);
console.log('bewed RESTful API server started on: ' + port + "\n");