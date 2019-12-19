/*------------------Variable initialization-----------------*/

var express = require('express'),
  	app = express(),
  	port = process.env.PORT || 3000,
  	nano = require('nano')('http://localhost:5984'),
  	db_name = 'bewed',
  	db = nano.use(db_name),
  	bodyParser = require('body-parser'),
  	logger = require('morgan'),
  	SuperLogin = require('superlogin'),
  	environment = require('./env/dev.json');
  
/*-----------------------Server body-------------------------*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//true

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
	next();
});

var config = {
	dbServer: {
		protocol: environment.db.protocol,
		host: environment.db.host,
		user: environment.db.user,
		password: environment.db.password,
		userDB: 'sl-users',
		couchAuthDB: '_users'
	},
	mailer: {
		fromEmail: environment.mail.user,
		options: {
			service: environment.mail.service,
			auth: {
				user: environment.mail.user,
				pass: environment.mail.password
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