'use strict';

const TABLE = 'user'

function run_query(query, res){
	db_sql.query(query, (error, result) => {
		if(error) res.json({'status':'error', 'reason':error});
		res.json(result);
	})
}

exports.getByID = function(req, res){
	const user = req.query.user_id;
	const query = `select * from ${TABLE} WHERE id='${user}';`;
	run_query(query, res);
}

exports.getAll = function(req, res){
	const query = `SELECT * FROM ${TABLE} ORDER BY user.created ASC;`
	run_query(query, res);
}

exports.getImage = function(req, res){
	const user = req.query.user_id;
	const query = `SELECT photo FROM ${TABLE} WHERE user='${user}'`;
}

/**
* @CHECK
*/
exports.getValues = function(req, res){
	const user = res.query.user_id;
	const values = req.query.values;
	console.log(values);
	const query = `SELECT ${values} from ${TABLE} WHERE user='${user}';`;
	run_query(query, res);
}

exports.update = function(req, res){
	//TODO
	res.json('not available yet')
}