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
	const query = `select * from ${TABLE} WHERE id = '${user}';`;
	run_query(query, res);
}

exports.getAll = function(req, res){
	const query = `SELECT * FROM ${TABLE} ORDER BY user.created ASC;`
	run_query(query, res);
}