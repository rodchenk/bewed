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
  	environment = require('./env/dev.json'),
	mysql = require('mysql');

/*-----------------------Server body-------------------------*/

const db_sql = mysql.createConnection ({
    host: environment.sql.host,
    user: environment.sql.user,
    password: environment.sql.password,
    database: environment.sql.database
});
db_sql.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL on %s\n', environment.sql.host);
});
global.db_sql = db_sql;

app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));//true

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
var routes_v2 = require('./api/routes/bewed.v2.route');

app.use('/auth', superlogin.router);
app.use('/api', routes);
app.use('/api/v2', routes_v2)

app.listen(port);
console.log('foliage API server started on: 127.0.0.1:' + port + "\n");