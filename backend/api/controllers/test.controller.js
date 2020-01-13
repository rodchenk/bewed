'use strict';

exports.testConnection = function(req, res){
	let query = 'select * from note';
	db_sql.query(query, (error, result) => {
		res.json(result)
	})
}